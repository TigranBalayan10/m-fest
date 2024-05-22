import { VinDecodedSchema, EngineResponseSchema, MilageResponseSchema } from "@/lib/zodSchema";
import { z } from "zod";
import { externalFetcher } from "./ExternalFetcher";
import useSWR from "swr";
import exp from "constants";

type DecodeData = z.infer<typeof VinDecodedSchema>;
type EngineData = z.infer<typeof EngineResponseSchema>;
type MilageData = z.infer<typeof MilageResponseSchema>;

const useVinData = (vin: string) => {
  const { data: decodeData, error: decodeError } = useSWR<DecodeData>(
    vin ? `https://car-api2.p.rapidapi.com/api/vin/${vin}` : null,
    externalFetcher
  );

  const trimId = decodeData?.trims[0]?.id;

  const { data: engineData, error: engineError } = useSWR<EngineData>(
    trimId ? `https://car-api2.p.rapidapi.com/api/engines?verbose=yes&make_model_trim_id=${trimId}&direction=asc&sort=id` : null,
    externalFetcher
  );

  const { data: milageData, error: milageError } = useSWR<MilageData>(
    trimId ? `https://car-api2.p.rapidapi.com/api/mileages?verbose=yes&make_model_trim_id=${trimId}&direction=asc&sort=id` : null,
    externalFetcher
  );


  const error = decodeError || engineError || milageError;

  return { decodeData, engineData, milageData, error };
};

export default useVinData;
