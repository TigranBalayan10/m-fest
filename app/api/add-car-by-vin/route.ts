import { EngineResponseSchema, VinDecodedSchema } from "@/lib/zodSchema";
import { NextRequest, NextResponse } from "next/server";
import { Car } from "@/lib/types";
import { z } from "zod";
import { fetchFromRapidAPI } from "@/lib/fetchFromRapidApi";

type DecodeData = z.infer<typeof VinDecodedSchema>;
type EngineData = z.infer<typeof EngineResponseSchema>["data"][0];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vin } = body;

    // Fetch data from the endpoint that requires the VIN number
    const decodeResponse = await fetchFromRapidAPI(`vin/${vin}`, {});
    if (!decodeResponse.ok) {
      const errorData = await decodeResponse.json();
      console.error("Error fetching data: ", errorData);
      return NextResponse.json(errorData, { status: 400 });
    }

    const responseDecodeData = await decodeResponse.json();
    const decodeData = {
      year: responseDecodeData.year,
      make: responseDecodeData.make,
      model: responseDecodeData.model,
      trim: responseDecodeData.trim,
      trimDetails:
        responseDecodeData.trims.length > 0
          ? {
              id: responseDecodeData.trims[0].id,
              make_model_id: responseDecodeData.trims[0].make_model_id,
              name: responseDecodeData.trims[0].name,
            }
          : null,
    };

    if (!decodeData.trimDetails) {
      const model = decodeData.make;
      const make = `${decodeData.model}`;
      const year = decodeData.year;

      const initialCarData: Car = {
        vin: vin,
        model: make || "",
        make: model || "",
        description: "",
        price: 0,
        milage: 0,
        year: year || 0,
        engine: "No info please enter manually",
        drivetrain: "No info please enter manually",
        transmission: "No info please enter manually",
        mpg: "No info please enter manually",
        exteriorInterior: "No info please enter manually",
        imageUrls: [],
      };

      return NextResponse.json(initialCarData, { status: 200 });
    }
    const trimId = decodeData.trimDetails?.id;

    // Fetch data from other endpoints using the trimId
    const engineResponse = await fetchFromRapidAPI(
      `engines?verbose=yes&make_model_trim_id=${trimId}&direction=asc&sort=id`,
      {}
    );
    if (!decodeResponse.ok) {
      const errorText = await decodeResponse.text();
      throw new Error(
        `HTTP error! status: ${decodeResponse.status}, message: ${errorText}`
      );
    }

    const responseEngineData = await engineResponse.json();
    const engineDataArray = responseEngineData.data.map(
      (engine: EngineData) => ({
        id: engine.id,
        make_model_trim_id: engine.make_model_trim_id,
        engine_type: engine.engine_type,
        fuel_type: engine.fuel_type,
        cylinders: engine.cylinders,
        size: engine.size,
        horsepower_hp: engine.horsepower_hp,
        horsepower_rpm: engine.horsepower_rpm,
        torque_ft_lbs: engine.torque_ft_lbs,
        torque_rpm: engine.torque_rpm,
        valves: engine.valves,
        valve_timing: engine.valve_timing,
        cam_type: engine.cam_type,
        drive_type: engine.drive_type,
        transmission: engine.transmission,
      })
    );

    const engineData = engineDataArray[0];

    const model = decodeData.make;
    const make = `${decodeData.trimDetails?.name} ${decodeData.model}`;
    const year = decodeData.year;
    const engine =
      `${engineData.size}L ${engineData.cylinders} ${engineData.engine_type}, ${engineData.horsepower_hp}hp ${engineData.torque_ft_lbs}ft-lbs` ||
      "";
    const drivetrain = engineData.drive_type || "";
    const transmission = engineData.transmission || "";

    const initialCarData: Car = {
      vin: vin,
      model: make || "",
      make: model || "",
      description: "",
      price: 0,
      milage: 0,
      year: year || 0,
      engine: engine,
      drivetrain: drivetrain,
      transmission: transmission,
      mpg: "",
      exteriorInterior: "",
      imageUrls: [],
    };

    return NextResponse.json(initialCarData, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
  }
}
