import { useSystemContext } from "@/contexts/SystemContext";
import { Moon, Sun } from "lucide-react";
import ProgressBarLoader from '@/pages/payments/components/ProgressBarLoader';
import PaymentFailedCard from '@/pages/payments/components/PaymentFailedCard';
import PaymentSuccessCard from '@/pages/payments/components/PaymentSuccessCard';
import type { PaymentSearchType } from "@/data/types";
import useQueryPaymentStatus from "./apis/queries/useQueryStatus";
import RetryLimitReachedCard from "./components/RetryLimitReached";
import BrokenLinkCard from "./components/BrokenLinkCard";
import { useSearch } from "@tanstack/react-router";

const Payments = () => {
  const { darkmode, setDarkmode } = useSystemContext();
  const query = useSearch({ from: "/payments" }) as PaymentSearchType;
  const { data, isLoading, refetch, error } = useQueryPaymentStatus(query)

  const handleTryAgain = () => {
    refetch()
  };

  const handleStartChatting = () => {
    window.location.replace("/chat");
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
            {!error && (isLoading || !data || data.status === "pending") && <ProgressBarLoader paymentData={data} />}
 
            {/* Payment Failed Card */}
            {!error && !isLoading && data &&  (data.status === "failed" || data.status === "requires_action" || data.status === "canceled") && <PaymentFailedCard onTryAgain={handleTryAgain} paymentData={data} />}

            {/* Payment Success Card */}
            {!error && !isLoading && data && (data.status === "succeeded") && <PaymentSuccessCard onStartChatting={handleStartChatting} paymentData={data}/>}

            {/* Invalid CheckoutID or Session Id */}
            {error && error.response?.data.status === "invalid" && <BrokenLinkCard/>} 
            
            {/*Retry Limit Reached*/}
            {error && !error.response && <RetryLimitReachedCard  paymentData={error}/>} 
          
        </div>
      </div>
    </div>
  );
};

export default Payments;
