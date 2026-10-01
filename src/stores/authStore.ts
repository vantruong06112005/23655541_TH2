import { create } from 'zustand';
import { STUDENT } from '@constants/student';

type AuthState = {
  token: string | null;
  signIn: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  signIn: () => set({ token: `ktxgo-${STUDENT.mssv}` }),
  signOut: () => set({ token: null }),
}));