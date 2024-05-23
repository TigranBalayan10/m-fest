import { NextResponse } from "next/server";
import axios, { AxiosRequestConfig } from "axios";
import { z } from "zod";

export async function fetchFromRapidAPI<T extends z.ZodTypeAny>(
  endpoint: string,
  config: AxiosRequestConfig = {}
) {
  try {
    const response = await axios.get(
      `https://car-api2.p.rapidapi.com/api/${endpoint}`,
      {
        ...config,
        headers: {
          ...config.headers,
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      }
    );

    const responseData = response.data;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(`Error fetching data from RapidAPI (${endpoint}):`, error);
    return NextResponse.json(
      { error: `Failed to fetch data from RapidAPI (${endpoint})` },
      { status: 500 }
    );
  }
}
