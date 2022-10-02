import axios, { AxiosInstance } from "axios";
import { ClientState } from "./@types/client.types";
import { BASE_API_HOST, BASE_API_URL } from "./globals";

export abstract class BaseClient {
  protected httpClient: AxiosInstance;
  protected state: ClientState;
  protected constructor(state: ClientState) {
    this.state = state;
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

  withApiKey = <T>(params?: T): T & { apiKey: string } => {
    const attrs = (params ? params : {}) as T;
    return {
      apiKey: this.state.clientId,
      ...attrs,
    };
  };
}
