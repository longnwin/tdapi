import { Currency, Exchange } from "./generics.types";

export type AssetType =
  | "EQUITY"
  | "OPTION"
  | "INDEX"
  | "MUTUAL_FUND"
  | "CASH_EQUIVALENT"
  | "FIXED_INCOME"
  | "CURRENCY"
  | "FUTURE"
  | "FUTURE_OPTION"
  | "INDICATOR"
  | "BOND"
  | "ETF"
  | "FOREX"
  | "UNKNOWN";

export type CashEquivalentType = "SAVINGS" | "MONEY_MARKET_FUND";
export type OptionType = "VANILLA" | "BINARY" | "BARRIER";
export type MutualFundType =
  | "NOT_APPLICABLE"
  | "OPEN_END_NON_TAXABLE"
  | "OPEN_END_TAXABLE"
  | "NO_LOAD_NON_TAXABLE"
  | "NO_LOAD_TAXABLE";
export type PutCall = "PUT" | "CALL";

export const InstrumentProjectionMap = {
  "symbol-search": "symbol-search",
  "symbol-regex": "symbol-regex",
  "desc-search": "desc-search",
  "desc-regex": "desc-regex",
  fundamental: "fundamental",
} as const;
export type InstrumentProjectionType = typeof InstrumentProjectionMap[keyof typeof InstrumentProjectionMap];

interface Instrument {
  assetType: AssetType;
  symbol: string;
  cusip?: string;
  description?: string;
  exchange?: Exchange;
}

export type Equity = Instrument;

export interface FixedIncome extends Instrument {
  maturityDate: string;
  variableRate: number;
  factor: number;
}

export interface MutualFund extends Instrument {
  type: MutualFundType;
}

export interface CashEquivalent extends Instrument {
  type: CashEquivalentType;
}

export interface Bond extends Instrument {
  bondPrice: number;
}

export interface OptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  currencyType: Currency;
  assetType: AssetType;
}
export interface OptionInstrument extends Instrument {
  type: OptionType;
  putCall: PutCall;
  underlyingSymbol: string;
  optionMultiplier: number;
  optionDeliverables: OptionDeliverable[];
}

export interface FundalmentalData {
  symbol: string;
  high52: number;
  low52: number;
  dividendAmount: number;
  dividendYield: number;
  dividendDate: string;
  peRatio: number;
  pegRatio: number;
  pbRatio: number;
  prRatio: number;
  pcfRatio: number;
  grossMarginTTM: number;
  grossMarginMRQ: number;
  netProfitMarginTTM: number;
  netProfitMarginMRQ: number;
  operatingMarginTTM: number;
  operatingMarginMRQ: number;
  returnOnEquity: number;
  returnOnAssets: number;
  returnOnInvestment: number;
  quickRatio: number;
  currentRatio: number;
  interestCoverage: number;
  totalDebtToCapital: number;
  ltDebtToEquity: number;
  totalDebtToEquity: number;
  epsTTM: number;
  epsChangePercentTTM: number;
  epsChangeYear: number;
  epsChange: number;
  revChangeYear: number;
  revChangeTTM: number;
  revChangeIn: number;
  sharesOutstanding: number;
  marketCapFloat: number;
  marketCap: number;
  bookValuePerShare: number;
  shortIntToFloat: number;
  shortIntDayToCover: number;
  divGrowthRate3Year: number;
  dividendPayAmount: number;
  dividendPayDate: string;
  beta: number;
  vol1DayAvg: number;
  vol10DayAvg: number;
  vol3MonthAvg: number;
}

export interface Fundamental extends Instrument {
  fundamental: FundalmentalData;
}

export interface SearchInstrumentsRequest {
  symbol: string;
  projection: InstrumentProjectionType;
}

export interface SearchInstrumentsResponse {
  [symbol: string]: Bond | Instrument | Fundamental;
}

export interface GetInstrumentsRequest {
  cusip: string;
}

export type GetInstrumentsReponse = Instrument[];