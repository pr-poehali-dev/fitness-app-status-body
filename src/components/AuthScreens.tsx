import { useState } from "react";
import Icon from "@/components/ui/icon";
import { User } from "@/components/data";

const TRAINER_IMG = "https://cdn.poehali.dev/projects/a6eebf6a-8a28-45e2-b14b-36ca711b8edd/bucket/800f0eb4-1043-40aa-a1a1-32b28006f503.png";

export function MacroBadge({ label, value, goal, color }: { label: string; value: number; goal: number; color: string }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div className="card-dark-2 rounded-xl p-3 flex-1">
      <div className={`font-display text-lg font-bold ${color}`}>{value}<span className="text-xs text-white/30 font-body ml-0.5">г</span></div>
      <div className="text-[10px] text-white/30 font-body">из {goal}г</div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1.5">
        <div className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[10px] text-white/50 font-body uppercase mt-1">{label}</div>
    </div>
  );
}

export function WelcomeScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden" style={{ background: '#0D0D0D' }}>

      {/* Фоновый неоновый блик */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(170,239,0,0.12) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(170,239,0,0.05) 0%, transparent 70%)' }} />

      {/* Верхняя часть: логотип + тренер */}
      <div className="relative flex-1 flex flex-col">

        {/* Логотип */}
        <div className="px-6 pt-14 z-10">
          <div className="font-display text-5xl text-white tracking-widest leading-none">
            STATUS <span className="text-neon">BODY</span>
          </div>
          <div className="text-xs text-white/35 font-body tracking-[0.25em] mt-2 leading-relaxed">
            ГОТОВЫЕ ПРОГРАММЫ ДЛЯ<br />ПОХУДЕНИЯ И ВОССТАНОВЛЕНИЯ
          </div>
        </div>

        {/* Тренер — PNG без фона, позиционирован справа */}
        <div className="relative flex-1 flex items-end justify-end">
          <img
            src={TRAINER_IMG}
            alt="Тренер"
            className="w-4/5 object-contain object-bottom drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 40px rgba(170,239,0,0.15))' }}
          />
          {/* Неоновая линия под тренером */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(170,239,0,0.4), transparent)' }} />
        </div>
      </div>

      {/* Нижняя часть: текст + кнопки */}
      <div className="px-6 pb-10 pt-6" style={{ background: 'linear-gradient(to top, #0D0D0D 80%, transparent)' }}>
        <h2 className="font-display text-3xl text-white leading-tight mb-1">
          РЕЗУЛЬТАТ<br /><span className="text-neon">НАЧИНАЕТСЯ</span><br />СЕГОДНЯ
        </h2>
        <p className="text-white/40 font-body text-sm mb-6">Программы под ваши цели</p>

        <div className="flex gap-3 mb-5">
          <button onClick={onRegister} className="btn-neon flex-1 py-4 rounded-2xl text-sm">
            НАЧАТЬ БЕСПЛАТНО
          </button>
          <button onClick={onLogin} className="btn-outline-neon py-4 px-5 rounded-2xl text-sm">
            ВОЙТИ
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-white/20 font-body">
          <span>10 000+ участников</span>
          <span>·</span>
          <span>Без рекламы</span>
          <span>·</span>
          <span>БЖУ контроль</span>
        </div>
      </div>
    </div>
  );
}

