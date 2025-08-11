import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import { quotes, type Quote } from '@/data/quotes';

type PagedQuote = Quote & { id: string };

function makeChunk(chunkIndex: number): PagedQuote[] {
  return quotes.map((quote, quoteIndex) => ({
    ...quote,
    id: `${chunkIndex}-${quoteIndex}`,
  }));
}

export default function QuotesApp() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState<number>(quotes.length); // 중앙 청크 시작 위치

  // 무한처럼 보이도록 초기 3개 청크(-1, 0, 1)를 구성
  const [data, setData] = useState<PagedQuote[]>(() => [
    ...makeChunk(-1),
    ...makeChunk(0),
    ...makeChunk(1),
  ]);

  // 현재 보유 중인 양 끝 청크 인덱스 추적
  const firstChunkIndexRef = useRef<number>(-1);
  const lastChunkIndexRef = useRef<number>(1);

  const QUOTE_CHUNK_SIZE = quotes.length;
  const INITIAL_PAGE = QUOTE_CHUNK_SIZE; // 가운데(0번 청크의 첫 페이지)

  const appendNextChunk = () => {
    const nextChunkIndex = lastChunkIndexRef.current + 1;
    const nextChunk = makeChunk(nextChunkIndex);
    setData((prev) => [...prev, ...nextChunk]);
    lastChunkIndexRef.current = nextChunkIndex;
  };

  const prependPrevChunk = (currentPosition: number) => {
    const prevChunkIndex = firstChunkIndexRef.current - 1;
    const prevChunk = makeChunk(prevChunkIndex);
    setData((prev) => [...prevChunk, ...prev]);
    firstChunkIndexRef.current = prevChunkIndex;

    // 앞에 청크를 추가했으므로 현재 페이지가 뒤로 밀림. 시각적 점프 방지 위해 보정
    // 보정값: 새로 앞에 넣은 청크의 길이만큼 이동
    const adjustedPosition = currentPosition + QUOTE_CHUNK_SIZE;
    requestAnimationFrame(() => {
      pagerRef.current?.setPageWithoutAnimation(adjustedPosition);
      setCurrentPage(adjustedPosition);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={INITIAL_PAGE}
        orientation="vertical"
        onPageSelected={(event) => {
          const newPageIndex = event.nativeEvent.position;
          setCurrentPage(newPageIndex);

          // 끝쪽 근접 시 다음 데이터 미리 확장
          if (newPageIndex >= data.length - QUOTE_CHUNK_SIZE) {
            appendNextChunk();
          }

          // 앞쪽 근접 시 이전 데이터 확장 및 위치 보정
          if (newPageIndex < QUOTE_CHUNK_SIZE) {
            prependPrevChunk(newPageIndex);
          }
        }}
      >
        {data.map((item) => (
          <LinearGradient colors={item.gradient} style={styles.page} key={item.id}>
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"{item.text}"</Text>
              <Text style={styles.authorText}>— {item.author}</Text>
            </View>

            <Text style={styles.instructionText}>위아래로 스와이프하여 다른 명언 보기</Text>
          </LinearGradient>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
  },
  quoteText: {
    fontSize: 28,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  authorText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeIndicator: {
    backgroundColor: 'white',
    width: 24,
  },
  instructionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontWeight: '400',
  },
});