import { create } from "zustand";

interface MyState {
    distance: number;
    setDistance: (newDistance: number) => void;
}

export const useStore = create<MyState>((set) => ({
    distance: 0,
    setDistance: (newDistance: number) =>
        set(() => ({ distance: newDistance })),
}));
