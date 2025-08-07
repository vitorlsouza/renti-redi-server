import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  validateCreateUser,
  validateUpdateUser,
  validateUserId,
} from "../middleware/validation";

const router = express.Router();

router.post("/", validateCreateUser, createUser);
router.get("/", getAllUsers);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", validateUserId, deleteUser);

export default router;
