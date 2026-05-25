import Icon from "@/components/ui/icon";
import { MacroBadge } from "@/components/AuthScreens";
import { User, weekStats, BJU_GOAL, productDatabase, weekWorkouts } from "@/components/data";

const TRAINER_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/bucket/3193a692-0d71-4309-ae98-75af828e9c83.jpg";

interface HomeTabProps {
  user: User;
  onStartWorkout: () => void;
  onGoToCourses: () => void;
}

export default function HomeTab({ user, onStartWorkout, onGoToCourses }: HomeTabProps) {
  // Считаем БЖУ по дефолтным продуктам (первые 3)
  const defaultProducts = [
    { ...productDatabase[0], qty: 150 },
    { ...productDatabase[1], qty: 2 },
    { ...productDatabase[6], qty: 100 },
  ];
  const totalProtein = defaultProducts.reduce((s, p) => s + Math.round(p.protein * p.qty / 100), 0);
  const totalFat = defaultProducts.reduce((s, p) => s + Math.round(p.fat * p.qty / 100), 0);
  const totalCarbs = defaultProducts.reduce((s, p) => s + Math.round(p.carbs * p.qty / 100), 0);

  const todayWorkout = weekWorkouts.find(w => w.type !== "отдых" && !w.done) || weekWorkouts[1];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src={TRAINER_IMG} alt="Тренер" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-dark-bg" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-xs font-display text-neon tracking-[0.3em] mb-1">ПРИВЕТ, {user.name.toUpperCase()}</div>
          <h1 className="font-display text-4xl text-white leading-none">СЕГОДНЯ<br /><span className="text-neon">{todayWorkout.day} — {todayWorkout.type.toUpperCase()}</span></h1>
        </div>
        <div className="absolute top-5 right-5">
          <div className="card-dark rounded-full px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse-neon" />
            <span className="text-xs font-body text-white/70">Неделя 3</span>
          </div>
        </div>
      </div>

      {/* БЖУ сегодня */}
      <div className="px-4 -mt-4 mb-5">
        <div className="card-dark rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/40 font-display tracking-widest">БЖУ СЕГОДНЯ</div>
            <span className="text-[10px] text-neon font-body cursor-pointer">Изменить рацион →</span>
          </div>
          <div className="flex gap-2">
            <MacroBadge label="Белки" value={totalProtein} goal={BJU_GOAL.protein} color="text-blue-400" />
            <MacroBadge label="Жиры" value={totalFat} goal={BJU_GOAL.fat} color="text-yellow-400" />
            <MacroBadge label="Углеводы" value={totalCarbs} goal={BJU_GOAL.carbs} color="text-orange-400" />
          </div>
        </div>
      </div>

      {/* Тренировка сегодня */}
      <div className="px-4 mb-5">
        <div className="relative rounded-2xl overflow-hidden border border-neon/20" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2000 100%)' }}>
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-neon/5 -mr-6 -mt-6" />
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-display text-neon tracking-widest">
                {todayWorkout.type === "зарядка" ? "☀️ ЗАРЯДКА" : "💪 ТРЕНИРОВКА"} · {todayWorkout.duration}
              </span>
            </div>
            <div className="font-display text-xl text-white mb-1">{todayWorkout.label.toUpperCase()}</div>
            <div className="text-sm text-white/50 font-body mb-4">
              {todayWorkout.exercises.length} упражнений · {todayWorkout.duration}
            </div>
            <button onClick={onStartWorkout} className="btn-neon w-full py-3 rounded-xl text-sm">
              НАЧАТЬ
            </button>
          </div>
        </div>
      </div>

      {/* Бесплатно / Платно */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Бесплатно */}
          <div className="card-dark rounded-2xl p-4 border border-white/06">
            <div className="text-[10px] text-white/40 font-display tracking-wider mb-2">БЕСПЛАТНО</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">Зарядка и тренировки</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">Конструктор питания</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">Готовые меню</span>
              </div>
            </div>
          </div>

          {/* Платно */}
          <div className="rounded-2xl p-4 border border-neon/30 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2500 100%)' }}>
            <div className="text-[10px] text-neon font-display tracking-wider mb-2">ПЛАТНЫЕ КУРСЫ</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="Star" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">Курс под вашу цель</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">Учёт травм</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={14} className="text-neon flex-shrink-0" />
                <span className="text-xs text-white/70 font-body">4–12 недель</span>
              </div>
            </div>
            <button onClick={onGoToCourses} className="btn-neon w-full py-2 rounded-lg text-xs mt-3">
              ВЫБРАТЬ КУРС
            </button>
          </div>
        </div>
      </div>

      {/* Активность недели */}
      <div className="px-4 mb-5">
        <h2 className="font-display text-lg text-white mb-3">НЕДЕЛЯ</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden pb-1">
          {weekWorkouts.map((w, i) => (
            <div key={i} className={`flex-shrink-0 w-12 rounded-xl p-2 text-center border transition-all
              ${w.done ? 'bg-neon/10 border-neon/30' : w.type === 'отдых' ? 'bg-white/03 border-white/06' : 'card-dark border-white/10'}`}>
              <div className={`text-[10px] font-display mb-1 ${w.done ? 'text-neon' : 'text-white/40'}`}>{w.day}</div>
              <div className="text-base">
                {w.done ? '✅' : w.type === 'зарядка' ? '☀️' : w.type === 'тренировка' ? '💪' : '😴'}
              </div>
              <div className={`text-[8px] font-body mt-1 ${w.done ? 'text-neon' : 'text-white/25'}`}>
                {w.type === 'отдых' ? 'отдых' : w.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Активность баров */}
      <div className="px-4 mb-6">
        <div className="card-dark rounded-2xl p-4">
          <div className="flex items-end gap-2 h-20">
            {weekStats.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative rounded-sm overflow-hidden" style={{ height: '60px' }}>
                  <div className="absolute bottom-0 w-full rounded-sm transition-all"
                    style={{ height: `${s.value}%`, background: s.value > 0 ? 'linear-gradient(180deg, #AAEF00, #66CC00)' : '#222' }} />
                </div>
                <span className="text-[10px] text-white/30 font-body">{s.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/40 font-body">
            <span>3 из 5 активных дней</span>
            <span className="text-neon">+20% vs прошлая неделя</span>
          </div>
        </div>
      </div>
    </div>
  );
}