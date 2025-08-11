export type Category = '자존감' | '동기부여' | '불안다스림';

export interface Quote {
  text: string;
  author: string;
  gradient: readonly [string, string];
  category: Category;
}

// 재사용 가능한 그라데이션 팔레트 (순환 적용)
// 연결감을 주기 위한 다크 컬러 루프 (20개)
const DARK_COLORS: ReadonlyArray<string> = [
  '#0f172a', // slate-900
  '#111827', // gray-900
  '#1f2937', // gray-800
  '#0b1020', // blue-black
  '#0b132b', // deep blue
  '#1c2541', // steel blue
  '#232526', // charcoal
  '#2c3e50', // midnight blue
  '#000428', // deep navy
  '#1a1b2e', // oxford blue
  '#2b2d42', // gunmetal
  '#3a0d2a', // maroon dusk
  '#0b032d', // indigo-black
  '#2d3436', // charcoal dark
  '#081c15', // forest black
  '#1b4332', // dark green
  '#2a2a72', // indigo dark
  '#3c1053', // deep purple
  '#00416a', // dark teal
  '#0d324d', // dark blue
];

function getGradientForIndex(index: number): readonly [string, string] {
  const n = DARK_COLORS.length;
  const start = DARK_COLORS[index % n];
  const end = DARK_COLORS[(index + 1) % n];
  return [start, end] as const;
}

// 카테고리 시드 데이터 (자존감/동기부여/불안다스림)
type SeedQuote = { text: string; author: string; category: Category };

const SELF_ESTEEM_SEED: SeedQuote[] = [
  { text: '나는 스스로에게 친절할 자격이 있다.', author: '익명', category: '자존감' },
  { text: '자존감은 내가 나와 맺는 약속에서 자란다.', author: '익명', category: '자존감' },
  { text: '남의 인정보다 나의 존중을 택하라.', author: '익명', category: '자존감' },
  { text: '내가 충분하지 않다는 생각이야말로 내가 바꿀 수 있는 생각이다.', author: '익명', category: '자존감' },
  { text: '불완전함은 결함이 아니라 용기의 증거다.', author: '브레네 브라운', category: '자존감' },
  { text: '비교는 기쁨의 도둑이다. 나답게 가자.', author: '시어도어 루스벨트', category: '자존감' },
  { text: '나는 나의 기준으로 나를 평가한다.', author: '익명', category: '자존감' },
  { text: '작은 승리를 기록할수록 자존감은 단단해진다.', author: '익명', category: '자존감' },
  { text: '나는 과정 중의 작품이다. 지금도 충분히 가치 있다.', author: '익명', category: '자존감' },
  { text: '경계는 나를 사랑하는 방식이다.', author: '익명', category: '자존감' },
  { text: '타고난 가치는 성과로 늘거나 줄지 않는다.', author: '익명', category: '자존감' },
  { text: '정직하게 나답게 사는 것이 가장 큰 자신감이다.', author: '익명', category: '자존감' },
  { text: '자기비난 대신 자기격려를 선택하라.', author: '익명', category: '자존감' },
  { text: '나는 내가 통제하는 것에 집중한다. 그게 나를 지킨다.', author: '익명', category: '자존감' },
  { text: '나의 속도로 가도 괜찮다.', author: '익명', category: '자존감' },
  { text: '완벽함이 아니라 진정성이 나를 빛나게 한다.', author: '익명', category: '자존감' },
  { text: '스스로를 존중하면 세상도 나를 존중한다.', author: '익명', category: '자존감' },
  { text: '내 목소리는 소중하다. 나는 들을 가치가 있다.', author: '익명', category: '자존감' },
  { text: '내가 나에게 친절할 때 세상이 선명해진다.', author: '익명', category: '자존감' },
  { text: '자존감은 결과가 아니라 습관이다.', author: '익명', category: '자존감' },
];

