/**
 * Methods for interacting with the Saved Orders endpoints of the Accounts API
 * 
 * @see https://developer.tdameritrade.com/account-access/apis
 */

/**
 * Save an order for a specific account.
 */
export const createSavedOrder = () => {
    
};

/**
 * Delete a specific saved order for a specific account.
 */
export const deleteSavedOrder = () => {

};

/**
 * Specific saved order by its ID, for a specific account.
 */
export const getSavedOrder = () => {

};

/**
 * Saved orders for a specific account.
 */
export const getSavedOrderByPath = () => {

};

/**
 * Alias for getSavedOrderByPath
 */
export const getSavedOrderByAccount = () => {
    return getSavedOrderByPath();
};

/**
 * Replace an existing saved order for an account. The existing saved order will be replaced by the new order.
 */
export const replaceSavedOrder = () => {

};