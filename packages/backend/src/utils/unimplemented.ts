import { Request, Response } from "express";

export default function unimplemented(req: Request, res: Response) {
  res.status(500).send(`UNIMPLEMENTED: ${req.method} ${req.originalUrl}`);
}
