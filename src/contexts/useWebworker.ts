import { useContext } from "react";

import { WebworkerContext } from "./WebworkerContext";

export function useWebworker() {
  const { workerRef, progress, setProgress } = useContext(WebworkerContext);
  if (!workerRef) {
    throw new Error("useWebworker must be used within a WebworkerProvider");
  }

  function initWorker(fileUrl: string) {
    const worker = new Worker(new URL(fileUrl, import.meta.url), {
      type: "module",
    });
    worker.onerror = (e) => {
      console.error("worker error");
      console.error(e);
    };
    workerRef.current = worker;
  }

  function cleanupWorker() {
    workerRef.current?.terminate();
    workerRef.current = null;
  }

  function postMessage(message: any) {
    if (!workerRef.current) {
      throw new Error("Worker is not initialized");
    }
    workerRef.current.postMessage(message);
  }

  function onMessage(callback: (_e: MessageEvent) => void) {
    if (!workerRef.current) {
      throw new Error("Worker is not initialized");
    }
    workerRef.current.onmessage = callback;
  }

  return {
    initWorker,
    cleanupWorker,
    postMessage,
    onMessage,
    progress,
    setProgress,
  };
}