export function LoginScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) { setError("Заполните все поля"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: email.split("@")[0], email });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col max-w-md mx-auto px-6 pt-14 pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 font-body text-sm">
        <Icon name="ArrowLeft" size={16} />
        Назад
      </button>

      <div className="mb-8">
        <div className="font-display text-4xl text-white mb-1">ВХОД</div>
        <div className="text-white/40 font-body text-sm">В аккаунт STATUS BODY</div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs text-white/40 font-display tracking-wider mb-1.5 block">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            placeholder="you@example.com"
            className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-body placeholder:text-white/20 outline-none focus:border-neon/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-white/40 font-display tracking-wider mb-1.5 block">ПАРОЛЬ</label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            placeholder="••••••••"
            className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-body placeholder:text-white/20 outline-none focus:border-neon/50 transition-colors"
          />
        </div>
      </div>

      {error && <div className="text-red-400 text-xs font-body mb-4">{error}</div>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="btn-neon w-full py-4 rounded-2xl text-sm mb-4 disabled:opacity-50"
      >
        {loading ? "ВХОДИМ..." : "ВОЙТИ"}
      </button>

      <div className="text-center text-xs text-white/30 font-body">
        Забыли пароль?{" "}
        <span className="text-neon cursor-pointer">Восстановить</span>
      </div>

      <div className="mt-auto pt-8 text-center">
        <div className="h-px bg-white/08 mb-6" />
        <div className="flex items-center gap-2 justify-center">
          <div className="w-8 h-8 rounded-full bg-card-bg-2 border border-white/10 flex items-center justify-center">
            <span className="text-sm">G</span>
          </div>
          <span className="text-sm text-white/40 font-body">Войти через Google</span>
        </div>
      </div>
    </div>
  );
}

export function RegisterScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: (u: User) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "КАК ВАС\nЗОВУТ?",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/40 font-display tracking-wider mb-1.5 block">ИМЯ</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Алексей"
              autoFocus
              className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-body placeholder:text-white/20 outline-none focus:border-neon/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 font-display tracking-wider mb-1.5 block">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-body placeholder:text-white/20 outline-none focus:border-neon/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 font-display tracking-wider mb-1.5 block">ПАРОЛЬ</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-body placeholder:text-white/20 outline-none focus:border-neon/50 transition-colors"
            />
          </div>
        </div>
      ),
      canNext: name.length > 1 && email.includes("@") && password.length >= 6,
    },
    {
      title: "ВАША\nЦЕЛЬ?",
      content: (
        <div className="space-y-3">
          {[
            { label: "Снизить вес", icon: "TrendingDown", desc: "Убрать лишний жир" },
            { label: "Набрать массу", icon: "TrendingUp", desc: "Увеличить мышцы" },
            { label: "Улучшить рельеф", icon: "Zap", desc: "Чёткое тело" },
            { label: "Повысить выносливость", icon: "Wind", desc: "Больше энергии" },
          ].map(({ label, icon, desc }) => (
            <button
              key={label}
              onClick={() => setGoal(label)}
              className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all
                ${goal === label ? 'border-neon bg-neon/10' : 'border-white/10 bg-card-bg hover:border-neon/30'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${goal === label ? 'bg-neon' : 'bg-white/05'}`}>
                <Icon name={icon} size={16} className={goal === label ? 'text-dark-bg' : 'text-white/40'} />
              </div>
              <div>
                <div className={`font-display text-sm ${goal === label ? 'text-neon' : 'text-white'}`}>{label.toUpperCase()}</div>
                <div className="text-xs text-white/30 font-body">{desc}</div>
              </div>
              {goal === label && <Icon name="Check" size={16} className="text-neon ml-auto" />}
            </button>
          ))}
        </div>
      ),
      canNext: goal.length > 0,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) { setStep(step + 1); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name, email });
    }, 1000);
  };

  const current = steps[step];

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col max-w-md mx-auto px-6 pt-14 pb-10">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-body text-sm">
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'bg-neon w-8' : 'bg-white/20 w-4'}`} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="font-display text-4xl text-white leading-tight mb-1 whitespace-pre-line">{current.title}</div>
      </div>

      <div className="flex-1">{current.content}</div>

      <div className="pt-6">
        <button
          onClick={handleNext}
          disabled={!current.canNext || loading}
          className="btn-neon w-full py-4 rounded-2xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "СОЗДАЁМ АККАУНТ..." : step < steps.length - 1 ? "ДАЛЕЕ" : "СОЗДАТЬ АККАУНТ"}
        </button>
      </div>
    </div>
  );
}