import { create } from "zustand";
import { signUpAuth } from "@/service/auth/signup";
import { loginAuth } from "@/service/auth/login";
import { updateUser } from "@/service/userupdate/index";
import { allPollOfUser } from "@/service/poll/index";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist(
    (set) => ({
      users: null,
      userspoll: [],
      login: async (data: any) => {
        const res = await loginAuth(data);
        set((state: any) => ({ users: res.data.data.findUser }));
        return res.data;
      },
      signup: async (data: any) => {
        const res = await signUpAuth(data);
        return res.data;
      },
      updateUser: async (data: any) => {
        const res = await updateUser(data);
        set((state: any) => ({ users: res.data.data }));
        return res.data;
      },
      getAllpoll: async () => {
        const res = await allPollOfUser();
        set((state: any) => ({ userspoll: res.data.data }));
        return res.data.data;
      },
    }),
    {
      name: "gloabal-store",
      getStorage: () => localStorage,
    }
  )
);
