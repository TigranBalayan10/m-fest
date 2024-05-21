import { VinDecodedSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { externalFetcher } from "./ExternalFetcher";
import useSWR from "swr";

type DecodeData = z.infer<typeof VinDecodedSchema>;

export default async function useFetchVinDecodeData(
  vin: string
): Promise<DecodeData | undefined> {
  try {
    const { data, error } = useSWR(
      vin ? `https://car-api2.p.rapidapi.com/api/vin/${vin}` : null,
      externalFetcher
    );

    if (error) {
      console.error(error);
      return undefined;
    }

    if (!data) {
      return undefined;
    }

    console.log(data, "API response data");

    const result = VinDecodedSchema.parse(data);
    console.log(result, "result");

    const extractedData = VinDecodedSchema.parse(result);
    console.log(extractedData, "extractedData");

    return extractedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
  }
}
