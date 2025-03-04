import {create} from "zustand";
interface StoreState {
    isShow: boolean;
    setIsShow: () => void;
  }
export const isShowPortal = create<StoreState>((set) => ({
    isShow: false,
    setIsShow: () => set((state) => ({ isShow: !state.isShow })),
}))
