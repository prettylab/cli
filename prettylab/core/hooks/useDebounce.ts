import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, ms: number) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [value, ms]);

  return debounce;
};
