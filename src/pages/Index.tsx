import { TypingPractice } from "@/components/TypingPractice";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            NeoType
          </h1>
          <p className="text-muted-foreground">
            Futuristic Typing Practice • Master Your Speed
          </p>
        </div>
        <TypingPractice />
      </div>
    </div>
  );
};

export default Index;