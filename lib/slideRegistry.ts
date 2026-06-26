import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { SLIDE_COUNT } from "@/lib/slides";

type SlideModule = { default: ComponentType };

const loaders: Record<number, () => Promise<SlideModule>> = {};

for (let id = 1; id <= SLIDE_COUNT; id++) {
  const padded = String(id).padStart(2, "0");
  loaders[id] = () => import(`@/components/slides/Slide${padded}`);
}

const cache = new Map<number, LazyExoticComponent<ComponentType>>();

export function getSlideLoader(id: number): (() => Promise<SlideModule>) | null {
  return loaders[id] ?? null;
}

export function getSlideComponent(id: number): LazyExoticComponent<ComponentType> | null {
  const loader = loaders[id];
  if (!loader) return null;

  let cached = cache.get(id);
  if (!cached) {
    cached = lazy(loader);
    cache.set(id, cached);
  }
  return cached;
}

export function prefetchSlideComponent(id: number): void {
  const loader = loaders[id];
  if (loader) void loader();
}

export function isBuiltinSlideId(id: number): boolean {
  return id >= 1 && id <= SLIDE_COUNT && Boolean(loaders[id]);
}
