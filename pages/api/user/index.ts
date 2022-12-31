import { NextApiRequest, NextApiResponse } from 'next';


// interface IUser {
//   id: string;
//   email: string;
//   name: string;
//   gender: string;
//   instrumenst: string[];
//   skills: string;
//   grade: string;
//   education: string;
//   instroduction: string;
//   genre: string[];
//   location: {
//     coordinate
//   };

// }

interface IUserRes {
  id: string;
  email: string;
  name: string;
  gender: string;
  instrumenst: string[];
  skills: string;
  grade: string;
  education: string;
  instroduction: string;
  genre: string[];
  location: {
    coordinate: 
  };
}

export default (req: NextApiRequest, res: NextApiResponse) {
  res.status(500).json({message: 'only accept GET requests'});
}