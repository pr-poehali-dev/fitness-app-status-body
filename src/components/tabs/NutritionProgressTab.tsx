import Icon from "@/components/ui/icon";
import { MacroBadge } from "@/components/AuthScreens";
import { FOOD_IMG, PROGRESS_IMG, meals, BJU_GOAL } from "@/components/data";

export function NutritionTab() {
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
      <div className="px-4 pt-6 pb-4">
        <div className="text-xs text-neon font-display tracking-widest mb-1">СЕГОДНЯ</div>
        <h2 className="font-display text-3xl text-white">ПИТАНИЕ</h2>
      </div>

      <div className="mx-4 mb-5 rounded-2xl overflow-hidden">
        <img src={FOOD_IMG} alt="Nutrition" className="w-full h-36 object-cover" />
      </div>

      {/* БЖУ сводка */}
      <div className="px-4 mb-5">
        <div className="card-dark rounded-2xl p-4">
          <div className="text-xs text-white/40 font-display tracking-widest mb-3">ИТОГО БЖУ ЗА ДЕНЬ</div>
          <div className="flex gap-2">
            <MacroBadge label="Белки" value={totalProtein} goal={BJU_GOAL.protein} color="text-blue-400" />
            <MacroBadge label="Жиры" value={totalFat} goal={BJU_GOAL.fat} color="text-yellow-400" />
            <MacroBadge label="Углеводы" value={totalCarbs} goal={BJU_GOAL.carbs} color="text-orange-400" />
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="px-4 space-y-3">
        {meals.map((m, i) => (
          <div key={i} className="card-dark rounded-xl overflow-hidden border border-white/06">
            <div className="flex items-center justify-between p-3 pb-2">
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/30 font-body w-10">{m.time}</div>
                <div>
                  <div className="font-display text-sm text-white">{m.title.toUpperCase()}</div>
                  <div className="text-xs text-white/40 font-body">{m.items.join(", ")}</div>
                </div>
              </div>
            </div>
            {/* БЖУ строчка */}
            <div className="flex gap-3 px-3 pb-3 pt-1">
              <span className="text-[11px] font-body text-blue-400">Б {m.protein}г</span>
              <span className="text-[11px] font-body text-yellow-400">Ж {m.fat}г</span>
              <span className="text-[11px] font-body text-orange-400">У {m.carbs}г</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-4">
        <button className="btn-outline-neon w-full py-3 rounded-xl text-sm">+ ДОБАВИТЬ ПРИЁМ ПИЩИ</button>
      </div>
    </div>
  );
}

export function ProgressTab() {
  return (
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

      {/* БЖУ недели */}
      <div className="px-4 mb-5">
        <h3 className="font-display text-base text-white mb-3">СРЕДНЕЕ БЖУ ЗА НЕДЕЛЮ</h3>
        <div className="card-dark rounded-2xl p-4 space-y-4">
          {[
            { label: "Белки", value: 182, goal: BJU_GOAL.protein, color: "bg-blue-400" },
            { label: "Жиры", value: 68, goal: BJU_GOAL.fat, color: "bg-yellow-400" },
            { label: "Углеводы", value: 205, goal: BJU_GOAL.carbs, color: "bg-orange-400" },
          ].map(({ label, value, goal, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs font-body mb-1.5">
                <span className="text-white/60">{label}</span>
                <span className="text-white/80">{value}г <span className="text-white/30">/ {goal}г</span></span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.round((value / goal) * 100))}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-5">
        <h3 className="font-display text-base text-white mb-3">ДОСТИЖЕНИЯ</h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hidden pb-1">
          {[
            { icon: "🔥", title: "7-дневный стрик", desc: "Не пропустил неделю" },
            { icon: "💪", title: "Силовой рост", desc: "+10 кг в жиме" },
            { icon: "⚡", title: "HIIT мастер", desc: "10 кардио сессий" },
            { icon: "🥗", title: "Норма БЖУ", desc: "5 дней подряд" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="card-dark-2 rounded-xl p-3 min-w-32 flex-shrink-0 text-center border border-neon/10">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-display text-[10px] text-neon leading-tight">{title.toUpperCase()}</div>
              <div className="text-[10px] text-white/30 font-body mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
