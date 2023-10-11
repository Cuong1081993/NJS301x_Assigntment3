import {
  getUsers,
  getDetailUser,
  updateUser,
  getCountUser,
  deleteUser,
} from "../controller/user.js";

import express from "express";
import { verifyUser, verifyAdmin } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.get("/count", verifyAdmin, getCountUser);
router.get("/:userId", verifyUser, getDetailUser);
router.put("/userId", verifyAdmin, updateUser);
router.delete("/:userId", verifyAdmin, deleteUser);

export default router;
