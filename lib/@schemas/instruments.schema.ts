import { z } from "zod";
import {
  SearchInstrumentsRequest,
  GetInstrumentsRequest,
} from "~/@types/instruments.types";

export const InstrumentProjectionSchema = z.union([
  z.literal("symbol-search"),
  z.literal("symbol-regex"),
  z.literal("desc-search"),
  z.literal("desc-regex"),
  z.literal("fundamental"),
]);

export const SearchInstrumentsSchema: z.ZodSchema<SearchInstrumentsRequest> = z.object(
  {
    apiKey: z.string(),
    symbol: z.string(),
    projection: InstrumentProjectionSchema,
  }
);

export const GetInstrumentsSchema: z.ZodSchema<GetInstrumentsRequest> = z.object({
  apiKey: z.string(),
  cusip: z.string(),
});
