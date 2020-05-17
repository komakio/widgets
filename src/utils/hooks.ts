import { useEffect } from 'preact/hooks';

export function useAsyncEffect<T>(
  asyncFunction: (isActive: () => boolean) => Promise<T>
): void {
  useEffect(() => {
    let active = true;
    const isActive = () => active;
    asyncFunction(isActive);

    return () => (active = false);
  }, [asyncFunction]);
}
