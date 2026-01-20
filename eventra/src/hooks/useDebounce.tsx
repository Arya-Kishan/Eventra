import {useCallback, useRef} from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 500,
) {
  const timeoutRef = useRef<any>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}
