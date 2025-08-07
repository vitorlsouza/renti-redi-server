import { body, param, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// Reusable validation rules
const nameValidation = (optional = false) => {
  const validator = body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces");

  return optional ? validator.optional() : validator;
};

const zipCodeValidation = (optional = false) => {
  const validator = body("zipCode")
    .notEmpty()
    .withMessage("Zip code is required")
    .trim()
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage("Zip code must be in format 12345 or 12345-6789");

  return optional ? validator.optional() : validator;
};

const userIdValidation = () =>
  param("id").isUUID().withMessage("Invalid user ID format");

// Validation chains
export const validateCreateUser = [
  nameValidation(),
  zipCodeValidation(),
  handleValidationErrors,
];

export const validateUpdateUser = [
  userIdValidation(),
  nameValidation(true),
  zipCodeValidation(true),
  handleValidationErrors,
];

export const validateUserId = [userIdValidation(), handleValidationErrors];
