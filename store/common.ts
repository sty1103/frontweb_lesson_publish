import { atom, selector } from 'recoil';

interface User {
  type: number;
  email: string;
  name: string;
};

export const userAtom = atom<User| null>({
  key: '_UserAtom',
  default: null
});