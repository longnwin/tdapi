/**
 * Methods for interacting with the Accounts API
 * 
 * @see https://developer.tdameritrade.com/account-access/apis
 * @see https://developer.tdameritrade.com/user-principal/apis
 * @see https://developer.tdameritrade.com/transaction-history/apis
 * @see https://developer.tdameritrade.com/watchlist/apis
 */

import * as accounts from './accounts';
import * as orders from './orders';
import * as preferences from './preferences';
import * as savedOrders from './saved-orders';
import * as transactionHistory from './transaction-history';
import * as watchlists from './watchlists';

export default {
    accounts,
    orders,
    preferences,
    savedOrders,
    transactionHistory,
    watchlists
};