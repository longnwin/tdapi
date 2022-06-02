/**
 * Methods for interacting with the Orders endpoints of the Accounts API
 * 
 * @see https://developer.tdameritrade.com/account-access/apis
 */


/**
 * Cancel a specific order for a specific account.
 */
export const cancerOrder = () => {

};

/**
 * Get a specific order for a specific account.
 */
export const getOrder = () => {

};

/**
 * Orders for a specific account.
 */
export const getOrdersByPath = () => {

};

/**
 * Alias for getOrdersByPath
 */
export const getOrdersByAccount = () => {
    return getOrdersByPath();
};

/**
 * All orders for a specific account or, if account ID isn't specified, 
 * orders will be returned for all linked accounts.
 */
export const getOrdersByQuery = () => {

};

/**
 * Place an order for a specific account.
 */
export const placeOrder = () => {

};

/**
 * Replace an existing order for an account. The existing order will be replaced by the new order. 
 * Once replaced, the old order will be canceled and a new order will be created.
 */
export const replaceOrder = () => {

};