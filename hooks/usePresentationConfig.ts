"use client";

import { useCallback, useEffect, useState } from "react";
import {
  loadPresentationConfig,
  type PresentationConfig,
} from "@/lib/presentationConfig";

export function usePresentationConfigState() {
  const [config, setConfig] = useState<PresentationConfig | null>(null);

  useEffect(() => {
    setConfig(loadPresentationConfig());
  }, []);

  const applyConfig = useCallback((next: PresentationConfig) => {
    setConfig(next);
  }, []);

  return { config, applyConfig, isReady: config !== null };
}
