import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserRequest, UpdateUserRequest } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

const userService = new UserService();

// @desc    Create new user
// @route   POST /api/users
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const userData: CreateUserRequest = req.body;
  const user = await userService.createUser(userData);

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
});

// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      count: users.length,
    });
  }
);

// @desc    Get user by ID
// @route   GET /api/users/:id
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User retrieved successfully",
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: UpdateUserRequest = req.body;
  const user = await userService.updateUser(id, updates);

  res.status(200).json({
    message: "User updated successfully",
    data: user,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);

  res.status(200).json({
    message: "User deleted successfully",
  });
});
