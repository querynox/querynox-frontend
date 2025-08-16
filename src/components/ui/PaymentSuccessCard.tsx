import { Check, Sparkles } from 'lucide-react';

interface PaymentSuccessCardProps {
  onStartChatting?: () => void;
}

const PaymentSuccessCard = ({ onStartChatting }: PaymentSuccessCardProps) => {
  return (
    <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
      <div className="text-center">
        {/* Animated Green Checkmark */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full mb-8 relative group">
          <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
          <div className="relative z-10">
            <Check className="w-12 h-12 text-green-600 animate-in zoom-in-50 duration-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-green-600 mb-4 animate-in slide-in-from-top-4 duration-500">
          Payment Successful!
        </h2>
        
        <p className="text-muted-foreground mb-8 text-lg animate-in slide-in-from-bottom-4 duration-500 delay-200">
          Your payment has been processed successfully. Welcome to QueryNox Pro!
        </p>
        
        <div className="space-y-4 text-left bg-green-50 dark:bg-green-900/10 rounded-lg p-6 mb-8 animate-in slide-in-from-left-4 duration-500 delay-300">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 dark:text-green-300 font-medium">Pro subscription activated</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-100"></div>
            <span className="text-green-700 dark:text-green-300 font-medium">2000 messages per month</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
            <span className="text-green-700 dark:text-green-300 font-medium">Access to all AI models</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
            <span className="text-green-700 dark:text-green-300 font-medium">Document & image uploads</span>
          </div>
        </div>
        
        <button 
          onClick={onStartChatting}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-4 duration-500 delay-400 transform flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Start Chatting</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
