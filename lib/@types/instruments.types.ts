import { Currency } from "./generics.types";

export type AssetType =
  | "EQUITY"
  | "OPTION"
  | "INDEX"
  | "MUTUAL_FUND"
  | "CASH_EQUIVALENT"
  | "FIXED_INCOME"
  | "CURRENCY";
export type CashEquivalentType = "SAVINGS" | "MONEY_MARKET_FUND";
export type OptionType = "VANILLA" | "BINARY" | "BARRIER";
export type MutualFundType =
  | "NOT_APPLICABLE"
  | "OPEN_END_NON_TAXABLE"
  | "OPEN_END_TAXABLE"
  | "NO_LOAD_NON_TAXABLE"
  | "NO_LOAD_TAXABLE";
export type PutCall = "PUT" | "CALL";

interface Instrument {
  assetType: AssetType;
  symbol: string;
  cusip?: string;
  description?: string;
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

export interface OptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  currencyType: Currency;
  assetType: AssetType;
}
export interface Option extends Instrument {
  type: OptionType;
  putCall: PutCall;
  underlyingSymbol: string;
  optionMultiplier: number;
  optionDeliverables: OptionDeliverable[];
}
