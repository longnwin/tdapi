import { ClientConfig, ClientState } from "./@types/client.types";
import { TDApiV1 } from "./v1/client.v1";

export class TDApi {
  public v1: TDApiV1;
  protected state!: ClientState;

  constructor(config: ClientConfig) {
    this.initClientState(config);
    this.v1 = new TDApiV1(this.state);
  }

  // PRIVATE FUNCTIONS
  private initClientState = (config: ClientConfig) => {
    const state: ClientState = {} as ClientState;

    //  Verify a client ID is provided
    if (config.clientId) {
      state.clientId = config.clientId;
    } else if (process.env.TD_CLIENT_ID) {
      state.clientId = process.env.TD_CLIENT_ID;
    } else {
      throw new Error("No Client ID configured");
    }

    if (config.refreshToken) {
      state.refreshToken = config.refreshToken;
    } else if (process.env.TD_REFRESH_TOKEN) {
      state.refreshToken = process.env.TD_REFRESH_TOKEN;
    }

    this.state = state;
  };
}
