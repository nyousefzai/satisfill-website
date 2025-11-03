import { type NotificationArgsProps } from "antd";
import { create } from "zustand";

interface GlobalNotificationState {
  success: (params: NotificationArgsProps) => void;
  error: (params: NotificationArgsProps) => void;
  info: (params: NotificationArgsProps) => void;
  warning: (params: NotificationArgsProps) => void;
  destroy: () => void;
}

interface GlobalNotificationActions {
  setNotificationFunctions: (body: GlobalNotificationState) => void;
}

export const useGlobalNotification = create<
  GlobalNotificationState & GlobalNotificationActions
>()((set) => {
  return {
    success: () => {
      throw new Error("Not Implemented");
    },
    error: () => {
      throw new Error("Not Implemented");
    },
    info: () => {
      throw new Error("Not Implemented");
    },
    destroy: () => {
      throw new Error("Not Implemented");
    },
    warning: () => {
      throw new Error("Not Implemented");
    },
    setNotificationFunctions({ error, info, success, destroy, warning }) {
      set({ error, info, success, destroy, warning });
    },
  };
});
