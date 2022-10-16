import qs from "qs";
import { GetAccountRequestSchema } from "~/@schemas/accounts.schema";
import { GetAccessTokenSchema } from "~/@schemas/authentication.schema";
import { GetAccessTokenRequest, GetAccessTokenResponse } from "~/@types/authentication.types";
import {
  ClientState,
  GetAccountRequest,
  GetAccountResponse,
  GetAccountsResponse,
  Order,
} from "..";
import { TDReadOnlyApiV1 } from "./client.v1.readonly";

export class TDApiV1 extends TDReadOnlyApiV1 {
  protected ACCOUNTS_PATH = "/v1/accounts";
  private _ready: Promise<boolean>;
  constructor(state: ClientState) {
    super(state);
    this._ready = this.initAuthorization();
    this.httpClient.interceptors.request.use((config) => {
      if (config.headers && state.authorization?.authorized) {
        config.headers.Authorization = `Bearer ${state.authorization.accessToken}`;
      }

      return config;
    });
  }

  ready = (): Promise<boolean> => this._ready;

  // Authentication API
  // @see https://developer.tdameritrade.com/authentication/apis
  /**
   * The token endpoint returns an access token along with an optional refresh token.
   */
   postAccessToken = async (
    params: GetAccessTokenRequest
  ): Promise<GetAccessTokenResponse> => {
    try {
      GetAccessTokenSchema.parse(params);
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

  // Accounts and Trading API
  // @see https://developer.tdameritrade.com/account-access/apis
  /**
   * Account balances, positions, and orders for a specific account.
   */
  getAccount = async (
    params: GetAccountRequest
  ): Promise<GetAccountResponse> => {
    try {
      await this.checkClientReady();
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
      await this.checkClientReady();
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

  // private functions
  private initAuthorization = async () => {
    if (this.state.refreshToken) {
      const { access_token, expires_in } = await this.postAccessToken({
        grant_type: "refresh_token",
        refresh_token: this.state.refreshToken,
        client_id: this.state.clientId,
      });

      this.state.authorization = {
        authorized: expires_in > 0,
        expiresIn: expires_in,
        accessToken: access_token,
      };

      return true;
    }

    return false;
  };

  private checkClientReady = async () => {
    if (!(await this.ready())) {
      throw new Error("Client isn't ready!");
    }
  }
}
