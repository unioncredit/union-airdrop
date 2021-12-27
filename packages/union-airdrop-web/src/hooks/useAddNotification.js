import { useCallback } from "react";
import notifications from "../state/notifications";

export default function useAddNotification() {
  return useCallback((text, options) => {
    const x = notifications.get();
    const id = x.length;
    notifications.set([...x, { text, ...options, id }]);

    return () => {
      notifications.set((state) => state.filter((s) => s.id !== id));
    };
  }, []);
}
