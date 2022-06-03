import { AxiosInstance } from "axios";
import { GetAccountRequestSchema } from "./@schemas/accounts.schema";
import {
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsResponse,
} from "./@types/accounts.types";
import { Order } from "./@types/orders";

export class TDApiV1 {
  protected ACCOUNTS_PATH = "/v1/accounts";
  protected httpClient: AxiosInstance;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  // Accounts and Trading API
  // @see https://developer.tdameritrade.com/account-access/apis
  /**
   * Account balances, positions, and orders for a specific account.
   */
  getAccount = async (
    params: GetAccountRequest
  ): Promise<GetAccountResponse> => {
    try {
      const { accountId, fields } = GetAccountRequestSchema.parse(params);

      let path = `${this.ACCOUNTS_PATH}/${accountId}`;
      if (fields) path += `fields=${fields.join(",")}`;

      const resp = await this.httpClient.get<GetAccountResponse>(path);
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Account balances, positions, and orders for all linked accounts.
   */
  getAccounts = async (): Promise<GetAccountsResponse> => {
    try {
      const resp = await this.httpClient.get<GetAccountsResponse>(
        this.ACCOUNTS_PATH
      );
      return resp.data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * Cancel a specific order for a specific account.
   */
  cancerOrder = () => {};

  /**
   * Get a specific order for a specific account.
   */
  getOrder = () => {};

  /**
   * Orders for a specific account.
   */
  getOrdersByPath = () => {};

  /**
   * Alias for getOrdersByPath
   */
  getOrdersByAccount = () => {
    return this.getOrdersByPath();
  };

  /**
   * All orders for a specific account or, if account ID isn't specified,
   * orders will be returned for all linked accounts.
   */
  getOrdersByQuery = () => {};

  /**
   * Place an order for a specific account.
   */
  placeOrder = (order: Order) => {};

  /**
   * Replace an existing order for an account. The existing order will be replaced by the new order.
   * Once replaced, the old order will be canceled and a new order will be created.
   */
  replaceOrder = () => {};

  /**
   * Save an order for a specific account.
   */
  createSavedOrder = () => {};

  /**
   * Delete a specific saved order for a specific account.
   */
  deleteSavedOrder = () => {};

  /**
   * Specific saved order by its ID, for a specific account.
   */
  getSavedOrder = () => {};

  /**
   * Saved orders for a specific account.
   */
  getSavedOrderByPath = () => {};

  /**
   * Alias for getSavedOrderByPath
   */
  getSavedOrderByAccount = () => {
    return this.getSavedOrderByPath();
  };

  /**
   * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
   */
  replaceSavedOrder = () => {};
  // END Accounts and Trading API

  // Authentication API
  // @see https://developer.tdameritrade.com/authentication/apis
  /**
   * The token endpoint returns an access token along with an optional refresh token.
   */
  postAccessToken = () => {};
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

  // Transaction History API
  // @see https://developer.tdameritrade.com/transaction-history/apis
  /**
   * Transaction for a specific account.
   */
  getTransaction = () => {};

  /**
   * Transactions for a specific account.
   */
  getTransactions = () => {};
  // END Transaction History API

  // User Info and Preferences API
  // @see https://developer.tdameritrade.com/user-principal/apis
  /**
   * Preferences for a specific account.
   */
  getPreferences = () => {};

  /**
   * SubscriptionKey for provided accounts or default accounts.
   */
  getStreamerSubscriptionKeys = () => {};

  /**
   * User Principal details.
   */
  getUserPrincipalDetails = () => {};

  /**
   * Update preferences for a specific account. Please note that the directOptionsRouting
   * and directEquityRouting values cannot be modified via this operation.
   */
  updatePreferences = () => {};
  // END User Info and Preferences API

  // Watchlists API
  // @see https://developer.tdameritrade.com/watchlist/apis
  /**
   * Partially update watchlist for a specific account: change watchlist name,
   * add to the beginning/end of a watchlist, update or delete items in a watchlist.
   * This method does not verify that the symbol or asset type are valid.
   */
  updateWatchlist = () => {};

  /**
   * Create watchlist for specific account.
   * This method does not verify that the symbol or asset type are valid.
   */
  createWatchlist = () => {};

  /**
   * Delete watchlist for a specific account.
   */
  deleteWatchlist = () => {};

  /**
   * Specific watchlist for a specific account.
   */
  getWatchlist = () => {};

  /**
   * All watchlists for all of the user's linked accounts.
   */
  getWatchlistsForMultipleAccounts = () => {};

  /**
   * All watchlists of an account.
   */
  getWatchlistsForSingleAccount = () => {};

  /**
   * Replace watchlist for a specific account.
   * This method does not verify that the symbol or asset type are valid.
   */
  replaceWatchlist = () => {};
  // End Watchlists API
}
