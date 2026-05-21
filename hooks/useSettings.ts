"use client";

import { useEffect, useState } from "react";
import {
  getClientSettings,
  saveClientSettings,
} from "@prettylab/core/utils/settings/clientSettings";

export const useSettings = (key: string, defaultValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getClientSettings(key) ?? defaultValue;
  });

  useEffect(() => {
    saveClientSettings(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
