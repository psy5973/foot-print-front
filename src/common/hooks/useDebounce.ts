import { useState, useEffect } from "react";

/**
 * value가 변경된 후 지정한 delay(ms)만큼 기다린 후에 debouncedValue를 업데이트
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: value가 바뀌기 전에 이전 타이머 제거
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
