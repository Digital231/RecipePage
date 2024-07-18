import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      username: "",
      setUsername: (username) => set({ username: username }),
      secretKey: "",
      setSecretKey: (secretKey) => set({ secretKey }),
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useStore;
