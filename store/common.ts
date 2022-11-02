import { atom, selector } from 'recoil';

interface User {
  type: number;
  email: string;
  name: string;
};

export const userAtom = atom<User| null>({
  key: `userAtom${new Date().getTime()}`,
  default: null
});