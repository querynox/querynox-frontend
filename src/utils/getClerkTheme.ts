import { dark } from "@clerk/themes";
import { type BaseTheme } from "@clerk/types";

export const getClerkPreferredTheme = (): BaseTheme | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    if (localStorage.getItem("darkmode") === "true") {
      return dark;
    }
  } catch (error) {
    console.error("Could not access localStorage:", error);
    return undefined;
  }

  return undefined;
};

