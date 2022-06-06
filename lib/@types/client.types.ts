import { AxiosInstance } from "axios";

export interface ClientConfig {
    clientId?: string;
    refreshToken?: string;
}

export interface ClientAuth {
    authorized: boolean;
    expiresIn: number;
    accessToken: string;
}
export interface ClientState {
    clientId: string;
    refreshToken: string;
    authorization: ClientAuth;
}