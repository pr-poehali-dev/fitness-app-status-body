import Icon from "@/components/ui/icon";
import { Tab, User, navItems, chatMessages, BJU_GOAL } from "@/components/data";

interface ChatTabProps {
  chatInput: string;
  onChatInputChange: (v: string) => void;
}

export function ChatTab({ chatInput, onChatInputChange }: ChatTabProps) {
  return (
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
            onChange={e => onChatInputChange(e.target.value)}
            placeholder="Написать сообщение..."
            className="flex-1 bg-card-bg-2 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-body placeholder:text-white/25 outline-none focus:border-neon/40"
          />
          <button className="btn-neon rounded-xl p-2.5">
            <Icon name="Send" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProfileTabProps {
  user: User;
  onLogout: () => void;
}

export function ProfileTab({ user, onLogout }: ProfileTabProps) {
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden pb-24 animate-fade-up">
      <div className="relative h-44">
        <div className="absolute inset-0 diagonal-stripe" style={{ background: 'linear-gradient(135deg, #141414 0%, #1a2200 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <div className="w-20 h-20 rounded-full bg-neon flex items-center justify-center font-display text-3xl text-dark-bg mb-2">{initials}</div>
          <div className="font-display text-xl text-white">{user.name.toUpperCase()}</div>
          <div className="text-xs text-white/40 font-body mt-0.5">{user.email}</div>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            <span className="text-xs text-neon font-body">Стрик 7 дней 🔥</span>
          </div>
        </div>
      </div>

      {/* БЖУ цели */}
      <div className="px-4 mb-5 mt-5">
        <div className="card-dark rounded-2xl p-4 border border-neon/10">
          <div className="flex justify-between items-start mb-3">
            <div className="text-xs text-neon font-display tracking-wider">ЦЕЛИ ПО БЖУ</div>
            <button className="text-xs text-white/40 font-body border border-white/10 rounded-lg px-2 py-1">Изменить</button>
          </div>
          <div className="space-y-2">
            {[
              { label: "Белки", value: BJU_GOAL.protein, color: "text-blue-400" },
              { label: "Жиры", value: BJU_GOAL.fat, color: "text-yellow-400" },
              { label: "Углеводы", value: BJU_GOAL.carbs, color: "text-orange-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-sm text-white/50 font-body">{label}</span>
                <span className={`font-display text-base ${color}`}>{value} г/день</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mb-5">
        <h3 className="font-display text-base text-white mb-3">НАСТРОЙКИ</h3>
        <div className="card-dark rounded-2xl overflow-hidden">
          {[
            { icon: "Bell", label: "Уведомления", value: "Включены" },
            { icon: "Target", label: "Цели по БЖУ", value: "Настроены" },
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
        <button onClick={onLogout} className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-display text-sm tracking-wide hover:bg-red-500/10 transition-all">
          ВЫЙТИ ИЗ АККАУНТА
        </button>
      </div>
    </div>
  );
}

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-dark-bg/95 backdrop-blur-xl border-t border-white/08 z-50">
      <div className="flex items-stretch">
        {navItems.map(({ id, icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button key={id} onClick={() => onTabChange(id as Tab)} className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-all relative">
              {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-neon rounded-b-full" />}
              <Icon name={icon} size={20} className={isActive ? 'text-neon' : 'text-white/30'} />
              <span className={`text-[9px] font-body uppercase tracking-wider ${isActive ? 'text-neon' : 'text-white/25'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
