export interface KeyboardConfig {
  action: () => void;
  prevent?: boolean;
}

export default function useKeyboard(config: Record<string, KeyboardConfig>) {
  function onKeyDown(e: React.KeyboardEvent) {
    const focusConfig = config[e.key];

    if (focusConfig) {
      if (focusConfig.prevent !== false) e.preventDefault();
      focusConfig.action();
    }
  }

  return { onKeyDown };
}
