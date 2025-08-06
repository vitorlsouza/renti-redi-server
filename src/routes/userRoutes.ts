import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
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
router.get("/:id", validateUserId, getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", validateUserId, deleteUser);

export default router;
