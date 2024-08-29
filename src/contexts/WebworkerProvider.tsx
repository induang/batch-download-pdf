import { useMemo, useRef, useState } from "react";

import { WebworkerContext } from "./WebworkerContext";

export const WebworkerProvider = ({ children }: { children: any }) => {
  const workerRef = useRef<Worker | null>(null);
  const [progress, setProgress] = useState(0);
  const webworkerContextValue = useMemo(
    () => ({ workerRef, progress, setProgress }),
    [workerRef, progress]
  );
  return (
    <WebworkerContext.Provider value={webworkerContextValue}>
      {children}
    </WebworkerContext.Provider>
  );
};
