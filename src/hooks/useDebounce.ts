import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay = 500): string => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return inputValue;
};
