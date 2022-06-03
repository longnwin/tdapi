import axios, { AxiosInstance } from "axios";
import { TDApiV1 } from "./client.v1";
import { BASE_API_HOST, BASE_API_URL } from "./globals";


export class TDApi {
    protected _v1?;
    protected httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create({
            baseURL: BASE_API_URL,
            headers: {
                "Accept": "*/*",
                "Host": BASE_API_HOST
            },
        });
    }

    public get v1() {
        if (this._v1) return this._v1;

        return this._v1 = new TDApiV1(this.httpClient);
    }
}
