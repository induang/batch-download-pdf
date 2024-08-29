import type React from "react";
import { createContext } from "react";
export const WebworkerContext = createContext<{
  workerRef: React.MutableRefObject<Worker | null>;
  progress: number;
  setProgress?: React.Dispatch<React.SetStateAction<number>>;
}>({
  workerRef: { current: null },
  progress: 0,
});
