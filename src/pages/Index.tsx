import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/731f66dd-6179-4df4-96e8-11b09fc4c7e0.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/b3a16762-32bf-49bf-bdd0-0c4e7f2e5c4c.jpg";
const PROGRESS_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/files/022be1ad-6d24-4d2e-8f2b-3660c5f5d958.jpg";

type Tab = "home" | "programs" | "workout" | "nutrition" | "progress" | "chat" | "profile";

const navItems = [
  { id: "home", icon: "Home", label: "Главная" },
  { id: "programs", icon: "LayoutGrid", label: "Программы" },
  { id: "workout", icon: "Dumbbell", label: "Тренировки" },
  { id: "nutrition", icon: "Salad", label: "Питание" },
  { id: "progress", icon: "TrendingUp", label: "Прогресс" },
  { id: "chat", icon: "MessageCircle", label: "Чаты" },
  { id: "profile", icon: "User", label: "Профиль" },
] as const;

const programs = [
  { id: 1, title: "Жиросжигание", subtitle: "12 недель · 4 дня/нед", level: "Начинающий", tag: "ДЛЯ ВАС", tagColor: "bg-neon text-dark-bg", desc: "Идеально для снижения веса без потери мышц", match: 98 },
  { id: 2, title: "Набор массы", subtitle: "16 недель · 5 дней/нед", level: "Средний", tag: "ПОПУЛЯРНО", tagColor: "bg-orange-500 text-white", desc: "Силовой тренинг с прогрессивной нагрузкой", match: 87 },
  { id: 3, title: "Рельеф тела", subtitle: "8 недель · 6 дней/нед", level: "Продвинутый", tag: "ХАРДКОР", tagColor: "bg-red-600 text-white", desc: "Интенсивные HIIT-тренировки для рельефа", match: 74 },
];

const workouts = [
  { id: 1, day: "ПН", title: "Грудь и трицепс", exercises: 8, duration: "55 мин", kcal: 420, done: true },
  { id: 2, day: "СР", title: "Спина и бицепс", exercises: 9, duration: "60 мин", kcal: 450, done: true },
  { id: 3, day: "ПТ", title: "Плечи и пресс", exercises: 7, duration: "45 мин", kcal: 380, done: false },
  { id: 4, day: "ВС", title: "Ноги и ягодицы", exercises: 10, duration: "70 мин", kcal: 520, done: false },
];

const exercises = [
  { name: "Жим штанги лёжа", sets: "4×10", weight: "80 кг", done: true },
  { name: "Разводка гантелей", sets: "3×12", weight: "20 кг", done: true },
  { name: "Отжимания на брусьях", sets: "3×15", weight: "—", done: false },
  { name: "Французский жим", sets: "3×12", weight: "30 кг", done: false },
  { name: "Кроссовер на блоке", sets: "3×15", weight: "15 кг", done: false },
];

const meals = [
  { time: "08:00", title: "Завтрак", kcal: 520, protein: 42, carbs: 55, fat: 15, items: ["Овсянка 200г", "Яйца 3шт", "Банан"] },
  { time: "11:00", title: "Перекус", kcal: 280, protein: 30, carbs: 20, fat: 8, items: ["Протеиновый коктейль", "Яблоко"] },
  { time: "14:00", title: "Обед", kcal: 680, protein: 55, carbs: 65, fat: 20, items: ["Куриная грудка 200г", "Рис 150г", "Овощной салат"] },
  { time: "17:00", title: "Полдник", kcal: 220, protein: 20, carbs: 18, fat: 7, items: ["Творог 150г", "Мёд"] },
  { time: "20:00", title: "Ужин", kcal: 550, protein: 48, carbs: 30, fat: 22, items: ["Лосось 200г", "Брокколи", "Греческий салат"] },
];

