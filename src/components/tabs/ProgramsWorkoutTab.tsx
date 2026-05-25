import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMG, paidCourses, weekWorkouts, DayWorkout } from "@/components/data";

// ── ПЛАТНЫЕ КУРСЫ (бывшие Программы) ──────────────────────
export function ProgramsTab() {
  const [quizStep, setQuizStep] = useState(0); // 0..4 — квиз, 5 — результат, -1 — детали курса
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [goal, setGoal] = useState("");
  const [injuries, setInjuries] = useState<string[]>([]);
  const [level, setLevel] = useState("");
  const [weeks, setWeeks] = useState(0);

  const toggleInjury = (v: string) => {
    setInjuries(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  };

  const goalsOptions = [
    { label: "Похудение", icon: "TrendingDown", desc: "Снизить вес и объёмы" },
    { label: "Рельеф", icon: "Zap", desc: "Подтянуть и укрепить тело" },
    { label: "Восстановление", icon: "Heart", desc: "Мягкое восстановление фигуры" },
  ];

  const injuryOptions = ["Колено", "Спина / позвоночник", "Шея", "Плечи", "Сердечно-сосудистые", "Нет ограничений"];
  const levelOptions = [
    { label: "Новичок", desc: "Никогда не занималась или давно" },
    { label: "Средний", desc: "Есть небольшой опыт, занималась ранее" },
    { label: "Продвинутый", desc: "Регулярно тренируюсь" },
  ];
  const weeksOptions = [4, 8, 12];

  // Подбор подходящих курсов
  const matchedCourses = paidCourses.filter(c => {
    const goalMatch = !goal || c.goal === goal;
    const levelMatch = !level || c.level === level || c.level === "Новичок";
    const weeksMatch = !weeks || c.weeks === weeks;
    return goalMatch && levelMatch && weeksMatch;
  });

  // Детали курса
  if (selectedCourse !== null) {
    const course = paidCourses.find(c => c.id === selectedCourse)!;
    return (
      <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
        <div className="relative h-56">
          <img src={HERO_IMG} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-dark-bg" />
          <button onClick={() => setSelectedCourse(null)} className="absolute top-5 left-4 card-dark rounded-full p-2">
            <Icon name="ArrowLeft" size={20} className="text-white" />
          </button>
        </div>
        <div className="px-4 -mt-6">
          <span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-full ${course.tagColor}`}>{course.tag}</span>
          <h1 className="font-display text-3xl text-white mt-2 mb-1">{course.title.toUpperCase()}</h1>
          <p className="text-white/50 font-body text-sm mb-5">{course.desc}</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[[`${course.weeks}`, "НЕДЕЛЬ"], [course.level, "УРОВЕНЬ"], ["Дома", "ФОРМАТ"]].map(([v, l]) => (
              <div key={l} className="card-dark-2 rounded-xl p-3 text-center">
                <div className="font-display text-lg text-neon leading-tight">{v}</div>
                <div className="text-[10px] text-white/40 font-body uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </div>

          {/* Подходит при */}
          <div className="card-dark rounded-2xl p-4 mb-5 border border-neon/10">
            <div className="text-xs text-neon font-display tracking-wider mb-3">ПОДХОДИТ ПРИ</div>
            <div className="space-y-2">
              {course.suitable.map(s => (
                <div key={s} className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-neon flex-shrink-0" />
                  <span className="text-sm text-white/70 font-body capitalize">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 mb-6 border border-neon/20" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2500 100%)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-white/40 font-body">Стоимость курса</div>
                <div className="font-display text-3xl text-neon">{course.weeks === 4 ? "1 990" : course.weeks === 8 ? "3 490" : "4 990"} ₽</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/30 font-body line-through">{course.weeks === 4 ? "2 990" : course.weeks === 8 ? "4 990" : "6 990"} ₽</div>
                <div className="text-xs text-neon font-body">Скидка 30%</div>
              </div>
            </div>
            <button className="btn-neon w-full py-4 rounded-xl text-sm">КУПИТЬ КУРС</button>
          </div>
        </div>
      </div>
    );
  }

  // Квиз
  if (quizStep < 5) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
        <div className="p-6 animate-fade-up">
          {/* Прогресс */}
          <div className="flex items-center gap-3 mb-8">
            {quizStep > 0 && (
              <button onClick={() => setQuizStep(q => q - 1)} className="card-dark rounded-full p-1.5">
                <Icon name="ArrowLeft" size={16} className="text-white/60" />
              </button>
            )}
            <div className="flex gap-1 flex-1">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`h-1 rounded-full transition-all ${i < quizStep ? 'bg-neon flex-1' : i === quizStep ? 'bg-neon/60 flex-1' : 'bg-white/15 flex-1'}`} />
              ))}
            </div>
            <span className="text-xs text-white/40 font-body">{quizStep + 1} / 4</span>
          </div>

          {/* Шаг 1 — Цель */}
          {quizStep === 0 && (
            <div>
              <h2 className="font-display text-3xl mb-1 text-white">ВАША<br /><span className="text-neon">ЦЕЛЬ</span></h2>
              <p className="text-white/40 font-body text-sm mb-6">Под какой результат подбираем курс?</p>
              <div className="space-y-3">
                {goalsOptions.map(({ label, icon, desc }) => (
                  <button key={label} onClick={() => { setGoal(label); setQuizStep(1); }}
                    className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all
                      ${goal === label ? 'border-neon bg-neon/10' : 'border-white/10 bg-card-bg hover:border-neon/30'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${goal === label ? 'bg-neon' : 'bg-white/05'}`}>
                      <Icon name={icon} size={20} className={goal === label ? 'text-dark-bg' : 'text-white/40'} />
                    </div>
                    <div>
                      <div className={`font-display text-base ${goal === label ? 'text-neon' : 'text-white'}`}>{label.toUpperCase()}</div>
                      <div className="text-xs text-white/30 font-body">{desc}</div>
                    </div>
                    {goal === label && <Icon name="Check" size={16} className="text-neon ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 2 — Травмы */}
          {quizStep === 1 && (
            <div>
              <h2 className="font-display text-3xl mb-1 text-white">ТРАВМЫ И<br /><span className="text-neon">ОГРАНИЧЕНИЯ</span></h2>
              <p className="text-white/40 font-body text-sm mb-6">Выберите всё, что есть. Мы исключим опасные упражнения.</p>
              <div className="space-y-3 mb-6">
                {injuryOptions.map(inj => {
                  const active = injuries.includes(inj);
                  return (
                    <button key={inj} onClick={() => toggleInjury(inj)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all
                        ${active ? 'border-neon bg-neon/10' : 'border-white/10 bg-card-bg hover:border-neon/30'}`}>
                      <span className={`font-display text-sm tracking-wide ${active ? 'text-neon' : 'text-white'}`}>{inj.toUpperCase()}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${active ? 'bg-neon border-neon' : 'border-white/20'}`}>
                        {active && <Icon name="Check" size={11} className="text-dark-bg" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setQuizStep(2)} disabled={injuries.length === 0}
                className="btn-neon w-full py-4 rounded-xl text-sm disabled:opacity-40">ДАЛЕЕ</button>
            </div>
          )}

          {/* Шаг 3 — Уровень */}
          {quizStep === 2 && (
            <div>
              <h2 className="font-display text-3xl mb-1 text-white">УРОВЕНЬ<br /><span className="text-neon">ПОДГОТОВКИ</span></h2>
              <p className="text-white/40 font-body text-sm mb-6">Честно оцените себя — это важно для правильной нагрузки.</p>
              <div className="space-y-3">
                {levelOptions.map(({ label, desc }) => (
                  <button key={label} onClick={() => { setLevel(label); setQuizStep(3); }}
                    className={`w-full p-4 rounded-xl border text-left transition-all
                      ${level === label ? 'border-neon bg-neon/10' : 'border-white/10 bg-card-bg hover:border-neon/40'}`}>
                    <div className={`font-display text-base ${level === label ? 'text-neon' : 'text-white'}`}>{label.toUpperCase()}</div>
                    <div className="text-xs text-white/40 font-body mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 4 — Длительность */}
          {quizStep === 3 && (
            <div>
              <h2 className="font-display text-3xl mb-1 text-white">ДЛИТЕЛЬНОСТЬ<br /><span className="text-neon">КУРСА</span></h2>
              <p className="text-white/40 font-body text-sm mb-6">На какой срок готовы взять обязательство?</p>
              <div className="space-y-3 mb-6">
                {weeksOptions.map(w => (
                  <button key={w} onClick={() => setWeeks(w)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all
                      ${weeks === w ? 'border-neon bg-neon/10' : 'border-white/10 bg-card-bg hover:border-neon/40'}`}>
                    <div>
                      <div className={`font-display text-base ${weeks === w ? 'text-neon' : 'text-white'}`}>{w} НЕДЕЛЬ</div>
                      <div className="text-xs text-white/40 font-body">{w === 4 ? "Быстрый старт" : w === 8 ? "Оптимальный результат" : "Трансформация"}</div>
                    </div>
                    {weeks === w && <Icon name="Check" size={16} className="text-neon" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setQuizStep(5)} disabled={weeks === 0}
                className="btn-neon w-full py-4 rounded-xl text-sm disabled:opacity-40">ПОДОБРАТЬ КУРС</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Результаты подбора
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
      <div className="px-4 pt-6 pb-4">
        <div className="text-xs text-neon font-display tracking-widest mb-1">ПОДОБРАНО ДЛЯ ВАС</div>
        <h2 className="font-display text-3xl text-white">КУРСЫ</h2>
        <button onClick={() => { setQuizStep(0); setGoal(""); setInjuries([]); setLevel(""); setWeeks(0); }}
          className="mt-2 text-xs text-white/30 font-body flex items-center gap-1 hover:text-white/60 transition-colors">
          <Icon name="RefreshCw" size={12} />
          Пройти подбор заново
        </button>
      </div>

      {/* Выбранные параметры */}
      <div className="px-4 mb-4 flex gap-2 flex-wrap">
        {goal && <span className="text-[11px] font-body bg-neon/10 border border-neon/20 text-neon px-2 py-1 rounded-full">{goal}</span>}
        {level && <span className="text-[11px] font-body bg-white/05 border border-white/10 text-white/50 px-2 py-1 rounded-full">{level}</span>}
        {weeks > 0 && <span className="text-[11px] font-body bg-white/05 border border-white/10 text-white/50 px-2 py-1 rounded-full">{weeks} нед.</span>}
        {injuries.map(inj => <span key={inj} className="text-[11px] font-body bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-1 rounded-full">{inj}</span>)}
      </div>

      <div className="px-4 space-y-4 pb-4">
        {(matchedCourses.length > 0 ? matchedCourses : paidCourses).map(course => (
          <div key={course.id} className="card-dark rounded-2xl overflow-hidden cursor-pointer hover:border-neon/30 transition-all border border-white/06"
            onClick={() => setSelectedCourse(course.id)}>
            <div className="relative h-36">
              <img src={HERO_IMG} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-display font-bold px-2 py-0.5 rounded-full ${course.tagColor}`}>{course.tag}</span>
              </div>
              <div className="absolute bottom-3 left-3">
                <div className="font-display text-xl text-white">{course.title.toUpperCase()}</div>
                <div className="text-xs text-white/60 font-body">{course.subtitle}</div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/60 font-body mb-3">{course.desc}</p>
              {injuries.length > 0 && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Icon name="Shield" size={13} className="text-neon" />
                  <span className="text-xs text-neon font-body">Безопасен при ваших ограничениях</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 font-body border border-white/10 rounded-full px-2 py-0.5">{course.level}</span>
                <button className="btn-neon text-xs py-1.5 px-4 rounded-lg">Купить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ТРЕНИРОВКИ (бесплатно) ─────────────────────────────────
interface WorkoutTabProps {
  selectedWorkout: number | null;
  onSelectWorkout: (id: number) => void;
  onBackFromWorkout: () => void;
}

export function WorkoutTab({ selectedWorkout, onSelectWorkout, onBackFromWorkout }: WorkoutTabProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);

  const activeDay = selectedWorkout !== null ? weekWorkouts.find((_, i) => i === selectedWorkout) : null;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24">
      {/* Список дней */}
      {selectedWorkout === null && (
        <div className="animate-fade-up">
          <div className="px-4 pt-6 pb-4">
            <div className="text-xs text-neon font-display tracking-widest mb-1">БЕСПЛАТНО · НЕДЕЛЯ</div>
            <h2 className="font-display text-3xl text-white">ТРЕНИРОВКИ</h2>
          </div>
          <div className="px-4 space-y-3">
            {weekWorkouts.map((w, i) => (
              <div key={i}
                className={`rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all
                  ${w.done ? 'bg-neon/5 border border-neon/20' : w.challenge && w.type === 'отдых' ? 'card-dark border border-orange-500/20 hover:border-orange-500/40' : w.type === 'отдых' ? 'bg-white/02 border border-white/04 opacity-40' : 'card-dark border border-white/06 hover:border-neon/20'}`}
                onClick={() => onSelectWorkout(i)}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display text-lg flex-shrink-0
                  ${w.done ? 'bg-neon text-dark-bg' : w.challenge && w.type === 'отдых' ? 'bg-orange-500/10' : 'bg-white/05'}`}>
                  {w.done ? '✅' : w.type === 'зарядка' ? '☀️' : w.type === 'тренировка' ? '💪' : w.challenge ? '⚡' : '😴'}
                </div>
                <div className="flex-1">
                  <div className="font-display text-sm text-white">{w.day} — {w.label.toUpperCase()}</div>
                  <div className="text-xs text-white/40 font-body mt-0.5 capitalize">
                    {w.type === 'отдых' && w.challenge ? `Задание дня · ${w.challenge.reps}` : w.type === 'отдых' ? 'День отдыха' : `${w.type} · ${w.duration} · ${w.exercises.length} упр.`}
                  </div>
                </div>
                {w.done
                  ? <span className="text-xs text-neon font-body">Готово</span>
                  : <Icon name="ChevronRight" size={16} className="text-white/30" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Конкретный день */}
      {selectedWorkout !== null && activeDay && selectedExercise === null && (
        <div className="animate-fade-up">
          <div className="px-4 pt-6 pb-4 flex items-center gap-3">
            <button onClick={onBackFromWorkout} className="card-dark rounded-full p-2">
              <Icon name="ArrowLeft" size={18} className="text-white" />
            </button>
            <div>
              <div className="text-xs text-neon font-display tracking-wider">
                {activeDay.type === 'зарядка' ? '☀️ ЗАРЯДКА' : activeDay.type === 'тренировка' ? '💪 ТРЕНИРОВКА' : '⚡ ЗАДАНИЕ ДНЯ'} · {activeDay.duration !== '—' ? activeDay.duration : ''}
              </div>
              <h2 className="font-display text-xl text-white">{activeDay.label.toUpperCase()}</h2>
            </div>
          </div>

          {/* VK Видео */}
          {activeDay.videoUrl && (
            <div className="mx-4 mb-4 rounded-2xl overflow-hidden border border-neon/20" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={activeDay.videoUrl}
                className="w-full h-full"
                allow="encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Задание дня (для дней отдыха) */}
          {activeDay.challenge && (
            <div className="mx-4 mb-4 rounded-2xl p-5 border border-orange-500/30" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a1000 100%)' }}>
              <div className="text-xs text-orange-400 font-display tracking-widest mb-1">⚡ {activeDay.challenge.title.toUpperCase()}</div>
              <div className="font-display text-2xl text-white mb-2">{activeDay.challenge.reps}</div>
              <p className="text-white/50 font-body text-sm leading-relaxed">{activeDay.challenge.desc}</p>
              {activeDay.type === 'отдых' && (
                <button className="mt-4 w-full py-3 rounded-xl text-sm font-display tracking-wide border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 transition-all">
                  ВЫПОЛНЕНО ✓
                </button>
              )}
            </div>
          )}

          {/* Упражнения */}
          {activeDay.exercises.length > 0 && (
            <div className="px-4 space-y-3">
              {activeDay.exercises.map((ex, i) => (
                <div key={i} className="card-dark rounded-2xl overflow-hidden border border-white/06 cursor-pointer hover:border-neon/20 transition-all"
                  onClick={() => setSelectedExercise(i)}>
                  <img src={ex.img} alt={ex.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <div className="font-display text-base text-white mb-0.5">{ex.name.toUpperCase()}</div>
                    <div className="text-xs text-neon font-body">{ex.reps}</div>
                    <div className="text-xs text-white/40 font-body mt-1 line-clamp-2">{ex.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeDay.type !== 'отдых' && (
            <div className="px-4 mt-5 mb-4">
              <button className="btn-neon w-full py-4 rounded-xl text-sm">ТРЕНИРОВКА ЗАВЕРШЕНА ✓</button>
            </div>
          )}
        </div>
      )}

      {/* Детали упражнения */}
      {selectedWorkout !== null && activeDay && selectedExercise !== null && (
        <div className="animate-fade-up">
          <div className="relative h-56">
            <img src={activeDay.exercises[selectedExercise].img} alt={activeDay.exercises[selectedExercise].name}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-dark-bg" />
            <button onClick={() => setSelectedExercise(null)} className="absolute top-5 left-4 card-dark rounded-full p-2">
              <Icon name="ArrowLeft" size={18} className="text-white" />
            </button>
          </div>
          <div className="px-4 -mt-4">
            <div className="card-dark rounded-2xl p-5 border border-neon/10">
              <div className="text-xs text-neon font-display tracking-widest mb-1">УПРАЖНЕНИЕ {selectedExercise + 1} из {activeDay.exercises.length}</div>
              <h2 className="font-display text-2xl text-white mb-1">{activeDay.exercises[selectedExercise].name.toUpperCase()}</h2>
              <div className="text-neon font-display text-base mb-4">{activeDay.exercises[selectedExercise].reps}</div>
              <p className="text-white/60 font-body text-sm leading-relaxed">{activeDay.exercises[selectedExercise].desc}</p>
            </div>

            <div className="flex gap-3 mt-4 mb-4">
              {selectedExercise > 0 && (
                <button onClick={() => setSelectedExercise(i => i! - 1)}
                  className="btn-outline-neon flex-1 py-3 rounded-xl text-sm">← НАЗАД</button>
              )}
              {selectedExercise < activeDay.exercises.length - 1 ? (
                <button onClick={() => setSelectedExercise(i => i! + 1)}
                  className="btn-neon flex-1 py-3 rounded-xl text-sm">ДАЛЕЕ →</button>
              ) : (
                <button onClick={() => setSelectedExercise(null)}
                  className="btn-neon flex-1 py-3 rounded-xl text-sm">ГОТОВО ✓</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}