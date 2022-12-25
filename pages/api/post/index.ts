import type { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os';

interface IGetDataResult {
  items: {
    type: string;
    title: string;
    song: string;
    video: string;
    content: string;
    comments: { // 대댓글 구조 아님
      user: string;
      name: string;
      type: string;
      content: string;
    }[];
  }[];
}

interface IData {
  msg: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  switch( req.method ) {
    case "DELETE":
    case "PATCH":
    case "POST":
      
      break;
    case "GET":
      const postList = [

      ];

      break;
  }
  res.status(200).json({msg: 'hello'});
}
