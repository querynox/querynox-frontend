import type { CheckoutResponseType } from "@/data/types";
import { AlertTriangle, Mail } from "lucide-react";


const RetryLimitReachedCard = ( {paymentData}:{paymentData : CheckoutResponseType | undefined}) => {
  return (
    <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
      <div className="text-center">
        {/* Animated Error Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-8 relative group">
          <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
          <div className="relative z-10">
            <AlertTriangle className="w-12 h-12 text-red-600 animate-in zoom-in-50 duration-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-red-600 mb-4 animate-in slide-in-from-top-4 duration-500">
          Retry Limit Reached
        </h2>

        <p className="text-muted-foreground mb-6 text-lg animate-in slide-in-from-bottom-4 duration-500 delay-200">
          We have exceeded the maximum number of payment status check attempts.  If it has been processed, it will be refunded in next 3-4 banking days. Please try again later or contact our payment support team.
          {paymentData && ` Payment ID ${paymentData?.id}. Order ID ${paymentData?.orderId} Customer ID  ${paymentData?.customer.clerkUserId}  ${paymentData?.customer.id}`}
        </p>

        <div className="space-y-3 text-left bg-red-50 dark:bg-red-900/10 rounded-lg p-6 mb-8 animate-in slide-in-from-left-4 duration-500 delay-300">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 dark:text-red-300 font-medium">Max retry limit reached</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-4 h-4 text-red-600" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              Contact: <a href={`mailto:contact@querynox.xyz`} className="underline hover:text-red-800">contact@querynox.xyz</a>
            </span>
          </div>
        </div>

        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 duration-500 delay-400 transform"
        >
          Try Again Later
        </button>
      </div>
    </div>
  );
};

export default RetryLimitReachedCard;