import { useQuery } from "@tanstack/react-query";
export * from "./queryClient";

export const useTest = () => {
  const queryFn = async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("test");
      }, 2000);
    });
  };
  return useQuery({ queryKey: ["test"], queryFn });
};
