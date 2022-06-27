import { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable import/no-anonymous-default-export */
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Evento criado");

  res.end("Criou");
};
