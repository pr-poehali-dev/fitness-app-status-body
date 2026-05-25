import Icon from "@/components/ui/icon";
import { MacroBadge } from "@/components/AuthScreens";
import { User, HERO_IMG, weekStats, BJU_GOAL, meals } from "@/components/data";

interface HomeTabProps {
  user: User;
  onStartWorkout: () => void;
  onGoToPrograms: () => void;
}

export default function HomeTab({ user, onStartWorkout, onGoToPrograms }: HomeTabProps) {
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
      <div className="relative h-72 overflow-hidden">
        <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-dark-bg" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-xs font-display text-neon tracking-[0.3em] mb-1">ПРИВЕТ, {user.name.toUpperCase()}</div>
          <h1 className="font-display text-4xl text-white leading-none">СЕГОДНЯ<br /><span className="text-neon">ДЕНЬ X</span></h1>
        </div>
        <div className="absolute top-5 right-5">
          <div className="card-dark rounded-full px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon animate-pulse-neon" />
            <span className="text-xs font-body text-white/70">Неделя 3 / 12</span>
          </div>
        </div>
      </div>

      {/* БЖУ на сегодня */}
      <div className="px-4 -mt-4 mb-6">
        <div className="card-dark rounded-2xl p-4">
          <div className="text-xs text-white/40 font-display tracking-widest mb-3">БЖУ СЕГОДНЯ</div>
          <div className="flex gap-2">
            <MacroBadge label="Белки" value={totalProtein} goal={BJU_GOAL.protein} color="text-blue-400" />
            <MacroBadge label="Жиры" value={totalFat} goal={BJU_GOAL.fat} color="text-yellow-400" />
            <MacroBadge label="Углеводы" value={totalCarbs} goal={BJU_GOAL.carbs} color="text-orange-400" />
          </div>
        </div>
      </div>

      {/* Today Workout Banner */}
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
            </div>
            <button onClick={onStartWorkout} className="btn-neon w-full py-3 rounded-xl text-sm">
              НАЧАТЬ ТРЕНИРОВКУ
            </button>
          </div>
        </div>
      </div>

      {/* Recommended program */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-white">ДЛЯ ВАС</h2>
          <span className="text-xs text-neon font-body cursor-pointer" onClick={onGoToPrograms}>Все программы →</span>
        </div>
        <div className="card-dark rounded-2xl p-4 flex gap-4 items-center border border-neon/10">
          <div className="relative">
            <img src={HERO_IMG} alt="Program" className="w-20 h-20 rounded-xl object-cover" />
            <div className="absolute -top-1 -right-1 bg-neon text-dark-bg text-[10px] font-display font-bold px-1.5 py-0.5 rounded-full">98%</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-neon font-display tracking-wider mb-1">РЕКОМЕНДОВАНО</div>
            <div className="font-display text-lg text-white leading-tight mb-1">ЖИРОСЖИГАНИЕ</div>
            <div className="text-xs text-white/50 font-body">12 недель · Начинающий</div>
            <button className="mt-2 btn-outline-neon text-xs py-1 px-3 rounded-lg">Подробнее</button>
          </div>
        </div>
      </div>

      {/* Weekly activity */}
      <div className="px-4 mb-6">
        <h2 className="font-display text-lg text-white mb-3">АКТИВНОСТЬ НЕДЕЛИ</h2>
        <div className="card-dark rounded-2xl p-4">
          <div className="flex items-end gap-2 h-24">
            {weekStats.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full relative rounded-sm overflow-hidden" style={{ height: '72px' }}>
                  <div className="absolute bottom-0 w-full rounded-sm transition-all" style={{ height: `${s.value}%`, background: s.value > 0 ? 'linear-gradient(180deg, #AAEF00, #66CC00)' : '#222' }} />
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
  );
}
