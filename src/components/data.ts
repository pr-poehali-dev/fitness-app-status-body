export const HERO_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/731f66dd-6179-4df4-96e8-11b09fc4c7e0.jpg";
export const FOOD_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/b3a16762-32bf-49bf-bdd0-0c4e7f2e5c4c.jpg";
export const PROGRESS_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/022be1ad-6d24-4d2e-8f2b-3660c5f5d958.jpg";
export const EXERCISE_IMG_1 = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/a418f6e3-d09d-4cc2-9774-4adcc1d7340d.jpg";
export const EXERCISE_IMG_2 = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/e2fe5357-f80d-46e3-a630-05775d0d9ce2.jpg";

export type Tab = "home" | "programs" | "workout" | "nutrition" | "progress" | "chat" | "profile";
export type AuthScreen = "welcome" | "login" | "register";

export interface User { name: string; email: string; }

export const navItems = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "programs", icon: "LayoutGrid", label: "Курсы" },
  { id: "workout", icon: "Dumbbell", label: "Тренировки" },
  { id: "nutrition", icon: "Salad", label: "Питание" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "chat", icon: "MessageCircle", label: "Чаты" },
  { id: "profile", icon: "User", label: "Профиль" },
] as const;

// ── ПЛАТНЫЕ КУРСЫ ──────────────────────────────────────────
export const paidCourses = [
  {
    id: 1,
    title: "Похудение с нуля",
    subtitle: "8 недель · Новичок",
    tag: "ПОПУЛЯРНО",
    tagColor: "bg-neon text-dark-bg",
    desc: "Мягкое начало без ударных нагрузок. Подходит при большинстве ограничений.",
    goal: "Похудение",
    level: "Новичок",
    weeks: 8,
    suitable: ["колено", "спина", "без ограничений"],
  },
  {
    id: 2,
    title: "Рельеф и тонус",
    subtitle: "12 недель · Средний",
    tag: "ХИТ",
    tagColor: "bg-orange-500 text-white",
    desc: "Проработка всего тела дома без инвентаря. Прогрессивная нагрузка.",
    goal: "Рельеф",
    level: "Средний",
    weeks: 12,
    suitable: ["без ограничений"],
  },
  {
    id: 3,
    title: "Восстановление фигуры",
    subtitle: "4 недели · Новичок",
    tag: "ПОСЛЕ РОДОВ",
    tagColor: "bg-purple-500 text-white",
    desc: "Бережное восстановление тела. Специальные упражнения при слабом тонусе мышц.",
    goal: "Восстановление",
    level: "Новичок",
    weeks: 4,
    suitable: ["спина", "колено", "без ограничений"],
  },
];

// ── БЕСПЛАТНЫЕ ТРЕНИРОВКИ НА НЕДЕЛЮ ───────────────────────
export interface Exercise {
  name: string;
  reps: string;
  desc: string;
  img: string;
}

export interface DayWorkout {
  day: string;
  label: string;
  type: "зарядка" | "тренировка" | "отдых";
  duration: string;
  exercises: Exercise[];
  done: boolean;
  videoUrl?: string;
  challenge?: { title: string; reps: string; desc: string };
}

// VK video embed: https://vk.com/video_ext.php?oid=-214521474&id=XXXXXX&hd=2
const CHARGE_VIDEO = "https://vk.com/video_ext.php?oid=-214521474&id=456239367&hd=2";
const WORKOUT_1 = "https://vk.com/video_ext.php?oid=-214521474&id=456239364&hd=2";
const WORKOUT_2 = "https://vk.com/video_ext.php?oid=-214521474&id=456239366&hd=2";
const WORKOUT_3 = "https://vk.com/video_ext.php?oid=-214521474&id=456239365&hd=2";

