import { useEffect, useState } from "react";

type UseLocalStorageResult = [value: string, setValue: (value: string) => void];

const useLocalStorage = (
  key: string,
  initialValue = ""
): UseLocalStorageResult => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
