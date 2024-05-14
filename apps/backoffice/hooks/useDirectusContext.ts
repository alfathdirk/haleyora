import { DirectusContext } from "@/provider/Directus";
import { useContext } from "react";

export const useDirectusContext = () => {
  const context = useContext(DirectusContext);

  if (context === undefined) {
    throw new Error(
      "useDirectusContext must be used within a DirectusProvider",
    );
  }

  return context;
};
