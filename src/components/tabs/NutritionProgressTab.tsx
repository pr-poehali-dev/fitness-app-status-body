import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MacroBadge } from "@/components/AuthScreens";
import { PROGRESS_IMG, BJU_GOAL, productDatabase, readyMenus, Product, weekStats } from "@/components/data";

// ── ПИТАНИЕ ────────────────────────────────────────────────
export function NutritionTab() {
  const [activeSection, setActiveSection] = useState<"constructor" | "ready" | "swaps">("constructor");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [myProducts, setMyProducts] = useState<(Product & { qty: number })[]>([
    { ...productDatabase[0], qty: 150 },
    { ...productDatabase[1], qty: 2 },
    { ...productDatabase[6], qty: 100 },
  ]);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const categories = ["Все", "Белки", "Углеводы", "Фрукты", "Овощи", "Жиры"];
  const filtered = productDatabase.filter(p =>
    (selectedCategory === "Все" || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProtein = myProducts.reduce((s, p) => s + Math.round(p.protein * p.qty / 100), 0);
  const totalFat = myProducts.reduce((s, p) => s + Math.round(p.fat * p.qty / 100), 0);
  const totalCarbs = myProducts.reduce((s, p) => s + Math.round(p.carbs * p.qty / 100), 0);

  const addProduct = (p: Product) => {
    if (myProducts.find(x => x.id === p.id)) return;
    setMyProducts(prev => [...prev, { ...p, qty: 100 }]);
  };

  const removeProduct = (id: number) => setMyProducts(prev => prev.filter(x => x.id !== id));

  const menu = readyMenus[selectedMenu];

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
      <div className="px-4 pt-6 pb-3">
        <div className="text-xs text-neon font-display tracking-widest mb-1">БЕСПЛАТНО</div>
        <h2 className="font-display text-3xl text-white">ПИТАНИЕ</h2>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4 flex gap-2">
        {([["constructor", "Рацион"], ["ready", "Меню"], ["swaps", "Замены"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setActiveSection(key)}
            className={`flex-1 py-2 rounded-xl text-xs font-display tracking-wider border transition-all
              ${activeSection === key ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 text-white/40 hover:border-white/30'}`}>
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── КОНСТРУКТОР ── */}
      {activeSection === "constructor" && (
        <div>
          <div className="px-4 mb-4">
            <div className="card-dark rounded-2xl p-4">
              <div className="text-xs text-white/40 font-display tracking-widest mb-3">МОЙ РАЦИОН — БЖУ</div>
              <div className="flex gap-2">
                <MacroBadge label="Белки" value={totalProtein} goal={BJU_GOAL.protein} color="text-blue-400" />
                <MacroBadge label="Жиры" value={totalFat} goal={BJU_GOAL.fat} color="text-yellow-400" />
                <MacroBadge label="Углеводы" value={totalCarbs} goal={BJU_GOAL.carbs} color="text-orange-400" />
              </div>
            </div>
          </div>

          {myProducts.length > 0 && (
            <div className="px-4 mb-4">
              <div className="text-xs text-white/40 font-display tracking-widest mb-2">МОИ ПРОДУКТЫ</div>
              <div className="space-y-2">
                {myProducts.map(p => (
                  <div key={p.id} className="card-dark rounded-xl px-4 py-3 flex items-center gap-3 border border-white/06">
                    <div className="flex-1">
                      <div className="font-body text-sm text-white">{p.name}</div>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-[11px] text-blue-400">Б {Math.round(p.protein * p.qty / 100)}г</span>
                        <span className="text-[11px] text-yellow-400">Ж {Math.round(p.fat * p.qty / 100)}г</span>
                        <span className="text-[11px] text-orange-400">У {Math.round(p.carbs * p.qty / 100)}г</span>
                        <span className="text-[11px] text-white/30">{p.qty}{p.unit.includes("шт") ? " шт" : "г"}</span>
                      </div>
                    </div>
                    <button onClick={() => removeProduct(p.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 mb-3">
            <div className="text-xs text-white/40 font-display tracking-widest mb-2">ДОБАВИТЬ ПРОДУКТ</div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск продукта..."
              className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-body placeholder:text-white/25 outline-none focus:border-neon/40 mb-3"
            />
            <div className="flex gap-2 overflow-x-auto scrollbar-hidden pb-1">
              {categories.map(c => (
                <button key={c} onClick={() => setSelectedCategory(c)}
                  className={`text-[11px] font-display tracking-wider py-1 px-3 rounded-full border flex-shrink-0 transition-all
                    ${selectedCategory === c ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 text-white/40'}`}>
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 space-y-2">
            {filtered.map(p => (
              <div key={p.id} className="card-dark rounded-xl px-4 py-3 flex items-center gap-3 border border-white/06">
                <div className="flex-1">
                  <div className="font-body text-sm text-white">{p.name} <span className="text-white/30 text-xs">/ {p.unit}</span></div>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-[11px] text-blue-400">Б {p.protein}г</span>
                    <span className="text-[11px] text-yellow-400">Ж {p.fat}г</span>
                    <span className="text-[11px] text-orange-400">У {p.carbs}г</span>
                  </div>
                </div>
                <button onClick={() => addProduct(p)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all flex-shrink-0
                    ${myProducts.find(x => x.id === p.id) ? 'bg-neon/20 border-neon/30' : 'border-white/20 hover:border-neon/40'}`}>
                  {myProducts.find(x => x.id === p.id)
                    ? <Icon name="Check" size={13} className="text-neon" />
                    : <Icon name="Plus" size={13} className="text-white/50" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ГОТОВЫЕ МЕНЮ ── */}
      {activeSection === "ready" && (
        <div className="px-4">
          <div className="flex gap-2 mb-4">
            {readyMenus.map((m, i) => (
              <button key={m.id} onClick={() => setSelectedMenu(i)}
                className={`flex-1 py-2 rounded-xl text-[11px] font-display border transition-all leading-tight px-2
                  ${selectedMenu === i ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                {m.title.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="card-dark rounded-2xl overflow-hidden border border-neon/10">
            <div className="px-4 py-3 border-b border-white/06">
              <div className="text-xs text-neon font-display tracking-wider">{menu.goal.toUpperCase()}</div>
              <div className="font-display text-lg text-white">{menu.title}</div>
            </div>
            {menu.days.map((d, i) => (
              <div key={d.day} className={`px-4 py-3 ${i > 0 ? 'border-t border-white/06' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-display text-neon">{d.day}</span>
                  </div>
                  <div>
                    {d.meals.map((meal, j) => (
                      <div key={j} className="text-xs text-white/60 font-body leading-relaxed">
                        {j === 0 ? "🌅 " : j === 1 ? "🍎 " : j === 2 ? "🍽️ " : "🌙 "}{meal}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ЗАМЕНЫ ПРОДУКТОВ ── */}
      {activeSection === "swaps" && (
        <div className="px-4 space-y-4">
          {[
            {
              meal: "🌅 Завтрак",
              desc: "Выбери один вариант",
              options: [
                { name: "Овсянка + 2 яйца", bju: "Б 20 / Ж 14 / У 52" },
                { name: "Гречка + творог 150г", bju: "Б 22 / Ж 6 / У 24" },
                { name: "Омлет 3 яйца + овощи", bju: "Б 19 / Ж 16 / У 6" },
                { name: "Рисовая каша + яйцо", bju: "Б 10 / Ж 6 / У 38" },
                { name: "Творог 200г + банан", bju: "Б 24 / Ж 6 / У 32" },
              ],
            },
            {
              meal: "🍎 Перекус",
              desc: "Лёгкий вариант между приёмами пищи",
              options: [
                { name: "Яблоко + миндаль 30г", bju: "Б 4 / Ж 14 / У 20" },
                { name: "Творог 100г", bju: "Б 17 / Ж 5 / У 2" },
                { name: "Банан + кефир", bju: "Б 7 / Ж 3 / У 32" },
                { name: "Яйца варёные 2шт", bju: "Б 12 / Ж 10 / У 0" },
                { name: "Огурцы + хумус", bju: "Б 5 / Ж 8 / У 8" },
              ],
            },
            {
              meal: "🍽️ Обед",
              desc: "Полноценный приём пищи",
              options: [
                { name: "Куриная грудка + рис + овощи", bju: "Б 42 / Ж 6 / У 45" },
                { name: "Лосось + гречка + салат", bju: "Б 38 / Ж 18 / У 24" },
                { name: "Тунец + макароны из тв.сортов", bju: "Б 35 / Ж 4 / У 48" },
                { name: "Индейка + картофель + брокколи", bju: "Б 38 / Ж 5 / У 38" },
                { name: "Яйца 3шт + гречка + огурец", bju: "Б 26 / Ж 16 / У 26" },
              ],
            },
            {
              meal: "🌙 Ужин",
              desc: "Лёгкий, не позднее 3 часов до сна",
              options: [
                { name: "Лосось + брокколи на пару", bju: "Б 28 / Ж 14 / У 6" },
                { name: "Куриная грудка + овощи", bju: "Б 34 / Ж 4 / У 10" },
                { name: "Творог 200г + огурец", bju: "Б 26 / Ж 6 / У 6" },
                { name: "Тунец + листовой салат", bju: "Б 28 / Ж 2 / У 4" },
                { name: "Омлет 2 яйца + авокадо", bju: "Б 14 / Ж 20 / У 5" },
              ],
            },
          ].map(({ meal, desc, options }) => (
            <MealSwapBlock key={meal} meal={meal} desc={desc} options={options} />
          ))}
        </div>
      )}
    </div>
  );
}

function MealSwapBlock({ meal, desc, options }: { meal: string; desc: string; options: { name: string; bju: string }[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="card-dark rounded-2xl overflow-hidden border border-white/06">
      <div className="px-4 py-3 border-b border-white/06">
        <div className="font-display text-base text-white">{meal}</div>
        <div className="text-xs text-white/40 font-body mt-0.5">{desc}</div>
      </div>
      <div className="divide-y divide-white/05">
        {options.map((opt, i) => (
          <button key={i} onClick={() => setSelected(selected === i ? null : i)}
            className={`w-full px-4 py-3 flex items-center justify-between text-left transition-all
              ${selected === i ? 'bg-neon/08' : 'hover:bg-white/03'}`}>
            <div>
              <div className={`font-body text-sm ${selected === i ? 'text-neon' : 'text-white'}`}>{opt.name}</div>
              <div className="text-[11px] text-white/35 font-body mt-0.5">{opt.bju}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all
              ${selected === i ? 'bg-neon border-neon' : 'border-white/20'}`}>
              {selected === i && <Icon name="Check" size={11} className="text-dark-bg" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ПРОГРЕСС ───────────────────────────────────────────────
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
          { label: "Текущий вес", value: "68.4 кг", delta: "−1.6 кг", icon: "TrendingDown" },
          { label: "Объём талии", value: "72 см", delta: "−3 см", icon: "TrendingDown" },
          { label: "Тренировок", value: "12", delta: "+4 за неделю", icon: "TrendingUp" },
          { label: "Недель в курсе", value: "3", delta: "из 8", icon: "Calendar" },
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
        <h3 className="font-display text-base text-white mb-3">АКТИВНОСТЬ НЕДЕЛИ</h3>
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
            <span>3 из 5 тренировок</span>
            <span className="text-neon">Отличная неделя!</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-5">
        <h3 className="font-display text-base text-white mb-3">СРЕДНЕЕ БЖУ ЗА НЕДЕЛЮ</h3>
        <div className="card-dark rounded-2xl p-4 space-y-4">
          {[
            { label: "Белки", value: 108, goal: BJU_GOAL.protein, color: "bg-blue-400" },
            { label: "Жиры", value: 52, goal: BJU_GOAL.fat, color: "bg-yellow-400" },
            { label: "Углеводы", value: 165, goal: BJU_GOAL.carbs, color: "bg-orange-400" },
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
            { icon: "🔥", title: "5 дней подряд", desc: "Не пропустила неделю" },
            { icon: "💪", title: "Первый курс", desc: "Начала заниматься" },
            { icon: "🥗", title: "Норма БЖУ", desc: "3 дня подряд" },
            { icon: "⚡", title: "Зарядка каждый день", desc: "Пн, Чт выполнены" },
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