export const weekWorkouts: DayWorkout[] = [
  {
    day: "ПН", label: "Понедельник", type: "зарядка", duration: "15 мин", done: true,
    videoUrl: CHARGE_VIDEO,
    exercises: [
      { name: "Наклоны шеи", reps: "10 раз в каждую сторону", desc: "Медленно наклоняйте голову вправо, затем влево. Плечи расслаблены, спина прямая.", img: EXERCISE_IMG_1 },
      { name: "Вращение плечами", reps: "15 раз вперёд и назад", desc: "Круговые движения плечами назад — расправляем грудную клетку и снимаем зажимы.", img: EXERCISE_IMG_1 },
      { name: "Наклоны корпуса", reps: "12 раз в каждую сторону", desc: "Ноги на ширине плеч, одна рука вверх. Тянитесь в сторону без рывков.", img: EXERCISE_IMG_1 },
      { name: "Вращение тазом", reps: "10 раз в каждую сторону", desc: "Ноги на ширине плеч, руки на поясе. Плавные круговые движения тазом.", img: EXERCISE_IMG_1 },
    ],
  },
  {
    day: "ВТ", label: "Вторник", type: "тренировка", duration: "30 мин", done: true,
    videoUrl: WORKOUT_1,
    exercises: [
      { name: "Приседания", reps: "3×15", desc: "Ноги на ширине плеч, носки чуть врозь. Опускайтесь до параллели бёдер с полом, колени не выходят за носки.", img: EXERCISE_IMG_2 },
      { name: "Отжимания с колен", reps: "3×10", desc: "Опора на колени и ладони. Тело — прямая линия от колен до головы. Грудь опускается до пола.", img: EXERCISE_IMG_2 },
      { name: "Ягодичный мостик", reps: "3×20", desc: "Лёжа на спине, стопы у ягодиц. Поднимайте таз вверх, сжимая ягодицы в верхней точке.", img: EXERCISE_IMG_2 },
      { name: "Планка", reps: "3×30 сек", desc: "Опора на предплечья и носки. Тело прямое, живот втянут, не прогибайтесь в пояснице.", img: EXERCISE_IMG_2 },
    ],
  },
  {
    day: "СР", label: "Среда", type: "отдых", duration: "—", done: false,
    exercises: [],
    challenge: { title: "Задание дня", reps: "100 приседаний", desc: "Разбей на удобные подходы в течение дня. Можно 10×10, 5×20 или как удобно — главное выполнить!" },
  },
  {
    day: "ЧТ", label: "Четверг", type: "зарядка", duration: "15 мин", done: false,
    videoUrl: CHARGE_VIDEO,
    exercises: [
      { name: "Потягивания вверх", reps: "10 раз", desc: "Встаньте на носки, тянитесь руками вверх, вдох — потянулись, выдох — опустились.", img: EXERCISE_IMG_1 },
      { name: "Махи ногами", reps: "15 раз каждой ногой", desc: "Держитесь за стул. Прямая нога — мах вперёд и назад без рывков, амплитуда комфортная.", img: EXERCISE_IMG_1 },
      { name: "Скручивания стоя", reps: "12 раз в каждую сторону", desc: "Руки на плечах, ноги на ширине плеч. Поворот корпуса влево-вправо, таз не двигается.", img: EXERCISE_IMG_1 },
    ],
  },
  {
    day: "ПТ", label: "Пятница", type: "тренировка", duration: "35 мин", done: false,
    videoUrl: WORKOUT_3,
    exercises: [
      { name: "Выпады на месте", reps: "3×12 каждой ногой", desc: "Шаг вперёд, опустите заднее колено почти до пола. Переднее колено над носком, спина прямая.", img: EXERCISE_IMG_2 },
      { name: "Отжимания от стены", reps: "3×15", desc: "Встаньте перед стеной, упритесь ладонями. Сгибайте руки, приближая грудь к стене. Тело прямое.", img: EXERCISE_IMG_2 },
      { name: "Подъём ног лёжа", reps: "3×15", desc: "Лёжа на спине, поясница прижата к полу. Поднимайте прямые ноги до 90°, медленно опускайте.", img: EXERCISE_IMG_2 },
      { name: "Супермен", reps: "3×12", desc: "Лёжа на животе, руки вперёд. Одновременно поднимите руки и ноги, удержите 2 сек, опустите.", img: EXERCISE_IMG_2 },
    ],
  },
  {
    day: "СБ", label: "Суббота", type: "тренировка", duration: "25 мин", done: false,
    videoUrl: WORKOUT_2,
    challenge: { title: "Задание дня", reps: "50 отжиманий", desc: "Можно с колен! Разбей на подходы: 5×10 или 10×5. Выполни в течение дня." },
    exercises: [
      { name: "Берпи (лёгкие)", reps: "3×8", desc: "Присели, руки на пол, шагом (не прыжком) вышли в планку, вернулись, встали. Без рывков.", img: EXERCISE_IMG_2 },
      { name: "Боковая планка", reps: "2×20 сек каждой стороны", desc: "Опора на предплечье и боковую сторону стопы. Тело прямое, таз не провисает.", img: EXERCISE_IMG_2 },
      { name: "Кошка-корова", reps: "10 раз", desc: "На четвереньках. Вдох — прогиб вниз (корова), выдох — округление спины вверх (кошка). Медленно.", img: EXERCISE_IMG_1 },
    ],
  },
  {
    day: "ВС", label: "Воскресенье", type: "отдых", duration: "—", done: false,
    exercises: [],
    challenge: { title: "Задание дня", reps: "Планка 3 минуты", desc: "Суммарно за день. Держи по 30–60 секунд, отдыхай и повторяй. Это твой актив на неделю!" },
  },
];

