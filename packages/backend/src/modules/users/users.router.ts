import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./users.controller";

const usersRouter = Router();

usersRouter
  .get("/users", getAllUsers)
  .get("/users/:userId", getUser)
  .post("/users", createUser)
  .patch("/users/:userId", updateUser)
  .delete("/users/:userId", deleteUser);

export default usersRouter;
