import { X } from 'lucide-react';

interface PaymentFailedCardProps {
  onTryAgain?: () => void;
}

const PaymentFailedCard = ({ onTryAgain }: PaymentFailedCardProps) => {
  return (
    <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
      <div className="text-center">
        {/* Animated Red Cross */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-8 relative group">
          <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
          <X className="w-12 h-12 text-red-600 relative z-10 animate-in zoom-in-50 duration-500 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        
        <h2 className="text-4xl font-bold text-red-600 mb-4 animate-in slide-in-from-top-4 duration-500">
          Payment Failed
        </h2>
        
        <p className="text-muted-foreground mb-8 text-lg animate-in slide-in-from-bottom-4 duration-500 delay-200">
          We couldn't process your payment. Please check your payment details and try again.
        </p>
        
        <div className="space-y-4 text-left bg-red-50 dark:bg-red-900/10 rounded-lg p-6 mb-8 animate-in slide-in-from-left-4 duration-500 delay-300">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 dark:text-red-300 font-medium">Invalid card information</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-100"></div>
            <span className="text-red-700 dark:text-red-300 font-medium">Insufficient funds</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-200"></div>
            <span className="text-red-700 dark:text-red-300 font-medium">Card expired</span>
          </div>
        </div>
        
        <button 
          onClick={onTryAgain}
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 duration-500 delay-400 transform hover:rotate-1"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedCard;