// ── ПРОДУКТЫ ДЛЯ КОНСТРУКТОРА ──────────────────────────────
export interface Product {
  id: number;
  name: string;
  unit: string;
  protein: number;
  fat: number;
  carbs: number;
  category: string;
}

export const productDatabase: Product[] = [
  { id: 1, name: "Куриная грудка", unit: "100г", protein: 31, fat: 4, carbs: 0, category: "Белки" },
  { id: 2, name: "Яйцо варёное", unit: "1 шт", protein: 6, fat: 5, carbs: 0, category: "Белки" },
  { id: 3, name: "Творог 5%", unit: "100г", protein: 17, fat: 5, carbs: 2, category: "Белки" },
  { id: 4, name: "Лосось", unit: "100г", protein: 25, fat: 13, carbs: 0, category: "Белки" },
  { id: 5, name: "Тунец", unit: "100г", protein: 26, fat: 1, carbs: 0, category: "Белки" },
  { id: 6, name: "Гречка варёная", unit: "100г", protein: 4, fat: 1, carbs: 20, category: "Углеводы" },
  { id: 7, name: "Овсянка", unit: "100г", protein: 6, fat: 4, carbs: 50, category: "Углеводы" },
  { id: 8, name: "Рис варёный", unit: "100г", protein: 3, fat: 0, carbs: 28, category: "Углеводы" },
  { id: 9, name: "Банан", unit: "1 шт", protein: 1, fat: 0, carbs: 27, category: "Фрукты" },
  { id: 10, name: "Яблоко", unit: "1 шт", protein: 0, fat: 0, carbs: 14, category: "Фрукты" },
  { id: 11, name: "Брокколи", unit: "100г", protein: 3, fat: 0, carbs: 5, category: "Овощи" },
  { id: 12, name: "Огурец", unit: "1 шт", protein: 1, fat: 0, carbs: 3, category: "Овощи" },
  { id: 13, name: "Авокадо", unit: "½ шт", protein: 1, fat: 11, carbs: 4, category: "Жиры" },
  { id: 14, name: "Оливковое масло", unit: "1 ст.л.", protein: 0, fat: 14, carbs: 0, category: "Жиры" },
  { id: 15, name: "Миндаль", unit: "30г", protein: 6, fat: 14, carbs: 5, category: "Жиры" },
];

