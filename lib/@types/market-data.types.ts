import { Exchange } from "./generics.types";
import { OptionDeliverable, PutCall } from "./instruments.types";

export const MarketMap = {
  EQUITY: "EQUITY",
  OPTION: "OPTION",
  FUTURE: "FUTURE",
  BOND: "BOND",
  FOREX: "FOREX",
} as const;
export type MarketType = typeof MarketMap[keyof typeof MarketMap];

export const OptionStrategyMap = {
  SINGLE: "SINGLE",
  ANALYTICAL: "ANALYTICAL",
  COVERED: "COVERED",
  VERTICAL: "VERTICAL",
  CALENDAR: "CALENDAR",
  STRANGLE: "STRANGLE",
  STRADDLE: "STRADDLE",
  BUTTERFLY: "BUTTERFLY",
  CONDOR: "CONDOR",
  DIAGONAL: "DIAGONAL",
  COLLAR: "COLLAR",
  ROLL: "ROLL",
} as const;
export type OptionStrategyType = typeof OptionStrategyMap[keyof typeof OptionStrategyMap];

export interface MarketHoursMap {
  [market: string]: MarketHours;
}

export interface MarketHours {
  date: string;
  marketType: MarketType;
  exchange: string;
  category: string;
  product: string;
  productName: string;
  isOpen: boolean;
  sessionHours?: MarketHoursSessionMap;
}

export interface MarketHoursSessionMap {
  [session: string]: MarketHoursSession[];
}

export interface MarketHoursSession {
  start: string;
  end: string;
}

export interface GetMarketHoursRequest {
  apikey: string;
  date?: string;
  market: MarketType;
}

export interface GetMultipleMarketHoursRequest
  extends Omit<GetMarketHoursRequest, "market"> {
  markets: MarketType[];
}

export interface GetMarketHoursResponse {
  [market: string]: MarketHoursMap;
}

export interface GetOptionChainRequest {
  apikey: string;
  symbol: string;
  contractType?: PutCall | "ALL";
  strikeCount?: number;
  includeQuotes?: "TRUE" | "FALSE";
  strategy?: OptionStrategyType;
  interval?: string;
  strike?: number;
  range?: "ITM" | "NTM" | "OTM" | "SAK" | "SBK" | "SNK" | "ALL";
  fromDate?: string;
  toDate?: string;
  volatility?: string;
  underlyingPrice?: string;
  interestRate?: string;
  daysToExpiration?: number;
  expMonth?:
    | "JAN"
    | "FEB"
    | "MAR"
    | "APR"
    | "JUN"
    | "JUL"
    | "AUG"
    | "OCT"
    | "SEP"
    | "OCT"
    | "NOV"
    | "DEC";
  optionType?: "S" | "NS" | "ALL";
}

export interface OptionChainResponse {
  symbol: string;
  status: string;
  underlying: OptionChainUnderlying;
  strategy: OptionStrategyType;
  interval: number;
  isDelayed: boolean;
  isIndex: boolean;
  daysToExpiration: number;
  interestRate: number;
  underlyingPrice: number;
  volatility: number;
  callExpDateMap: OptionExpirationDateMap;
  putExpDateMap: OptionExpirationDateMap;
}

interface OptionChainUnderlying {
  ask: number;
  askSize: number;
  bid: number;
  bidSize: number;
  change: number;
  close: number;
  delayed: boolean;
  description: string;
  exchangeName: Exchange;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  highPrice: number;
  last: number;
  lowPrice: number;
  mark: number;
  markChange: number;
  markPercentChange: number;
  openPrice: number;
  percentChange: number;
  quoteTime: number;
  symbol: string;
  totalVolume: number;
  tradeTime: number;
}

interface Option {
  putCall: PutCall;
  symbol: string;
  description: string;
  exchangeName: Exchange;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  markPrice: number;
  bidSize: number;
  askSize: number;
  lastSize: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  totalVolume: number;
  quoteTimeInLong: number;
  tradeTimeInLong: number;
  netChange: number;
  volatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  timeValue: number;
  openInterest: number;
  isInTheMoney: boolean;
  theoreticalOptionValue: number;
  theoreticalVolatility: number;
  isMini: boolean;
  isNonStandard: boolean;
  optionDeliverablesList: OptionDeliverable[];
  strikePrice: number;
  expirationDate: string;
  expirationType: string;
  multiplier: number;
  settlementType: string;
  deliverableNote: string;
  isIndexOption: boolean;
  percentChange: number;
  markChange: number;
  markPercentChange: number;
}

interface OptionExpirationDateMap {
  [date: string]: OptionStrikeMap;
}

interface OptionStrikeMap {
  [strike: string]: Option[];
}
