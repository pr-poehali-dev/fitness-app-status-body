export const HERO_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/731f66dd-6179-4df4-96e8-11b09fc4c7e0.jpg";
export const FOOD_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/b3a16762-32bf-49bf-bdd0-0c4e7f2e5c4c.jpg";
export const PROGRESS_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/022be1ad-6d24-4d2e-8f2b-3660c5f5d958.jpg";

export type Tab = "home" | "programs" | "workout" | "nutrition" | "progress" | "chat" | "profile";
export type AuthScreen = "welcome" | "login" | "register";

export interface User { name: string; email: string; }

export const navItems = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "programs", icon: "LayoutGrid", label: "Программы" },
  { id: "workout", icon: "Dumbbell", label: "Тренировки" },
  { id: "nutrition", icon: "Salad", label: "Питание" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "chat", icon: "MessageCircle", label: "Чаты" },
  { id: "profile", icon: "User", label: "Профиль" },
] as const;

export const programs = [
  { id: 1, title: "Жиросжигание", subtitle: "12 недель · 4 дня/нед", level: "Начинающий", tag: "ДЛЯ ВАС", tagColor: "bg-neon text-dark-bg", desc: "Идеально для снижения веса без потери мышц", match: 98 },
  { id: 2, title: "Набор массы", subtitle: "16 недель · 5 дней/нед", level: "Средний", tag: "ПОПУЛЯРНО", tagColor: "bg-orange-500 text-white", desc: "Силовой тренинг с прогрессивной нагрузкой", match: 87 },
  { id: 3, title: "Рельеф тела", subtitle: "8 недель · 6 дней/нед", level: "Продвинутый", tag: "ХАРДКОР", tagColor: "bg-red-600 text-white", desc: "Интенсивные HIIT-тренировки для рельефа", match: 74 },
];

export const workouts = [
  { id: 1, day: "ПН", title: "Грудь и трицепс", exercises: 8, duration: "55 мин", done: true },
  { id: 2, day: "СР", title: "Спина и бицепс", exercises: 9, duration: "60 мин", done: true },
  { id: 3, day: "ПТ", title: "Плечи и пресс", exercises: 7, duration: "45 мин", done: false },
  { id: 4, day: "ВС", title: "Ноги и ягодицы", exercises: 10, duration: "70 мин", done: false },
];

export const exercises = [
  { name: "Жим штанги лёжа", sets: "4×10", weight: "80 кг", done: true },
  { name: "Разводка гантелей", sets: "3×12", weight: "20 кг", done: true },
  { name: "Отжимания на брусьях", sets: "3×15", weight: "—", done: false },
  { name: "Французский жим", sets: "3×12", weight: "30 кг", done: false },
  { name: "Кроссовер на блоке", sets: "3×15", weight: "15 кг", done: false },
];

// БЖУ в граммах, без калорий
export const meals = [
  { time: "08:00", title: "Завтрак", protein: 42, fat: 15, carbs: 55, items: ["Овсянка 200г", "Яйца 3шт", "Банан"] },
  { time: "11:00", title: "Перекус", protein: 30, fat: 8, carbs: 20, items: ["Протеиновый коктейль", "Яблоко"] },
  { time: "14:00", title: "Обед", protein: 55, fat: 20, carbs: 65, items: ["Куриная грудка 200г", "Рис 150г", "Овощной салат"] },
  { time: "17:00", title: "Полдник", protein: 20, fat: 7, carbs: 18, items: ["Творог 150г", "Мёд"] },
  { time: "20:00", title: "Ужин", protein: 48, fat: 22, carbs: 30, items: ["Лосось 200г", "Брокколи", "Греческий салат"] },
];

export const chatMessages = [
  { id: 1, user: "Артём К.", avatar: "АК", time: "14:23", text: "Ребята, кто пробовал программу Рельеф тела? Реально работает?", isMe: false },
  { id: 2, user: "Мария О.", avatar: "МО", time: "14:25", text: "Да! Прошла 4 недели — минус 3 кг жира при том же весе 💪", isMe: false },
  { id: 3, user: "Вы", avatar: "Я", time: "14:28", text: "Тоже начал на прошлой неделе. Кардио убивает, но результат уже виден", isMe: true },
  { id: 4, user: "Тренер Иван", avatar: "ТИ", time: "14:30", text: "Главное — не пропускать кардио сессии. Именно они дают ускорение метаболизма на 24ч", isMe: false },
];

export const weekStats = [
  { day: "Пн", value: 85 },
  { day: "Вт", value: 0 },
  { day: "Ср", value: 92 },
  { day: "Чт", value: 0 },
  { day: "Пт", value: 78 },
  { day: "Сб", value: 65 },
  { day: "Вс", value: 0 },
];

// БЖУ цели
export const BJU_GOAL = { protein: 195, fat: 72, carbs: 220 };
