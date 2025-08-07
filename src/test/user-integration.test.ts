import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("User Integration Tests", () => {
  let createdUserId: string;

  it("should create, update and delete a user", async () => {
    // 1. Create user
    const userData = {
      name: "Integration Test User",
      zipCode: "12345",
    };

    const createResponse = await request(app)
      .post("/users")
      .send(userData)
      .expect(201);

    createdUserId = createResponse.body.data.id;

    expect(createResponse.body.data).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      zipCode: userData.zipCode,
    });

    // 2. Update user
    const updateData = {
      name: "Updated Integration User",
    };

    const updateResponse = await request(app)
      .put(`/users/${createdUserId}`)
      .send(updateData)
      .expect(200);

    expect(updateResponse.body).toEqual({
      message: "User updated successfully",
      data: expect.objectContaining({
        id: createdUserId,
        name: updateData.name,
      }),
    });

    // 3. Verify if the update worked
    const getUsersResponse = await request(app).get("/users").expect(200);

    const updatedUser = getUsersResponse.body.data.find(
      (user: any) => user.id === createdUserId
    );
    expect(updatedUser?.name).toBe(updateData.name);

    // 4. Delete user
    const deleteResponse = await request(app)
      .delete(`/users/${createdUserId}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: "User deleted successfully",
    });

    // 5. Verify if it was deleted
    const finalUsersResponse = await request(app).get("/users").expect(200);

    const deletedUser = finalUsersResponse.body.data.find(
      (user: any) => user.id === createdUserId
    );
    expect(deletedUser).toBeUndefined();
  });
});
