import { create } from "zustand";
interface StoreState {
  isForbid: 'error'|'expired'|'solved'|'';
  setForbid: (status: 'error'|'expired'|'solved'|'') => void;
}
export const isForbid = create<StoreState>((set) => ({
  isForbid: '',
  setForbid: (status) => {
    set(() => ({ isForbid: status }));
  },
}));
