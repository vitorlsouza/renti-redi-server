import { db } from "../config/firebase";
import { User, CreateUserRequest, UpdateUserRequest } from "../models/User";
import { WeatherService } from "./weatherService";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private weatherService: WeatherService;
  private usersRef = db.ref("users");

  constructor() {
    this.weatherService = new WeatherService();
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      // Get location data from weather API
      const locationData = await this.weatherService.getLocationData(
        userData.zipCode
      );

      const userId = uuidv4();
      const now = new Date().toISOString();

      const user: User = {
        id: userId,
        name: userData.name,
        zipCode: userData.zipCode,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        timezone: locationData.timezone,
        createdAt: now,
        updatedAt: now,
      };

      await this.usersRef.child(userId).set(user);
      return user;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await this.usersRef.once("value");
      const users = snapshot.val();

      if (!users) return [];

      return Object.values(users) as User[];
    } catch (error: any) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const snapshot = await this.usersRef.child(id).once("value");
      const user = snapshot.val();

      return user || null;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateUser(id: string, updates: UpdateUserRequest): Promise<User> {
    try {
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      let locationData = {
        latitude: existingUser.latitude,
        longitude: existingUser.longitude,
        timezone: existingUser.timezone,
      };

      // If zip code is being updated, fetch new location data
      if (updates.zipCode && updates.zipCode !== existingUser.zipCode) {
        locationData = await this.weatherService.getLocationData(
          updates.zipCode
        );
      }

      const updatedUser: User = {
        ...existingUser,
        ...updates,
        ...locationData,
        updatedAt: new Date().toISOString(),
      };

      await this.usersRef.child(id).set(updatedUser);
      return updatedUser;
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error("User not found");
      }

      await this.usersRef.child(id).remove();
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
