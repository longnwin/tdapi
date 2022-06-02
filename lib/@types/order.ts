export type Session = "NORMAL" | "AM" | "PM" | "SEAMLESS";
export type Duration = "DAY" | "GOOD_TILL_CANCEl" | "FILL_OR_KILL";
export type OrderType =
  | "MARKET"
  | "LIMIT"
  | "STOP"
  | "STOP_LIMIT"
  | "TRAILING_STOP"
  | "MARKET_ON_CLOSE"
  | "EXERCISE"
  | "TRAILING_STOP_LIMIT"
  | "NET_DEBIT"
  | "NET_CREDIT"
  | "NET_ZERO";
export type ComplexOrderStrategyType =
  | "NONE"
  | "COVERED"
  | "VERTICAL"
  | "BACK_RATIO"
  | "CALENDAR"
  | "DIAGONAL"
  | "STRADDLE"
  | "STRANGLE"
  | "COLLAR_SYNTHETIC"
  | "BUTTERFLY"
  | "CONDOR"
  | "IRON_CONDOR"
  | "VERTICAL_ROLL"
  | "COLLAR_WITH_STOCK"
  | "DOUBLE_DIAGONAL"
  | "UNBALANCED_BUTTERFLY"
  | "UNBALANCED_CONDOR"
  | "UNBALANCED_IRON_CONDOR"
  | "UNBALANCED_VERTICAL_ROLL"
  | "CUSTOM";
export type RequestedDestination =
  | "INET"
  | "ECN_ARCA"
  | "CBOE"
  | "AMEX"
  | "PHLX"
  | "ISE"
  | "BOX"
  | "NYSE"
  | "NASDAQ"
  | "BATS"
  | "C2"
  | "AUTO";
export type PriceLinkBasis =
  | "MANUAL"
  | "BASE"
  | "TRIGGER"
  | "LAST"
  | "BID"
  | "ASK"
  | "ASK_BID"
  | "MARK"
  | "AVERAGE";
export type PriceLinkType = "VALUE" | "PERCENT" | "TICK";
export type StopPrice = "STANDARD" | "BID" | "ASK" | "LAST" | "MARK";
export type TaxLotMethod =
  | "FIFO"
  | "LIFO"
  | "HIGH_COST"
  | "LOW_COST"
  | "AVERAGE_COST"
  | "SPECIFIC_LOT";
export type AssetType =
  | "EQUITY"
  | "OPTION"
  | "INDEX"
  | "MUTUAL_FUND"
  | "CASH_EQUIVALENT"
  | "FIXED_INCOME"
  | "CURRENCY";
export type Instruction =
  | "BUY"
  | "SELL"
  | "BUY_TO_COVER"
  | "SELL_SHORT"
  | "BUY_TO_OPEN"
  | "BUY_TO_CLOSE"
  | "SELL_TO_OPEN"
  | "SELL_TO_CLOSE"
  | "EXCHANGE";
export type PositionEffect = "OPENING" | "CLOSING" | "AUTOMATIC";
export type QuantityType = "ALL_SHARES" | "DOLLARS" | "SHARES";
export type SpecialInstruction =
  | "ALL_OR_NONE"
  | "DO_NOT_REDUCE"
  | "ALL_OR_NONE_DO_NOT_REDUCE";
export type OrderStrategyType = "SINGLE" | "OCO" | "TRIGGER";
export type OrderStatus =
  | "AWAITING_PARENT_ORDER"
  | "AWAITING_CONDITION"
  | "AWAITING_MANUAL_REVIEW"
  | "ACCEPTED"
  | "AWAITING_UR_OUT"
  | "PENDING_ACTIVATION"
  | "QUEUED"
  | "WORKING"
  | "REJECTED"
  | "PENDING_CANCEL"
  | "CANCELED"
  | "PENDING_REPLACE"
  | "REPLACED"
  | "FILLED"
  | "EXPIRED";
export type ActivityType = "EXECUTION" | "ORDER_ACTION";
export type CashEquivalentType = "SAVINGS" | "MONEY_MARKET_FUND";
export type OptionType = "VANILLA" | "BINARY" | "BARRIER";
export type PutCall = "PUT" | "CALL";
export type Currency = "USD" | "CAD" | "EUR" | "JPY";
export type ExecutionType = "FILL";
export type MutualFundType =
  | "NOT_APPLICABLE"
  | "OPEN_END_NON_TAXABLE"
  | "OPEN_END_TAXABLE"
  | "NO_LOAD_NON_TAXABLE"
  | "NO_LOAD_TAXABLE";

interface CancelTime {
  date: string;
  shortFormat: boolean;
}

interface Instrument {
  assetType: AssetType;
  cusip: string;
  symbol: string;
  description: string;
}

interface OrderLeg {
  orderLegType: AssetType;
  legId: number;
  instrument: Instrument;
  instruction: Instruction;
  positionEffect: PositionEffect;
  quantiy: number;
  quantityType: QuantityType;
}

interface OrderActivity {
  activityType: ActivityType;
}

interface Equity {
  assetType: AssetType;
  cusip: string;
  symbol: string;
  description: string;
}

interface FixedIncome extends Instrument {
  maturityDate: string;
  variableRate: number;
  factor: number;
}

interface MutualFund extends Instrument {
  type: MutualFundType;
}

interface CashEquivalent extends Instrument {
  type: CashEquivalentType;
}

interface OptionDeliverable {
  symbol: string;
  deliverableUnits: number;
  currencyType: Currency;
  assetType: AssetType;
}
interface Option extends Instrument {
  type: OptionType;
  putCall: PutCall;
  underlyingSymbol: string;
  optionMultiplier: number;
  optionDeliverables: OptionDeliverable[];
}

interface ExecutionLeg {
  legId: number;
  quantity: number;
  mismarkedQuantity: number;
  price: number;
  time: string;
}
interface Execution extends OrderActivity {
  executionType: ExecutionType;
  quantity: number;
  orderRemainingQuantity: number;
  executionLegs: ExecutionLeg;
}

export interface Order {
  session: Session;
  duration: Duration;
  orderType: OrderType;
  cancelTime: CancelTime;
  complexOrderStrategyType: ComplexOrderStrategyType;
  quantity: number;
  filledQuantity: number;
  remainingQuantity: number;
  requestedDestination: RequestedDestination;
  destinationLinkName: string;
  releaseTime: string;
  stopPrice: string;
  stopPriceLinkBasis: PriceLinkBasis;
  stopPriceLinkType: PriceLinkType;
  stopPriceOffset: number;
  stopType: StopPrice;
  priceLinkBasic: PriceLinkBasis;
  priceLinkType: PriceLinkType;
  price: number;
  taxLotMethod: TaxLotMethod;
  orderLegCollection: OrderLeg[];
  activationPrice: number;
  specialInstruction: SpecialInstruction;
  orderStrategyType: OrderStrategyType;
  orderId: number;
  cancelable: boolean;
  editable: boolean;
  status: OrderStatus;
  enteredTime: string;
  closeTime: string;
  accountId: number;
  orderActivityCollection: OrderActivity[];
  replacingOrderCollection: Order[];
  childOrderStrategies: Order[];
  statusDescription: string;
}
