import { Request, Response } from "express";

export function configVariables(req: Request, res: Response) {
  const config = {
    cloudinaryCloud: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryPreset: process.env.CLOUDINARY_PRESET,
    cloudinaryUrl: process.env.CLOUDINARY_URL,
  };
  res.json(config);
}
