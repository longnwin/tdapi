import { z } from "zod";
import {
  GetMarketHoursRequest,
  GetMultipleMarketHoursRequest,
  GetOptionChainRequest,
  MarketMap,
  MarketType,
  OptionStrategyType,
} from "~/@types/market-data.types";

export const MarketTypeSchema: z.ZodSchema<MarketType> = z.union([
  z.literal("EQUITY"),
  z.literal("OPTION"),
  z.literal("FUTURE"),
  z.literal("BOND"),
  z.literal("FOREX"),
]);

export const OptionStrategySchema: z.ZodSchema<OptionStrategyType> = z.union([
  z.literal("SINGLE"),
  z.literal("ANALYTICAL"),
  z.literal("COVERED"),
  z.literal("VERTICAL"),
  z.literal("CALENDAR"),
  z.literal("STRANGLE"),
  z.literal("STRADDLE"),
  z.literal("BUTTERFLY"),
  z.literal("CONDOR"),
  z.literal("DIAGONAL"),
  z.literal("COLLAR"),
  z.literal("ROLL"),
]);

export const GetMarketHoursSchema: z.ZodSchema<GetMarketHoursRequest> = z.object(
  {
    apikey: z.string(),
    market: MarketTypeSchema,
    date: z.string().optional(),
  }
);

export const GetMultipleMarketHoursSchema: z.ZodSchema<GetMultipleMarketHoursRequest> = z.object(
  {
    apikey: z.string(),
    markets: z.array(MarketTypeSchema),
    date: z.string().optional(),
  }
);

export const GetOptionChainSchema: z.ZodSchema<GetOptionChainRequest> = z.object(
  {
    apikey: z.string(),
    symbol: z.string(),
    contractType: z
      .union([z.literal("CALL"), z.literal("PUT"), z.literal("ALL")])
      .optional(),
    strikeCount: z.number().optional(),
    includeQuotes: z.union([z.literal("TRUE"), z.literal("FALSE")]).optional(),
    strategy: OptionStrategySchema.optional(),
    interval: z.string().optional(),
    strike: z.number().optional(),
    range: z
      .union([
        z.literal("ITM"),
        z.literal("NTM"),
        z.literal("OTM"),
        z.literal("SAK"),
        z.literal("SBK"),
        z.literal("SNK"),
        z.literal("ALL"),
      ])
      .optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    volatility: z.string().optional(),
    underlyingPrice: z.string().optional(),
    interestRate: z.string().optional(),
    daysToExpiration: z.number().optional(),
    expMonth: z
      .union([
        z.literal("JAN"),
        z.literal("FEB"),
        z.literal("MAR"),
        z.literal("APR"),
        z.literal("JUN"),
        z.literal("JUL"),
        z.literal("AUG"),
        z.literal("OCT"),
        z.literal("SEP"),
        z.literal("OCT"),
        z.literal("NOV"),
        z.literal("DEC"),
      ])
      .optional(),
    optionType: z.union([z.literal("S"), z.literal("NS"), z.literal("ALL")]),
  }
);