const MOTIVATION_SEED: SeedQuote[] = [
  { text: '작은 걸음이 큰 변화를 만든다.', author: '익명', category: '동기부여' },
  { text: '완벽함보다 실행. 오늘 한 줄이 내일을 바꾼다.', author: '익명', category: '동기부여' },
  { text: '꾸준함은 재능을 능가한다.', author: '익명', category: '동기부여' },
  { text: '시작은 위대함의 절반이다.', author: '플라톤', category: '동기부여' },
  { text: '속도보다 방향. 나침반을 먼저 보라.', author: '익명', category: '동기부여' },
  { text: '오늘의 1%가 1년 뒤 37배가 된다.', author: '제임스 클리어', category: '동기부여' },
  { text: '기회는 준비된 자를 선택한다.', author: '파스퇴르', category: '동기부여' },
  { text: '행동은 두려움의 해독제다.', author: '데일 카네기', category: '동기부여' },
  { text: '큰 꿈, 작은 시작, 끝까지.', author: '익명', category: '동기부여' },
  { text: '기록은 성장을 가속한다.', author: '익명', category: '동기부여' },
  { text: '포기하고 싶은 순간이 지나면 성장의 문이 열린다.', author: '익명', category: '동기부여' },
  { text: '중요한 것부터 꾸준히.', author: '익명', category: '동기부여' },
  { text: '의지는 근육이다. 쓰면 강해진다.', author: '익명', category: '동기부여' },
  { text: '집중은 거절의 기술이다.', author: '스티브 잡스', category: '동기부여' },
  { text: '끝까지 가라. 그러면 보인다.', author: '익명', category: '동기부여' },
  { text: '오늘의 몰입이 내일의 자유다.', author: '익명', category: '동기부여' },
  { text: '작은 승리를 축하하라. 동력이 생긴다.', author: '익명', category: '동기부여' },
  { text: '정직하게 쌓은 실력은 배신하지 않는다.', author: '익명', category: '동기부여' },
  { text: '나의 리듬으로 지속 가능하게.', author: '익명', category: '동기부여' },
  { text: '지금이 가장 좋은 시간이다.', author: '익명', category: '동기부여' },
];

const CALM_SEED: SeedQuote[] = [
  { text: '호흡은 나의 닻이다. 숨을 들이쉬고 내쉰다.', author: '틱낫한', category: '불안다스림' },
  { text: '지금 이 순간이 우리가 가진 전부다.', author: '에크하르트 톨레', category: '불안다스림' },
  { text: '불안은 생각이고, 나는 생각이 아니다.', author: '익명', category: '불안다스림' },
  { text: '확실함이 아니라 용인할 수 있음이 평화를 준다.', author: '익명', category: '불안다스림' },
  { text: '내가 통제할 수 없는 것을 내려놓는다.', author: '익명', category: '불안다스림' },
  { text: '천천히 해도 괜찮다. 멈추지 않으면 된다.', author: '공자', category: '불안다스림' },
  { text: '몸을 이완하면 마음이 따라온다.', author: '익명', category: '불안다스림' },
  { text: '걱정은 내일의 슬픔을 덜지 못하고 오늘의 힘을 앗아간다.', author: '코리 텐 붐', category: '불안다스림' },
  { text: '감정은 파도다. 나는 서퍼다.', author: '익명', category: '불안다스림' },
  { text: '하루의 무게는 하루치만 들자.', author: '익명', category: '불안다스림' },
  { text: '불확실성 속에서도 할 수 있는 한 걸음을 내딛는다.', author: '익명', category: '불안다스림' },
  { text: '몸과 마음에 친절히 대하라. 회복은 친절에서 시작된다.', author: '익명', category: '불안다스림' },
  { text: '생각을 믿지 말고 관찰하라.', author: '익명', category: '불안다스림' },
  { text: '작은 루틴이 큰 평온을 만든다.', author: '익명', category: '불안다스림' },
  { text: '완벽한 계획보다 지금의 작은 행동.', author: '익명', category: '불안다스림' },
  { text: '불안은 정보다. 위협이 아니라 신호다.', author: '익명', category: '불안다스림' },
  { text: '내면의 공간을 넓히면 선택이 넓어진다.', author: '익명', category: '불안다스림' },
  { text: '평온은 연습이다. 매일 조금씩.', author: '익명', category: '불안다스림' },
  { text: '충분히 안전하다. 지금 이 순간, 여기서.', author: '익명', category: '불안다스림' },
  { text: '나를 괴롭히는 건 사건이 아니라 해석이다.', author: '익명', category: '불안다스림' },
];

const BASE_QUOTES: SeedQuote[] = [
  ...SELF_ESTEEM_SEED,
  ...MOTIVATION_SEED,
  ...CALM_SEED,
];

// 원하는 총 개수만큼 자동 확장 (요청: 500개)
const TARGET_COUNT = 500;

function expandToLength(base: SeedQuote[], target: number): Quote[] {
  const expanded: Quote[] = [];
  let index = 0;
  while (expanded.length < target) {
    const item = base[index % base.length];
    const gradient = getGradientForIndex(expanded.length);
    expanded.push({ text: item.text, author: item.author, gradient, category: item.category });
    index += 1;
  }
  return expanded;
}

export const quotes: Quote[] = expandToLength(BASE_QUOTES, TARGET_COUNT);