const chatMessages = [
  { id: 1, user: "Артём К.", avatar: "АК", time: "14:23", text: "Ребята, кто пробовал программу Рельеф тела? Реально работает?", isMe: false },
  { id: 2, user: "Мария О.", avatar: "МО", time: "14:25", text: "Да! Прошла 4 недели — минус 3 кг жира при том же весе 💪", isMe: false },
  { id: 3, user: "Вы", avatar: "Я", time: "14:28", text: "Тоже начал на прошлой неделе. Кардио убивает, но результат уже виден", isMe: true },
  { id: 4, user: "Тренер Иван", avatar: "ТИ", time: "14:30", text: "Главное — не пропускать кардио сессии. Именно они дают ускорение метаболизма на 24ч", isMe: false },
];

const weekStats = [
  { day: "Пн", value: 85 },
  { day: "Вт", value: 0 },
  { day: "Ср", value: 92 },
  { day: "Чт", value: 0 },
  { day: "Пт", value: 78 },
  { day: "Сб", value: 65 },
  { day: "Вс", value: 0 },
];

export default function ForzaApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [goalStep, setGoalStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col max-w-md mx-auto relative overflow-hidden">

      {/* === HOME === */}
      {activeTab === "home" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
          <div className="relative h-72 overflow-hidden">
            <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-dark-bg" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="text-xs font-display text-neon tracking-[0.3em] mb-1">ДОБРО ПОЖАЛОВАТЬ</div>
              <h1 className="font-display text-4xl text-white leading-none">СЕГОДНЯ<br /><span className="text-neon">ДЕНЬ X</span></h1>
            </div>
            <div className="absolute top-5 right-5">
              <div className="card-dark rounded-full px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon animate-pulse-neon" />
                <span className="text-xs font-body text-white/70">Неделя 3 / 12</span>
              </div>
            </div>
          </div>

          <div className="px-4 -mt-4 mb-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "Flame", value: "1 847", label: "Ккал сегодня", cls: "text-neon" },
                { icon: "Clock", value: "55 мин", label: "Тренировка", cls: "text-neon" },
                { icon: "Droplets", value: "2.1 л", label: "Вода", cls: "text-blue-400" },
              ].map(({ icon, value, label, cls }) => (
                <div key={label} className="card-dark rounded-xl p-4 flex flex-col gap-1">
                  <Icon name={icon} size={20} className={cls} />
                  <div className={`font-display text-2xl font-bold ${cls}`}>{value}</div>
                  <div className="text-xs text-white/40 font-body uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-neon/20" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2000 100%)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-neon/5 -mr-8 -mt-8" />
              <div className="p-5">
                <div className="text-xs text-neon font-display tracking-widest mb-2">ТРЕНИРОВКА СЕГОДНЯ</div>
                <div className="font-display text-2xl text-white mb-1">ГРУДЬ И ТРИЦЕПС</div>
                <div className="flex items-center gap-3 text-sm text-white/50 font-body mb-4 flex-wrap">
                  <span>8 упражнений</span>
                  <span>·</span>
                  <span>55 минут</span>
                  <span>·</span>
                  <span>~420 ккал</span>
                </div>
                <button
                  onClick={() => { setSelectedWorkout(1); setActiveTab("workout"); }}
                  className="btn-neon w-full py-3 rounded-xl text-sm"
                >
                  НАЧАТЬ ТРЕНИРОВКУ
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg text-white">ДЛЯ ВАС</h2>
              <span className="text-xs text-neon font-body cursor-pointer" onClick={() => setActiveTab("programs")}>Все программы →</span>
            </div>
            <div className="card-dark rounded-2xl p-4 flex gap-4 items-center border border-neon/10">
              <div className="relative">
                <img src={HERO_IMG} alt="Program" className="w-20 h-20 rounded-xl object-cover" />
                <div className="absolute -top-1 -right-1 bg-neon text-dark-bg text-[10px] font-display font-bold px-1.5 py-0.5 rounded-full">98%</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-neon font-display tracking-wider mb-1">РЕКОМЕНДОВАНО ВАМ</div>
                <div className="font-display text-lg text-white leading-tight mb-1">ЖИРОСЖИГАНИЕ</div>
                <div className="text-xs text-white/50 font-body">12 недель · Начинающий</div>
                <button className="mt-2 btn-outline-neon text-xs py-1 px-3 rounded-lg">Подробнее</button>
              </div>
            </div>
          </div>

          <div className="px-4 mb-6">
            <h2 className="font-display text-lg text-white mb-3">АКТИВНОСТЬ НЕДЕЛИ</h2>
            <div className="card-dark rounded-2xl p-4">
              <div className="flex items-end gap-2 h-24">
                {weekStats.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative rounded-sm overflow-hidden" style={{ height: '72px' }}>
                      <div
                        className="absolute bottom-0 w-full rounded-sm transition-all"
                        style={{ height: `${s.value}%`, background: s.value > 0 ? 'linear-gradient(180deg, #AAEF00, #66CC00)' : '#222' }}
                      />
                    </div>
                    <span className="text-[10px] text-white/30 font-body">{s.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-white/40 font-body">
                <span>3 из 7 тренировок</span>
                <span className="text-neon">+12% vs прошлая неделя</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === PROGRAMS === */}
      {activeTab === "programs" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
          {selectedProgram === null ? (
            <>
              {goalStep < 3 ? (
                <div className="p-6 animate-fade-up">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i <= goalStep ? 'bg-neon w-8' : 'bg-white/20 w-4'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-white/40 font-body">{goalStep + 1} / 3</span>
                  </div>

                  {goalStep === 0 && (
                    <div>
                      <h2 className="font-display text-3xl mb-2 text-white">ВАША<br /><span className="text-neon">ЦЕЛЬ</span></h2>
                      <p className="text-white/50 font-body text-sm mb-6">Выберите основную цель тренировок</p>
                      <div className="space-y-3">
                        {["Снизить вес", "Набрать мышечную массу", "Улучшить рельеф", "Повысить выносливость"].map(goal => (
                          <button
                            key={goal}
                            onClick={() => { setSelectedGoal(goal); setGoalStep(1); }}
                            className={`w-full p-4 rounded-xl border text-left font-display text-base tracking-wide transition-all
                              ${selectedGoal === goal ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 bg-card-bg text-white hover:border-neon/40'}`}
                          >
                            {goal.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {goalStep === 1 && (
                    <div>
                      <h2 className="font-display text-3xl mb-2 text-white">УРОВЕНЬ<br /><span className="text-neon">ПОДГОТОВКИ</span></h2>
                      <p className="text-white/50 font-body text-sm mb-6">Честно оцените свой уровень</p>
                      <div className="space-y-3">
                        {[
                          { label: "Начинающий", desc: "До 6 месяцев опыта" },
                          { label: "Средний", desc: "6–24 месяца опыта" },
                          { label: "Продвинутый", desc: "Более 2 лет опыта" },
                        ].map(({ label, desc }) => (
                          <button
                            key={label}
                            onClick={() => { setSelectedLevel(label); setGoalStep(2); }}
                            className="w-full p-4 rounded-xl border border-white/10 bg-card-bg text-left hover:border-neon/40 transition-all"
                          >
                            <div className="font-display text-base text-white">{label.toUpperCase()}</div>
                            <div className="text-xs text-white/40 font-body mt-0.5">{desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {goalStep === 2 && (
                    <div>
                      <h2 className="font-display text-3xl mb-2 text-white">ПРЕДПОЧТЕНИЯ<br /><span className="text-neon">ТРЕНИРОВОК</span></h2>
                      <p className="text-white/50 font-body text-sm mb-6">Выберите удобный формат</p>
                      <div className="space-y-3">
                        {["Тренажёрный зал", "Дома без инвентаря", "Кардио на улице", "Бассейн", "Групповые занятия"].map(pref => (
                          <button
                            key={pref}
                            className="w-full p-4 rounded-xl border border-white/10 bg-card-bg text-left hover:border-neon/40 transition-all font-display text-base text-white"
                          >
                            {pref.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setGoalStep(3)} className="btn-neon w-full py-4 rounded-xl mt-6 text-sm">
                        ПОДОБРАТЬ ПРОГРАММЫ
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-fade-up">
                  <div className="px-4 pt-6 pb-4">
                    <div className="text-xs text-neon font-display tracking-widest mb-1">ПОДОБРАНО ДЛЯ ВАС</div>
                    <h2 className="font-display text-3xl text-white">ПРОГРАММЫ</h2>
                  </div>
                  <div className="px-4 space-y-4 pb-4">
                    {programs.map((p) => (
                      <div
                        key={p.id}
                        className="card-dark rounded-2xl overflow-hidden cursor-pointer hover:border-neon/30 transition-all border border-white/06"
                        onClick={() => setSelectedProgram(p.id)}
                      >
                        <div className="relative h-40">
                          <img src={HERO_IMG} alt={p.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-black/60 rounded-full px-2 py-1 flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-neon" />
                              <span className="text-xs font-body text-neon">{p.match}%</span>
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <div className="font-display text-2xl text-white">{p.title.toUpperCase()}</div>
                            <div className="text-xs text-white/60 font-body">{p.subtitle}</div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-white/60 font-body mb-3">{p.desc}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40 font-body border border-white/10 rounded-full px-2 py-0.5">{p.level}</span>
                            <button className="btn-neon text-xs py-1.5 px-4 rounded-lg">Начать</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="animate-fade-up">
              <div className="relative h-64">
                <img src={HERO_IMG} alt="Program" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-dark-bg" />
                <button onClick={() => setSelectedProgram(null)} className="absolute top-5 left-4 card-dark rounded-full p-2">
                  <Icon name="ArrowLeft" size={20} className="text-white" />
                </button>
              </div>
              <div className="px-4 -mt-6">
                <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded-full bg-neon text-dark-bg">ДЛЯ ВАС · 98% СОВПАДЕНИЕ</span>
                <h1 className="font-display text-4xl text-white mt-2 mb-1">ЖИРОСЖИГАНИЕ</h1>
                <p className="text-white/50 font-body text-sm mb-5">12 недель интенсивной программы для снижения жировой массы с сохранением мышц</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[["12", "НЕДЕЛЬ"], ["4-5", "ДНЕЙ/НЕД"], ["420", "ККАЛ/ТР."]].map(([v, l]) => (
                    <div key={l} className="card-dark-2 rounded-xl p-3 text-center">
                      <div className="font-display text-2xl text-neon">{v}</div>
                      <div className="text-[10px] text-white/40 font-body uppercase tracking-wider mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-neon w-full py-4 rounded-xl mb-6 text-sm">НАЧАТЬ ПРОГРАММУ</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === WORKOUT === */}
      {activeTab === "workout" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
          {selectedWorkout === null ? (
            <div className="animate-fade-up">
              <div className="px-4 pt-6 pb-4">
                <div className="text-xs text-neon font-display tracking-widest mb-1">НЕДЕЛЯ 3</div>
                <h2 className="font-display text-3xl text-white">ТРЕНИРОВКИ</h2>
              </div>
              <div className="px-4 space-y-3">
                {workouts.map((w) => (
                  <div
                    key={w.id}
                    className={`rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all
                      ${w.done ? 'bg-neon/5 border border-neon/20' : 'card-dark border border-white/06 hover:border-neon/20'}`}
                    onClick={() => setSelectedWorkout(w.id)}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display text-sm font-bold flex-shrink-0
                      ${w.done ? 'bg-neon text-dark-bg' : 'bg-white/5 text-white/40'}`}>
                      {w.done ? <Icon name="Check" size={20} /> : w.day}
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-base text-white">{w.title.toUpperCase()}</div>
                      <div className="text-xs text-white/40 font-body mt-0.5">{w.exercises} упр. · {w.duration} · ~{w.kcal} ккал</div>
                    </div>
                    {w.done ? (
                      <span className="text-xs text-neon font-body">Выполнено</span>
                    ) : (
                      <Icon name="ChevronRight" size={16} className="text-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-up">
              <div className="px-4 pt-6 pb-4 flex items-center gap-3">
                <button onClick={() => setSelectedWorkout(null)} className="card-dark rounded-full p-2">
                  <Icon name="ArrowLeft" size={18} className="text-white" />
                </button>
                <div>
                  <div className="text-xs text-neon font-display tracking-wider">СЕГОДНЯ · ПЯТНИЦА</div>
                  <h2 className="font-display text-xl text-white">ГРУДЬ И ТРИЦЕПС</h2>
                </div>
              </div>

              <div className="mx-4 mb-5 rounded-2xl p-5 text-center diagonal-stripe" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2200 100%)', border: '1px solid rgba(170,239,0,0.15)' }}>
                <div className="text-xs text-neon font-display tracking-widest mb-1">ТАЙМЕР</div>
                <div className="font-display text-5xl text-white mb-3">24:38</div>
                <div className="flex gap-3 justify-center">
                  <button className="btn-neon py-2 px-6 rounded-xl text-sm">ПАУЗА</button>
                  <button className="btn-outline-neon py-2 px-4 rounded-xl text-sm">СТОП</button>
                </div>
              </div>

              <div className="px-4 space-y-2">
                {exercises.map((ex, i) => (
                  <div key={i} className={`rounded-xl p-4 flex items-center gap-3 transition-all
                    ${ex.done ? 'bg-neon/5 border border-neon/20' : 'card-dark border border-white/06'}`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${ex.done ? 'bg-neon border-neon' : 'border-white/20'}`}>
                      {ex.done && <Icon name="Check" size={12} className="text-dark-bg" />}
                    </div>
                    <div className="flex-1">
                      <div className={`font-body text-sm font-medium ${ex.done ? 'text-white/50 line-through' : 'text-white'}`}>{ex.name}</div>
                      <div className="text-xs text-white/30 font-body">{ex.sets} · {ex.weight}</div>
                    </div>
                    {!ex.done && (
                      <button className="text-xs text-neon font-body border border-neon/30 rounded-lg px-3 py-1">Начать</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 mt-5 mb-4">
                <button className="btn-neon w-full py-4 rounded-xl text-sm">ЗАВЕРШИТЬ ТРЕНИРОВКУ</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === NUTRITION === */}
      {activeTab === "nutrition" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
          <div className="px-4 pt-6 pb-4">
            <div className="text-xs text-neon font-display tracking-widest mb-1">СЕГОДНЯ</div>
            <h2 className="font-display text-3xl text-white">ПИТАНИЕ</h2>
          </div>

          <div className="mx-4 mb-5 rounded-2xl overflow-hidden">
            <img src={FOOD_IMG} alt="Nutrition" className="w-full h-36 object-cover" />
          </div>

          <div className="px-4 mb-5">
            <div className="card-dark rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-display text-base text-white">КАЛОРИИ</span>
                <span className="font-display text-xl text-neon">{totalKcal} / 2250</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="progress-bar h-full rounded-full" style={{ width: `${Math.round((totalKcal / 2250) * 100)}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Белки", value: `${totalProtein}г`, target: "195г", color: "text-blue-400" },
                  { label: "Углеводы", value: "188г", target: "220г", color: "text-orange-400" },
                  { label: "Жиры", value: "72г", target: "75г", color: "text-yellow-400" },
                ].map(({ label, value, target, color }) => (
                  <div key={label} className="text-center">
                    <div className={`font-display text-lg font-bold ${color}`}>{value}</div>
                    <div className="text-[10px] text-white/30 font-body">из {target}</div>
                    <div className="text-[10px] text-white/50 font-body uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 space-y-3">
            {meals.map((m, i) => (
              <div key={i} className="card-dark rounded-xl overflow-hidden border border-white/06">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-white/30 font-body w-10">{m.time}</div>
                    <div>
                      <div className="font-display text-sm text-white">{m.title.toUpperCase()}</div>
                      <div className="text-xs text-white/40 font-body">{m.items.join(", ")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-base text-neon">{m.kcal}</div>
                    <div className="text-[10px] text-white/30 font-body">ккал</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 mt-4">
            <button className="btn-outline-neon w-full py-3 rounded-xl text-sm">+ ДОБАВИТЬ ПРИЁМ ПИЩИ</button>
          </div>
        </div>
      )}

      {/* === PROGRESS === */}
      {activeTab === "progress" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
          <div className="px-4 pt-6 pb-4">
            <div className="text-xs text-neon font-display tracking-widest mb-1">МАЙ 2026</div>
            <h2 className="font-display text-3xl text-white">ПРОГРЕСС</h2>
          </div>

          <div className="mx-4 mb-5 rounded-2xl overflow-hidden">
            <img src={PROGRESS_IMG} alt="Progress" className="w-full h-40 object-cover" />
          </div>

          <div className="px-4 grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Текущий вес", value: "81.4 кг", delta: "−3.6 кг", icon: "TrendingDown" },
              { label: "Жировая масса", value: "18.2%", delta: "−2.1%", icon: "TrendingDown" },
              { label: "Тренировок", value: "24", delta: "+8 vs прошлый", icon: "TrendingUp" },
              { label: "Рекорд: жим", value: "90 кг", delta: "+10 кг", icon: "TrendingUp" },
            ].map(({ label, value, delta, icon }) => (
              <div key={label} className="card-dark rounded-xl p-4">
                <div className="text-xs text-white/40 font-body uppercase tracking-wider mb-1">{label}</div>
                <div className="font-display text-xl text-white">{value}</div>
                <div className="text-xs font-body mt-1 flex items-center gap-1 text-neon">
                  <Icon name={icon} size={12} />
                  {delta}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 mb-5">
            <h3 className="font-display text-base text-white mb-3">ДОСТИЖЕНИЯ</h3>
            <div className="flex gap-3 overflow-x-auto scrollbar-hidden pb-1">
              {[
                { icon: "🔥", title: "7-дневный стрик", desc: "Не пропустил неделю" },
                { icon: "💪", title: "Силовой рост", desc: "+10 кг в жиме" },
                { icon: "⚡", title: "HIIT мастер", desc: "10 кардио сессий" },
                { icon: "🥗", title: "Правильное питание", desc: "5 дней в норме" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="card-dark-2 rounded-xl p-3 min-w-32 flex-shrink-0 text-center border border-neon/10">
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-display text-[10px] text-neon leading-tight">{title.toUpperCase()}</div>
                  <div className="text-[10px] text-white/30 font-body mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 mb-5">
            <h3 className="font-display text-base text-white mb-3">СТАТИСТИКА МЕСЯЦА</h3>
            <div className="card-dark rounded-2xl p-4 space-y-4">
              {[
                { label: "Выполнение тренировок", value: 78 },
                { label: "Соблюдение питания", value: 85 },
                { label: "Достижение нормы воды", value: 60 },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-body mb-1.5">
                    <span className="text-white/60">{label}</span>
                    <span className="text-neon">{value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="progress-bar h-full rounded-full" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === CHAT === */}
      {activeTab === "chat" && (
        <div className="flex flex-col overflow-hidden animate-fade-up" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="px-4 pt-6 pb-4 flex items-center justify-between flex-shrink-0">
            <div>
              <div className="text-xs text-neon font-display tracking-widest mb-1">СООБЩЕСТВО</div>
              <h2 className="font-display text-3xl text-white">ЧАТЫ</h2>
            </div>
            <div className="flex items-center gap-1.5 bg-neon/10 border border-neon/20 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs text-neon font-body">247 онлайн</span>
            </div>
          </div>

          <div className="px-4 mb-4 flex gap-2 flex-shrink-0">
            {["Общий чат", "Тренеры", "Питание"].map((t, i) => (
              <button key={t} className={`text-xs font-display tracking-wider py-1.5 px-3 rounded-full border transition-all
                ${i === 0 ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 text-white/40 hover:border-white/30'}`}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hidden px-4 space-y-4 pb-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-display flex-shrink-0
                  ${msg.isMe ? 'bg-neon text-dark-bg' : 'bg-white/10 text-white'}`}>
                  {msg.avatar}
                </div>
                <div className={`max-w-[75%] flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  {!msg.isMe && <span className="text-[10px] text-neon font-display">{msg.user}</span>}
                  <div className={`rounded-2xl px-3 py-2 text-sm font-body leading-relaxed
                    ${msg.isMe ? 'bg-neon text-dark-bg rounded-tr-sm' : 'bg-card-bg-2 text-white rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-white/25 font-body">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-white/05 flex-shrink-0">
            <div className="flex gap-2 items-center">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Написать сообщение..."
                className="flex-1 bg-card-bg-2 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-body placeholder:text-white/25 outline-none focus:border-neon/40"
              />
              <button className="btn-neon rounded-xl p-2.5">
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === PROFILE === */}
      {activeTab === "profile" && (
        <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
          <div className="relative h-44">
            <div className="absolute inset-0 diagonal-stripe" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2200 100%)' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <div className="w-20 h-20 rounded-full bg-neon flex items-center justify-center font-display text-3xl text-dark-bg mb-2">АК</div>
              <div className="font-display text-xl text-white">АЛЕКСЕЙ КНЯЗЕВ</div>
              <div className="text-xs text-white/40 font-body mt-0.5">Начинающий · Программа 3 из 12</div>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                <span className="text-xs text-neon font-body">Стрик 7 дней 🔥</span>
              </div>
            </div>
          </div>

          <div className="px-4 mb-5 mt-5">
            <div className="card-dark rounded-2xl p-4 border border-neon/10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-xs text-neon font-display tracking-wider">ТЕКУЩАЯ ЦЕЛЬ</div>
                  <div className="font-display text-lg text-white mt-0.5">СНИЗИТЬ ВЕС</div>
                </div>
                <button className="text-xs text-white/40 font-body border border-white/10 rounded-lg px-2 py-1">Изменить</button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="progress-bar h-full rounded-full" style={{ width: '42%' }} />
                </div>
                <span className="text-xs text-neon font-body">42%</span>
              </div>
              <div className="text-xs text-white/30 font-body mt-1">−3.6 кг из цели −8.5 кг</div>
            </div>
          </div>

          <div className="px-4 mb-5">
            <h3 className="font-display text-base text-white mb-3">НАСТРОЙКИ</h3>
            <div className="card-dark rounded-2xl overflow-hidden">
              {[
                { icon: "Bell", label: "Уведомления", value: "Включены" },
                { icon: "Target", label: "Ежедневная цель", value: "2250 ккал" },
                { icon: "Ruler", label: "Единицы измерения", value: "Кг / Км" },
                { icon: "Moon", label: "Тёмная тема", value: "Включена" },
                { icon: "Shield", label: "Приватность", value: "" },
                { icon: "HelpCircle", label: "Поддержка", value: "" },
              ].map(({ icon, label, value }, i) => (
                <div key={label} className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/03 transition-all ${i > 0 ? 'border-t border-white/06' : ''}`}>
                  <Icon name={icon} size={18} className="text-white/40" />
                  <span className="flex-1 font-body text-sm text-white">{label}</span>
                  {value && <span className="text-xs text-white/30 font-body">{value}</span>}
                  <Icon name="ChevronRight" size={14} className="text-white/20" />
                </div>
              ))}
            </div>
          </div>

          <div className="px-4">
            <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-display text-sm tracking-wide hover:bg-red-500/10 transition-all">
              ВЫЙТИ ИЗ АККАУНТА
            </button>
          </div>
        </div>
      )}

      {/* === BOTTOM NAV === */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-dark-bg/95 backdrop-blur-xl border-t border-white/08 z-50">
        <div className="flex items-stretch">
          {navItems.map(({ id, icon, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-all relative"
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-neon rounded-b-full" />
                )}
                <Icon name={icon} size={20} className={isActive ? 'text-neon' : 'text-white/30'} />
                <span className={`text-[9px] font-body uppercase tracking-wider ${isActive ? 'text-neon' : 'text-white/25'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}