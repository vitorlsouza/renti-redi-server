import axios from "axios";
import { WeatherApiResponse } from "../models/User";
import dotenv from "dotenv";
dotenv.config();

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY!;
    this.baseUrl = process.env.OPENWEATHER_BASE_URL!;
    if (!this.apiKey) {
      throw new Error("OPENWEATHER_API_KEY is required");
    }
  }

  async getLocationData(zipCode: string): Promise<{
    latitude: number;
    longitude: number;
    timezone: string;
  }> {
    try {
      const response = await axios.get<WeatherApiResponse>(
        `${this.baseUrl}/weather`,
        {
          params: {
            zip: zipCode,
            appid: this.apiKey,
          },
          timeout: 10000,
        }
      );

      const { coord, timezone } = response.data;

      // Convert timezone offset from seconds to timezone string
      const timezoneString = this.convertTimezoneOffsetToString(timezone);

      return {
        latitude: coord.lat,
        longitude: coord.lon,
        timezone: timezoneString,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("Invalid zip code provided");
      }
      if (error.code === "ECONNABORTED") {
        throw new Error("Weather service timeout - please try again");
      }
      throw new Error(`Failed to fetch location data: ${error.message}`);
    }
  }

  private convertTimezoneOffsetToString(offsetSeconds: number): string {
    const offsetHours = offsetSeconds / 3600;
    const sign = offsetHours >= 0 ? "+" : "-";
    const absHours = Math.abs(offsetHours);
    const hours = Math.floor(absHours);
    const minutes = Math.floor((absHours - hours) * 60);

    return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
}
