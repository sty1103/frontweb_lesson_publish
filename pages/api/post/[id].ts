import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ( req.method !== 'GET' ) {
    res.status(500).json({message: 'only accept GET requests'});
  }

  

  res.status(200)
}