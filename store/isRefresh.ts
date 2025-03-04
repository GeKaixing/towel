import { create } from "zustand";
interface StoreState {
  isRefresh: boolean;
  setRefresh: () => void;
}
export const isRefresh = create<StoreState>((set) => ({
  isRefresh: false,
  setRefresh: () => set((state) => ({ isRefresh: !state.isRefresh })),
}));
