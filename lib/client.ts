import { ClientConfig, ClientState } from "./@types/client.types";
import { TDApiV1 } from "./v1/client.v1";

export class TDApi {
  protected v1: TDApiV1;
  protected state!: ClientState;

  constructor(config: ClientConfig) {
    this.initClientState(config);
    this.v1 = new TDApiV1(this.state)
  }

  // PRIVATE FUNCTIONS
  private initClientState = async (config: ClientConfig) => {
    const tempState: Partial<ClientState> = {};

    //  Verify a client ID is provided
    if (config.clientId) tempState.clientId = config.clientId;
    else if (process.env.TD_CLIENT_ID)
      tempState.clientId = process.env.TD_CLIENT_ID;
    else throw new Error("No Client ID configured");

    if (config.refreshToken) tempState.refreshToken = config.refreshToken;
    else if (process.env.TD_REFRESH_TOKEN)
      tempState.refreshToken = process.env.TD_REFRESH_TOKEN;

    this.state = tempState as ClientState;
  };
}
