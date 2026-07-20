import { createContext, useContext, useState, useCallback } from "react";

const ConsentContext = createContext(null);
const STORAGE_KEY = "formax-consent";

function getStoredConsent() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

export function ConsentProvider({ children }) {
  const [consent, setConsentState] = useState(getStoredConsent);

  const accept = useCallback(() => {
    setConsentState("accepted");
    window.localStorage.setItem(STORAGE_KEY, "accepted");
  }, []);

  const decline = useCallback(() => {
    setConsentState("declined");
    window.localStorage.setItem(STORAGE_KEY, "declined");
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, accept, decline }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return ctx;
}
