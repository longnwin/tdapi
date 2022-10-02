import qs from "qs";
import {
  GetInstrumentsSchema,
  SearchInstrumentsSchema,
} from "~/@schemas/instruments.schema";
import {
  GetMarketHoursSchema,
  GetMoversSchema,
  GetMultipleMarketHoursSchema,
  GetOptionChainSchema,
  GetPriceHistorySchema,
} from "~/@schemas/market-data.schema";
import {
  GetMarketHoursRequest,
  GetMarketHoursResponse,
  GetMoversRequest,
  GetMoversResponse,
  GetMultipleMarketHoursRequest,
  GetOptionChainRequest,
  GetPriceHistoryRequest,
  GetPriceHistoryResponse,
  GetOptionChainResponse,
} from "~/@types/market-data.types";
import {
  GetInstrumentsReponse,
  GetInstrumentsRequest,
  SearchInstrumentsRequest,
  SearchInstrumentsResponse,
} from "~/@types/instruments.types";
import { ClientState } from "..";
import { BaseClient } from "~/base";

export abstract class TDReadOnlyApiV1 extends BaseClient {
  protected OAUTH_PATH = "/v1/oauth2";
  protected MARKET_DATA_PATH = "/v1/marketdata";
  protected INSTRUMENTS_PATH = "/v1/instruments";
  protected constructor(state: ClientState) {
    super(state);
  }

  // Instruments API
  // @see https://developer.tdameritrade.com/instruments/apis
  /**
   * Search or retrieve instrument data, including fundamental data.
   */
  searchInstruments = async (
    params: SearchInstrumentsRequest
  ): Promise<SearchInstrumentsResponse> => {
    try {
      SearchInstrumentsSchema.parse(params);
      const resp = await this.httpClient.get<SearchInstrumentsResponse>(
        `${this.INSTRUMENTS_PATH}?${qs.stringify(
          this.withApiKey<SearchInstrumentsRequest>(params)
        )}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Get an instrument by CUSIP.
   */
  getInstruments = async (params: GetInstrumentsRequest) => {
    try {
      const { cusip } = GetInstrumentsSchema.parse(params);
      const resp = await this.httpClient.get<GetInstrumentsReponse>(
        `${this.INSTRUMENTS_PATH}/${cusip}?${qs.stringify(this.withApiKey())}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Instruments API

  // Market Hours API
  // @see https://developer.tdameritrade.com/market-hours/apis
  /**
   * Retrieve market hours for specified markets.
   */
  getHoursForMultipleMarkets = async (
    params: GetMultipleMarketHoursRequest
  ): Promise<GetMarketHoursResponse> => {
    try {
      const { markets, ...query } = GetMultipleMarketHoursSchema.parse(params);
      const resp = await this.httpClient.get<GetMarketHoursResponse>(
        `${this.MARKET_DATA_PATH}/hours?${qs.stringify({
          ...query,
          markets: markets.join(","),
        })}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Retrieve market hours for specified single market.
   */
  getHoursForSingleMarket = async (
    params: GetMarketHoursRequest
  ): Promise<GetMarketHoursResponse> => {
    try {
      const { market, ...query } = GetMarketHoursSchema.parse(params);
      const resp = await this.httpClient.get<GetMarketHoursResponse>(
        `${this.MARKET_DATA_PATH}/${market}/hours?${qs.stringify(
          this.withApiKey<Omit<GetMarketHoursRequest, "market">>(query)
        )}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Market Hours API

  // Movers API
  // @see https://developer.tdameritrade.com/movers/apis
  /**
   * Top 10 (up or down) movers by value or percent for a particular market
   */
  getMovers = async (params: GetMoversRequest): Promise<GetMoversResponse> => {
    try {
      const { index, ...query } = GetMoversSchema.parse(params);
      const resp = await this.httpClient.get<GetMoversResponse>(
        `${this.MARKET_DATA_PATH}/${index}/movers?${qs.stringify(
          this.withApiKey<Omit<GetMoversRequest, "index">>(query)
        )}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Movers API

  // Option Chains API
  // @see https://developer.tdameritrade.com/option-chains/apis
  /**
   * Get option chain for an optionable Symbol
   */
  getOptionChain = async (
    params: GetOptionChainRequest
  ): Promise<GetOptionChainResponse> => {
    try {
      GetOptionChainSchema.parse(params);
      const resp = await this.httpClient.get<GetOptionChainResponse>(
        `${this.MARKET_DATA_PATH}/chains?${qs.stringify(
          this.withApiKey<GetOptionChainRequest>(params)
        )}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Option Chains API

  // Price History API
  // @see https://developer.tdameritrade.com/price-history/apis
  /**
   * Get price history for a symbol
   */
  getPriceHistory = async (
    params: GetPriceHistoryRequest
  ): Promise<GetPriceHistoryResponse> => {
    try {
      const { symbol, ...query } = GetPriceHistorySchema.parse(params);
      const resp = await this.httpClient.get<GetPriceHistoryResponse>(
        `${this.MARKET_DATA_PATH}/${symbol}/pricehistory?${qs.stringify(
          this.withApiKey<Omit<GetPriceHistoryRequest, "symbol">>(query)
        )}`
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Price History API

  // Quotes API
  // @see https://developer.tdameritrade.com/quotes/apis
  /**
   * Get quote for a symbol
   */
  getQuote = () => {};

  /**
   * Get quote for one or more symbols
   */
  getQuotes = () => {};
  // END Quotes API
}
