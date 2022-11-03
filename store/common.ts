import { atom, selector } from 'recoil';

interface IUser {
  type: number;
  email: string;
  name: string;
  auth: string;
};

export const userAtom = atom<IUser| null>({
  key: `userAtom${new Date().getTime()}`,
  default: null
});

export const tempUserData = atom<IUser[]>({
  key: `tempUserData${new Date().getTime()}`,
  default: [
    { type: 0, email: 'student@gmail.com', name: '학생', auth: 'student'
    },
    { type: 1, email: 'teacher@gmail.com', name: '학생', auth: 'teacher'
    }
  ]
})