import { useCallback, useState } from "react";

export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, toggle };
};
