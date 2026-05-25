import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMG, programs, workouts, exercises } from "@/components/data";

interface ProgramsTabProps {
  onGoToWorkout: (id: number) => void;
}

export function ProgramsTab({ onGoToWorkout }: ProgramsTabProps) {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [goalStep, setGoalStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
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
                    {["Снизить вес", "Набрать мышечную массу", "Улучшить рельеф", "Повысить выносливость"].map(g => (
                      <button key={g} onClick={() => { setSelectedGoal(g); setGoalStep(1); }}
                        className={`w-full p-4 rounded-xl border text-left font-display text-base tracking-wide transition-all
                          ${selectedGoal === g ? 'border-neon bg-neon/10 text-neon' : 'border-white/10 bg-card-bg text-white hover:border-neon/40'}`}>
                        {g.toUpperCase()}
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
                    {[{ label: "Начинающий", desc: "До 6 месяцев опыта" }, { label: "Средний", desc: "6–24 месяца опыта" }, { label: "Продвинутый", desc: "Более 2 лет опыта" }].map(({ label, desc }) => (
                      <button key={label} onClick={() => setGoalStep(2)}
                        className="w-full p-4 rounded-xl border border-white/10 bg-card-bg text-left hover:border-neon/40 transition-all">
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
                      <button key={pref} className="w-full p-4 rounded-xl border border-white/10 bg-card-bg text-left hover:border-neon/40 transition-all font-display text-base text-white">
                        {pref.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setGoalStep(3)} className="btn-neon w-full py-4 rounded-xl mt-6 text-sm">ПОДОБРАТЬ ПРОГРАММЫ</button>
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
                  <div key={p.id} className="card-dark rounded-2xl overflow-hidden cursor-pointer hover:border-neon/30 transition-all border border-white/06" onClick={() => setSelectedProgram(p.id)}>
                    <div className="relative h-40">
                      <img src={HERO_IMG} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-3 left-3"><span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-full ${p.tagColor}`}>{p.tag}</span></div>
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
              {[["12", "НЕДЕЛЬ"], ["4-5", "ДНЕЙ/НЕД"], ["55", "МИН/ТР."]].map(([v, l]) => (
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
  );
}

interface WorkoutTabProps {
  selectedWorkout: number | null;
  onSelectWorkout: (id: number) => void;
  onBackFromWorkout: () => void;
}

export function WorkoutTab({ selectedWorkout, onSelectWorkout, onBackFromWorkout }: WorkoutTabProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
      {selectedWorkout === null ? (
        <div className="animate-fade-up">
          <div className="px-4 pt-6 pb-4">
            <div className="text-xs text-neon font-display tracking-widest mb-1">НЕДЕЛЯ 3</div>
            <h2 className="font-display text-3xl text-white">ТРЕНИРОВКИ</h2>
          </div>
          <div className="px-4 space-y-3">
            {workouts.map((w) => (
              <div key={w.id}
                className={`rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all
                  ${w.done ? 'bg-neon/5 border border-neon/20' : 'card-dark border border-white/06 hover:border-neon/20'}`}
                onClick={() => onSelectWorkout(w.id)}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display text-sm font-bold flex-shrink-0
                  ${w.done ? 'bg-neon text-dark-bg' : 'bg-white/5 text-white/40'}`}>
                  {w.done ? <Icon name="Check" size={20} /> : w.day}
                </div>
                <div className="flex-1">
                  <div className="font-display text-base text-white">{w.title.toUpperCase()}</div>
                  <div className="text-xs text-white/40 font-body mt-0.5">{w.exercises} упр. · {w.duration}</div>
                </div>
                {w.done ? <span className="text-xs text-neon font-body">Выполнено</span> : <Icon name="ChevronRight" size={16} className="text-white/30" />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-up">
          <div className="px-4 pt-6 pb-4 flex items-center gap-3">
            <button onClick={onBackFromWorkout} className="card-dark rounded-full p-2">
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
              <div key={i} className={`rounded-xl p-4 flex items-center gap-3 transition-all ${ex.done ? 'bg-neon/5 border border-neon/20' : 'card-dark border border-white/06'}`}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${ex.done ? 'bg-neon border-neon' : 'border-white/20'}`}>
                  {ex.done && <Icon name="Check" size={12} className="text-dark-bg" />}
                </div>
                <div className="flex-1">
                  <div className={`font-body text-sm font-medium ${ex.done ? 'text-white/50 line-through' : 'text-white'}`}>{ex.name}</div>
                  <div className="text-xs text-white/30 font-body">{ex.sets} · {ex.weight}</div>
                </div>
                {!ex.done && <button className="text-xs text-neon font-body border border-neon/30 rounded-lg px-3 py-1">Начать</button>}
              </div>
            ))}
          </div>
          <div className="px-4 mt-5 mb-4">
            <button className="btn-neon w-full py-4 rounded-xl text-sm">ЗАВЕРШИТЬ ТРЕНИРОВКУ</button>
          </div>
        </div>
      )}
    </div>
  );
}
