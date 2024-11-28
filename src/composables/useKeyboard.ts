export interface KeyboardConfig {
  action: (e: React.KeyboardEvent) => void;
  prevent?: boolean;
}

export default function useKeyboard(config: Record<string, KeyboardConfig>) {
  function onKeyDown(e: React.KeyboardEvent) {
    const focusConfig = config[e.key] ?? config['*'];

    if (focusConfig) {
      if (focusConfig.prevent === true) e.preventDefault();
      focusConfig.action(e);
    }
  }

  return { onKeyDown };
}
