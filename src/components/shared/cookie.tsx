"use client";

import { CookieIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent({
  demo = false,
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
  delay = 3000,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(true);

  const accept = () => {
    setIsOpen(false);
    const currentTime = new Date().toISOString();
    const cookieData = {
      accepted: true,
      timestamp: currentTime,
      website: "jaymabioinnovations.com",
      purpose:
        "Improving user experience and site analytics for sustainable health innovations",
    };

    document.cookie = `cookieConsent=${JSON.stringify(
      cookieData
    )}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback();
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback();
  };

  useEffect(() => {
    try {
      const hasConsent = document.cookie.includes("cookieConsent=");

      if (!hasConsent || demo) {
        setHide(false);

        const timer = setTimeout(() => {
          setIsOpen(true);
        }, delay);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error("Error checking cookie consent:", e);
    }
  }, [demo, delay]);

  if (hide) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-[200] bottom-0 left-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md"
          initial={{ y: 100, x: 100, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          exit={{ y: 100, x: 100, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        >
          <div className="dark:bg-secondary bg-background rounded-md m-3 border border-border shadow-lg dark:shadow-none">
            <div className="grid gap-2">
              <motion.div
                className="border-b border-border dark:border-background/20 h-14 flex items-center justify-between p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-lg font-medium">Cookie Policy</h1>
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, -15, 0],
                    transition: { duration: 1, delay: 0.5 },
                  }}
                >
                  <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                </motion.div>
              </motion.div>

              <motion.div
                className="p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm font-normal text-start">
                  At Jayma Bio Innovations, we use cookies to enhance your
                  experience with our sustainable health products, including
                  kombucha, bacterial cellulose, and the innovative SapStudio
                  device.
                  <br />
                  <br />
                  <span className="text-xs">
                    By clicking "
                    <span className="font-medium opacity-80">Accept</span>", you
                    allow us to analyze site usage and create a more meaningful
                    digital connection with our eco-conscious community.
                  </span>
                  <br />
                  <a
                    href="/privacy-policy"
                    className="text-xs underline hover:opacity-80 transition-opacity"
                  >
                    View our Privacy Policy
                  </a>
                </p>
              </motion.div>

              <motion.div
                className="flex gap-2 p-4 py-5 border-t border-border dark:bg-background/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={accept}
                  className="w-full hover:scale-105 transition-transform"
                >
                  Accept
                </Button>
                <Button
                  onClick={decline}
                  className="w-full hover:scale-105 transition-transform"
                  variant="outline"
                >
                  Decline
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
