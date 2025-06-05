import { Answers, Storage, User } from '@prisma/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserState = {
  user: Partial<User & { image: Storage; answers: Answers | null }>;
};

type Actions = {
  login: (user: UserState) => void;
  logout: () => void;
};

const default_state = () => ({
  user: {},
});

export const useUserStore = create<UserState & Actions>()(
  persist(
    set => ({
      ...default_state(),
      login: (user: UserState) => set({ ...user }),
      logout: () => set({ ...default_state() }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
