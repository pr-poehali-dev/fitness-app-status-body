import { useState } from "react";
import { AuthScreen, User } from "@/components/data";
import { WelcomeScreen, LoginScreen, RegisterScreen } from "@/components/AuthScreens";
import AppTabs from "@/components/AppTabs";

export default function StatusBodyApp() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>("welcome");
  const [user, setUser] = useState<User | null>(null);

  const handleAuthSuccess = (u: User) => { setUser(u); };

  if (!user) {
    if (authScreen === "welcome") return <WelcomeScreen onLogin={() => setAuthScreen("login")} onRegister={() => setAuthScreen("register")} />;
    if (authScreen === "login") return <LoginScreen onBack={() => setAuthScreen("welcome")} onSuccess={handleAuthSuccess} />;
    return <RegisterScreen onBack={() => setAuthScreen("welcome")} onSuccess={handleAuthSuccess} />;
  }

  return <AppTabs user={user} onLogout={() => setUser(null)} />;
}