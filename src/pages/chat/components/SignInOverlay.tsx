import { SignIn } from "@clerk/clerk-react";

const SignInOverlay = () => {
  return (
    <div className="absolute inset-0 z-50">
      <div className="flex h-screen w-screen items-center justify-center isolate rounded-xl bg-white/20 shadow-xl ring-1 ring-white/10 backdrop-blur-xs border border-white/30">
          <SignIn routing="virtual" forceRedirectUrl="/chat" />
      </div>
    </div>
  );
};

export default SignInOverlay;
