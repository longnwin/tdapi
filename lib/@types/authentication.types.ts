export interface GetAccessTokenRequest {
    grant_type: "refresh_token";
    refresh_token: string;
    client_id: string;
}

export interface GetAccessTokenResponse {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: "Bearer";
}