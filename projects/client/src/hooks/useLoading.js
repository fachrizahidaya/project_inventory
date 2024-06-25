import { useCallback, useState } from "react";

export const useLoading = (initial = false) => {
  const [isLoading, setIsLoading] = useState(initial);

  const toggle = useCallback(() => setIsLoading((state) => !state), []);

  return { isLoading, toggle };
};
