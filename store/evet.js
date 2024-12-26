import { get } from "react-hook-form";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

export const useEvent = create((set) => ({
  activeTab: 1,
  tokenApi: "",
  tokenApiUser: "",
  callID: null,
  setActiveTab: (data) => set(() => ({ activeTab: data ? data : 1 })),
  setTokenApi: (data) => set(() => ({ tokenApi: data })),
  setTokenApiUser: (data) => set(() => ({ tokenApiUser: data })),
  setCallID: () => set(() => ({ callID: `livestream_${uuidv4()}`})),
}));
