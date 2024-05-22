import {
  VinDecodedSchema,
  EngineResponseSchema,
  MilageResponseSchema,
} from "@/lib/zodSchema";
import { z } from "zod";
import { externalFetcher } from "./ExternalFetcher";
import useSWR from "swr";

type DecodeData = z.infer<typeof VinDecodedSchema>;
type EngineData = z.infer<typeof EngineResponseSchema>["data"][0];
type MilageData = z.infer<typeof MilageResponseSchema>["data"][0];

const useVinData = (vin: string) => {
  const { data: decodeResponse, error: decodeError } = useSWR<DecodeData>(
    vin ? `https://car-api2.p.rapidapi.com/api/vin/${vin}` : null,
    externalFetcher
  );

  const decodeData = decodeResponse
    ? VinDecodedSchema.parse(decodeResponse)
    : undefined;
  const trimId = decodeData?.trims[0]?.id;

  const { data: engineResponse, error: engineError } = useSWR<EngineData>(
    trimId
      ? `https://car-api2.p.rapidapi.com/api/engines?verbose=yes&make_model_trim_id=${trimId}&direction=asc&sort=id`
      : null,
    externalFetcher
  );

  const engineData = engineResponse
    ? EngineResponseSchema.parse(engineResponse).data[0]
    : undefined;

  const { data: milageResponse, error: milageError } = useSWR<MilageData>(
    trimId
      ? `https://car-api2.p.rapidapi.com/api/mileages?verbose=yes&make_model_trim_id=${trimId}&direction=asc&sort=id`
      : null,
    externalFetcher
  );

  const milageData = milageResponse
    ? MilageResponseSchema.parse(milageResponse).data[0]
    : undefined;

  const error = decodeError || engineError || milageError;

  return { decodeData, engineData, milageData, error };
};

export default useVinData;
