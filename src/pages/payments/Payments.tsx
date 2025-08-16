import { useSystemContext } from "@/contexts/SystemContext";
import { Moon, Sun } from "lucide-react";
import ProgressBarLoader from '@/components/ui/ProgressBarLoader';
import PaymentFailedCard from '@/components/ui/PaymentFailedCard';
import PaymentSuccessCard from '@/components/ui/PaymentSuccessCard';

const Payments = () => {
  const { darkmode, setDarkmode } = useSystemContext();

  const handleProgressComplete = () => {
    console.log('Progress completed');
  };

  const handleTryAgain = () => {
    console.log('Try again clicked');
  };

  const handleStartChatting = () => {
    console.log('Start chatting clicked');
  };

  return (
    <div className="h-screen flex flex-col text-accent-foreground w-full bg-background overflow-hidden">
      {/* Navbar - matching /chat page */}
      <div className="flex flex-row items-center justify-between p-3 border-b-[1px] text-accent-foreground bg-secondary">
        <div className="flex items-center space-x-3">
          <img 
            src="/querynox.jpeg" 
            alt="QueryNox" 
            className="h-10 w-10 rounded-lg"
          />
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              <span className="text-foreground">Query</span>
              <span className="text-muted-foreground">Nox</span>
            </span>
          </div>
        </div>

        <div className="cursor-pointer transition-all px-2" onClick={() => setDarkmode(prev => !prev)}>
          {darkmode ? <Sun /> : <Moon />}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Progress Bar Loader */}
          <ProgressBarLoader onComplete={handleProgressComplete} />

          {/* Payment Failed Card */}
          <PaymentFailedCard onTryAgain={handleTryAgain} />

          {/* Payment Success Card */}
          <PaymentSuccessCard onStartChatting={handleStartChatting} />
        </div>
      </div>
    </div>
  );
};

export default Payments;