// ── ГОТОВЫЕ МЕНЮ НА НЕДЕЛЮ ─────────────────────────────────
export interface ReadyMenu {
  id: number;
  title: string;
  goal: string;
  days: { day: string; meals: string[] }[];
}

export const readyMenus: ReadyMenu[] = [
  {
    id: 1, title: "Меню для похудения", goal: "Похудение",
    days: [
      { day: "Пн", meals: ["Овсянка + яйца", "Яблоко + миндаль", "Куриная грудка + брокколи", "Творог"] },
      { day: "Вт", meals: ["Гречка + яйца", "Огурцы", "Лосось + овощи", "Кефир"] },
      { day: "Ср", meals: ["Омлет 3 яйца", "Творог", "Тунец + рис", "Яблоко"] },
      { day: "Чт", meals: ["Овсянка", "Яйца варёные 2шт", "Курица + гречка", "Творог"] },
      { day: "Пт", meals: ["Гречка + яйца", "Банан", "Лосось + брокколи", "Кефир"] },
      { day: "Сб", meals: ["Омлет + овощи", "Миндаль 30г", "Курица + рис", "Творог"] },
      { day: "Вс", meals: ["Овсянка + банан", "Яблоко", "Тунец + овощи", "Яйца 2шт"] },
    ],
  },
  {
    id: 2, title: "Меню для восстановления", goal: "Восстановление",
    days: [
      { day: "Пн", meals: ["Овсянка + авокадо + яйца", "Банан + миндаль", "Лосось + гречка + овощи", "Творог + мёд"] },
      { day: "Вт", meals: ["Омлет 3 яйца + овощи", "Творог", "Куриная грудка + рис + брокколи", "Кефир"] },
      { day: "Ср", meals: ["Гречка + яйца + огурец", "Яблоко + миндаль", "Тунец + рис + овощи", "Творог"] },
      { day: "Чт", meals: ["Овсянка + банан", "Яйца 2шт", "Лосось + гречка", "Кефир + миндаль"] },
      { day: "Пт", meals: ["Омлет + авокадо", "Творог", "Курица + рис + брокколи", "Банан"] },
      { day: "Сб", meals: ["Гречка + яйца + огурец", "Яблоко", "Лосось + овощи", "Творог"] },
      { day: "Вс", meals: ["Овсянка + авокадо", "Миндаль 30г", "Курица + гречка", "Кефир"] },
    ],
  },
];

// ── ЧАТ ────────────────────────────────────────────────────
export const chatMessages = [
  { id: 1, user: "Мария О.", avatar: "МО", time: "14:23", text: "Девочки, кто делал тренировку вторника? Ягодичный мостик реально жжёт 🔥", isMe: false },
  { id: 2, user: "Анна К.", avatar: "АК", time: "14:25", text: "Да! Я 20 повторов сделала — ноги дрожат 😂 Но результат виден уже за 2 недели", isMe: false },
  { id: 3, user: "Вы", avatar: "Я", time: "14:28", text: "Начала курс Восстановление — очень мягко, без боли в колене. Спасибо тренеру!", isMe: true },
  { id: 4, user: "Тренер Елена", avatar: "ТЕ", time: "14:31", text: "Рада слышать! При проблемах с коленом главное — не пропускать зарядку по утрам, она подготавливает суставы 💚", isMe: false },
];

// ── ПРОГРЕСС ───────────────────────────────────────────────
export const weekStats = [
  { day: "Пн", value: 85 },
  { day: "Вт", value: 100 },
  { day: "Ср", value: 0 },
  { day: "Чт", value: 70 },
  { day: "Пт", value: 0 },
  { day: "Сб", value: 0 },
  { day: "Вс", value: 0 },
];

// ── БЖУ цели ───────────────────────────────────────────────
export const BJU_GOAL = { protein: 120, fat: 55, carbs: 180 };