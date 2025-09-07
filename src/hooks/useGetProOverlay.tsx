import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FRONTEND_HOST } from "@/data/constants";
import useCheckoutLink from "@/pages/home/apis/axios/useCheckoutLink";

type OverlayContextType = {
  openOverlay: () => void;
  closeOverlay: () => void;
};

const OverlayContext = createContext<OverlayContextType | null>(null);

export function SignInOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const getCheckoutLink = useCheckoutLink();
  const modalRef = useRef<HTMLDivElement>(null);

  const openOverlay = useCallback(() => setIsOpen(true), []);
  const closeOverlay = useCallback(() => setIsOpen(false), []);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeOverlay(); 
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [closeOverlay]);

  const checkout = async (productID: string, plan: string, source: string) => {
    const data = await getCheckoutLink(
      productID,
      plan,
      source,
      FRONTEND_HOST + "/payments"
    );
    if (data.url) window.location.href = data.url;
  };


  return (
    <OverlayContext.Provider value={{ openOverlay, closeOverlay }}>
      {children}

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              <motion.div
                ref={modalRef}
                className="
                  relative bg-background p-8 rounded-2xl border border-purple-500/50 shadow-2xl
                  w-[70%] max-w-md   /* mobile default: 60% width */
                  sm:w-full sm:mx-4  /* small screens and up: fallback to full with margin */
                "
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeOverlay}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="h-5 w-5" />
                </button>

                <h3 className="text-2xl sm:text-3xl  font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                  Upgrade to Pro
                </h3>

                <p className="text-center text-3xl sm:text-4xl font-bold mb-6 text-foreground">
                  $5
                  <span className="text-base sm:text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </p>

                <ul className="text-sm sm:text-base text-muted-foreground mb-6 space-y-2 text-left list-disc list-inside">
                  <li>3000 messages / month</li>
                  <li>Access to GPT-3.5, Claude, Gemini</li>
                  <li>Web search integration</li>
                  <li>Document & image uploads</li>
                  <li>Conversation memory</li>
                </ul>

                <Button
                  className="w-full relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                  onClick={() =>
                    checkout(
                      "5f318c59-6185-42a5-aa03-56c9f86f526f",
                      "pro",
                      "GetProOverlay"
                    )
                  }
                >
                  <Sparkles className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Upgrade Now</span>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </OverlayContext.Provider>
  );
}

export function useSignInOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useSignInOverlay must be used inside <SignInOverlayProvider>");
  return ctx;
}
