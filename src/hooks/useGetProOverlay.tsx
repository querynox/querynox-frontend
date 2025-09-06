import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FRONTEND_HOST } from "@/data/constants";

import useCheckoutLink from "@/pages/home/apis/axios/useCheckoutLink";

export function useSignInOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const getCheckoutLink = useCheckoutLink();

  const checkout = async (productID: string, plan: string, source: string) => {
    const data = await getCheckoutLink(
      productID,
      plan,
      source,
      FRONTEND_HOST + "/payments"
    );
    if (data.url) window.location.href = data.url;
  };

  const openOverlay = useCallback(() => setIsOpen(true), []);
  const closeOverlay = useCallback(() => setIsOpen(false), []);

  const Overlay = createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOverlay}
        >
          <motion.div
            className="relative bg-background p-8 rounded-2xl border border-purple-500/50 shadow-2xl w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()} // prevent close inside
          >
            {/* Close button */}
            <button
              onClick={closeOverlay}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
              Upgrade to Pro
            </h3>

            {/* Price */}
            <p className="text-center text-4xl font-bold mb-6 text-foreground">
              $15
              <span className="text-lg font-normal text-muted-foreground">
                /mo
              </span>
            </p>

            {/* Features */}
            <ul className="text-muted-foreground mb-6 space-y-2 text-left list-disc list-inside">
              <li>2000 messages / month</li>
              <li>Access to GPT-4, Claude, Gemini</li>
              <li>Web search integration</li>
              <li>Document & image uploads</li>
              <li>Conversation memory</li>
            </ul>

            {/* CTA */}
            <Button
              className="w-full relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              onClick={() =>
                checkout("8dc2161d-c84c-4979-8a06-ba23afbd2472", "pro", "GetProOverlay")
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
  );

  return { openOverlay, closeOverlay, Overlay };
}
