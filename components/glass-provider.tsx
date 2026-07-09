"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

interface GlassContextType {
  backdrop: ReactNode | null;
  setBackdrop: (node: ReactNode | null) => void;
  backdropRef: HTMLElement | null;
  setBackdropRef: (node: HTMLElement | null) => void;
}

const GlassContext = createContext<GlassContextType>({
  backdrop: null,
  setBackdrop: () => {},
  backdropRef: null,
  setBackdropRef: () => {},
});

export function GlassProvider({ children }: { children: ReactNode }) {
  const [backdrop, setBackdrop] = useState<ReactNode | null>(null);
  const [backdropRef, setBackdropRef] = useState<HTMLElement | null>(null);

  return (
    <GlassContext.Provider value={{ backdrop, setBackdrop, backdropRef, setBackdropRef }}>
      {children}
    </GlassContext.Provider>
  );
}

export function useGlassScene() {
  return useContext(GlassContext);
}
