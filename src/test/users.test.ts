import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("User API", () => {
  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toEqual({
        success: true,
        message: "Server is running successfully",
        timestamp: expect.any(String),
      });
    });
  });

  describe("POST /users", () => {
    it("should return 400 for invalid name format", async () => {
      const userData = {
        name: "John Doe 123",
        zipCode: "123456",
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: "Validation failed",
        errors: expect.any(Array),
      });
    });

    it("should return 400 for invalid zipCode format", async () => {
      const userData = {
        name: "John Doe",
        zipCode: "invalid-zip",
      };

      await request(app).post("/users").send(userData).expect(400);
    });

    it("should return 400 for missing required fields", async () => {
      const userData = {
        name: "John Doe",
        // missing zipCode
      };

      const response = await request(app)
        .post("/users")
        .send(userData)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: "Validation failed",
        errors: expect.any(Array),
      });
    });
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/users").expect(200);

      expect(response.body).toEqual({
        message: "Users retrieved successfully",
        data: expect.any(Array),
        count: expect.any(Number),
      });
    });
  });

  describe("PUT /users/:id", () => {
    it("should return 400 for invalid user ID format", async () => {
      const updateData = {
        name: "Updated Name",
      };

      await request(app).put("/users/invalid-id").send(updateData).expect(400);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should return 400 for invalid user ID format", async () => {
      await request(app).delete("/users/invalid-id").expect(400);
    });
  });
});
