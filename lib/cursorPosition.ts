type CursorListener = () => void;

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
};

let state: CursorState = { x: 0, y: 0, visible: false };
const listeners = new Set<CursorListener>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeCursorPosition(listener: CursorListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCursorPosition(): CursorState {
  return state;
}

export function updateCursorPosition(x: number, y: number): void {
  if (state.x === x && state.y === y && state.visible) return;
  state = { x, y, visible: true };
  emit();
}

export function hideCursorPosition(): void {
  if (!state.visible) return;
  state = { ...state, visible: false };
  emit();
}
