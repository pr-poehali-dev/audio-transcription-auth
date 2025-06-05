import { useState } from "react";
import AuthHeader from "@/components/AuthHeader";
import AuthForm from "@/components/AuthForm";
import AuthTabs from "@/components/AuthTabs";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <AuthHeader />
        <AuthTabs isLogin={isLogin} onToggle={handleToggle} />
        <AuthForm isLogin={isLogin} />

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Безопасная обработка ваших аудиофайлов</p>
          <div className="flex items-center justify-center mt-2 space-x-4">
            <span className="flex items-center">🔒 SSL шифрование</span>
            <span className="flex items-center">
              🎵 Поддержка всех форматов
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
