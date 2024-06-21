import { useEffect, useState } from "react";
import { useViewport } from "hooks/useViewport";
import { useDebounce } from "hooks/useDebounce";

export const useResponsiveViewport = (
  initialWidth: number = window.innerWidth,
) => {
  const [viewport, setViewport] = useState(initialWidth);
  const { width } = useViewport();
  const debouncedValue = useDebounce(String(width), 50);

  useEffect(() => {
    setViewport(Number(debouncedValue));
  }, [debouncedValue]);

  return { viewport };
};
