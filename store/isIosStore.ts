import { create } from "zustand";

interface IsIOSState {
  isIOS: boolean;
  setIsIOS: (isIOS: boolean) => void;
}

export const useIsIOS = create<IsIOSState>((set) => ({
  isIOS: false,
  setIsIOS: (isIOS: boolean) => set({ isIOS }),
}));
