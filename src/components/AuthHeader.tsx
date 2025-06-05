import Icon from "@/components/ui/icon";

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-primary/10 p-3 rounded-full mr-3">
          <Icon name="Mic" size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground font-montserrat">
          AudioTranscribe
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Профессиональная транскрибация и саммаризация аудио
      </p>
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="h-1 w-8 bg-primary rounded-full animate-pulse"></div>
        <div className="h-1 w-12 bg-primary/60 rounded-full animate-pulse delay-100"></div>
        <div className="h-1 w-6 bg-primary/40 rounded-full animate-pulse delay-200"></div>
      </div>
    </div>
  );
};

export default AuthHeader;
