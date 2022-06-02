/**
 * Methods for interacting with the Market Data API
 * 
 * @see https://developer.tdameritrade.com/market-hours/apis
 * @see https://developer.tdameritrade.com/movers/apis
 * @see https://developer.tdameritrade.com/option-chains/apis
 * @see https://developer.tdameritrade.com/price-history/apis
 * @see https://developer.tdameritrade.com/quotes/apis
 */
 import * as marketHours from './market-hours';
 import * as movers from './movers';
 import * as optionChains from './option-chains';
 import * as priceHistory from './price-history';
 import * as quotes from './quotes';
 
 export default {
     marketHours,
     movers,
     optionChains,
     priceHistory,
     quotes
 };