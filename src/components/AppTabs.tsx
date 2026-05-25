import { useState } from "react";
import { Tab, User } from "@/components/data";
import HomeTab from "@/components/tabs/HomeTab";
import { ProgramsTab, WorkoutTab } from "@/components/tabs/ProgramsWorkoutTab";
import { NutritionTab, ProgressTab } from "@/components/tabs/NutritionProgressTab";
import { ChatTab, ProfileTab, BottomNav } from "@/components/tabs/ChatProfileTab";

interface AppTabsProps {
  user: User;
  onLogout: () => void;
}

export default function AppTabs({ user, onLogout }: AppTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col max-w-md mx-auto relative overflow-hidden">

      {activeTab === "home" && (
        <HomeTab
          user={user}
          onStartWorkout={() => { setSelectedWorkout(1); setActiveTab("workout"); }}
          onGoToPrograms={() => setActiveTab("programs")}
        />
      )}

      {activeTab === "programs" && (
        <ProgramsTab onGoToWorkout={(id) => { setSelectedWorkout(id); setActiveTab("workout"); }} />
      )}

      {activeTab === "workout" && (
        <WorkoutTab
          selectedWorkout={selectedWorkout}
          onSelectWorkout={(id) => setSelectedWorkout(id)}
          onBackFromWorkout={() => setSelectedWorkout(null)}
        />
      )}

      {activeTab === "nutrition" && <NutritionTab />}

      {activeTab === "progress" && <ProgressTab />}

      {activeTab === "chat" && (
        <ChatTab chatInput={chatInput} onChatInputChange={setChatInput} />
      )}

      {activeTab === "profile" && (
        <ProfileTab user={user} onLogout={onLogout} />
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
