import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { GetAccessTokenSchema } from "~/@schemas/authentication.schema";
import {
  GetAccessTokenRequest,
  GetAccessTokenResponse,
} from "~/@types/authentication.types";
import { BASE_API_HOST, BASE_API_URL } from "~/globals";

export abstract class TDReadOnlyApiV1 {
  protected OAUTH_PATH = "/v1/oauth2";
  protected httpClient: AxiosInstance;
  protected constructor() {
    this.httpClient = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Accept: "*/*",
        Host: BASE_API_HOST,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  // Authentication API
  // @see https://developer.tdameritrade.com/authentication/apis
  /**
   * The token endpoint returns an access token along with an optional refresh token.
   */
  postAccessToken = async (
    params: GetAccessTokenRequest
  ): Promise<GetAccessTokenResponse> => {
    GetAccessTokenSchema.parse(params);
    try {
      const resp = await this.httpClient.post<GetAccessTokenResponse>(
        `${this.OAUTH_PATH}/token`,
        qs.stringify(params)
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };
  // END Authentication API

  // Instruments API
  // @see https://developer.tdameritrade.com/instruments/apis
  /**
   * Search or retrieve instrument data, including fundamental data.
   */
  searchInstruments = () => {};

  /**
   * Get an instrument by CUSIP.
   */
  getInstruments = () => {};
  // END Instruments API

  // Market Hours API
  // @see https://developer.tdameritrade.com/market-hours/apis
  /**
   * Retrieve market hours for specified markets.
   */
  getHoursForMultipleMarkets = () => {};

  /**
   * Retrieve market hours for specified single market.
   */
  getHoursForSingleMarket = () => {};
  // END Market Hours API

  // Movers API
  // @see https://developer.tdameritrade.com/movers/apis
  /**
   * Top 10 (up or down) movers by value or percent for a particular market
   */
  getMovers = () => {};
  // END Movers API

  // Option Chains API
  // @see https://developer.tdameritrade.com/option-chains/apis
  /**
   * Get option chain for an optionable Symbol
   */
  getOptionChain = () => {};
  // END Option Chains API

  // Price History API
  // @see https://developer.tdameritrade.com/price-history/apis
  /**
   * Get price history for a symbol
   */
  getPriceHistory = () => {};
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
