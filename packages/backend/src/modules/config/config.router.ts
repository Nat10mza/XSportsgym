import { Router } from "express";
import { configVariables } from "./config.controller";

const configRouter = Router();

configRouter.get("/config", configVariables);

export default configRouter;
