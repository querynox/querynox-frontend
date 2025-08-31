import type { CheckoutResponseType } from '@/data/types';
import { Loader2, Zap } from 'lucide-react';

const ProgressBarLoader = ({paymentData}:{paymentData:CheckoutResponseType | undefined}) => {
  return (
    <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6 relative group">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <Loader2 className="w-10 h-10 text-green-600 animate-spin group-hover:scale-110 transition-transform duration-300" style={{ animationDuration: '3.5s' }} />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Processing Payment {paymentData?.product.name}
        </h2>
        <p className="text-muted-foreground text-lg">
          Please wait while we process your payment...
        </p>
      </div>
      
      {/* Continuous Diagonal Striped Progress Bar */}
      <div className="w-full bg-muted rounded-full h-6 overflow-hidden relative">
        <div className="h-full bg-green-500 rounded-full relative overflow-hidden">
          {/* Diagonal striped pattern moving from left to right */}
          <div 
            className="absolute inset-0 w-[200%] h-full"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                #22c55e 0px,
                #22c55e 8px,
                #16a34a 8px,
                #16a34a 16px
              )`,
              animation: 'moveStripes 3.5s linear infinite'
            }}
          ></div>
          {/* Subtle gradient overlay for sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-3 text-sm text-muted-foreground">
        <span className="flex items-center space-x-2">
          <Zap className="w-4 h-4 animate-pulse text-green-600" />
          <span>Processing...</span>
        </span>
      </div>

      <style>{`
        @keyframes moveStripes {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBarLoader;