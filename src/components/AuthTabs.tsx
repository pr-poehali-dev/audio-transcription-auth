import { Button } from "@/components/ui/button";

interface AuthTabsProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthTabs = ({ isLogin, onToggle }: AuthTabsProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-muted p-1 rounded-lg">
        <Button
          variant={isLogin ? "default" : "ghost"}
          size="sm"
          onClick={onToggle}
          className="px-6"
        >
          Вход
        </Button>
        <Button
          variant={!isLogin ? "default" : "ghost"}
          size="sm"
          onClick={onToggle}
          className="px-6"
        >
          Регистрация
        </Button>
      </div>
    </div>
  );
};

export default AuthTabs;
