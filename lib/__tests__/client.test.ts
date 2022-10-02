import { AxiosError } from "axios";
import { TDApi } from "~/client";

describe("Initializing a TDApi Client", () => {
  describe("with a valid config object", () => {
    it("should return a TDApi instance", async () => {
      const client = new TDApi({
        clientId: process.env.TD_CLIENT_ID,
        refreshToken: process.env.TD_REFRESH_TOKEN,
      });

      expect(client.constructor.name).toEqual(TDApi.name);
      expect(await client.v1.ready()).toBeTruthy();
    });
  });

  describe("with an invalid config object", () => {
    describe("no client ID", () => {
      const clientId = process.env.TD_CLIENT_ID;
      beforeAll(() => {
        delete process.env.TD_CLIENT_ID;
      });

      afterAll(() => {
        process.env.TD_CLIENT_ID = clientId;
      });

      it("should throw an error", () => {
        expect(() => {
          new TDApi({
            refreshToken: process.env.TD_REFRESH_TOKEN,
          });
        }).toThrowError("No Client ID configured");
      });
    });

    describe("invalid client ID", () => {
      let error: AxiosError;
      beforeAll(async () => {
        try {
          const client = new TDApi({
            clientId: "not a valid client ID",
            refreshToken: process.env.TD_REFRESH_TOKEN,
          });
          await client.v1.ready();
        } catch (err) {
          error = err as AxiosError;
        }
      });

      it("should throw a 401 error", () => {
        expect(error.response!.status).toEqual(401);
      });
    });

    describe("invalid refresh token", () => {
      let error: AxiosError;
      beforeAll(async () => {
        try {
          const client = new TDApi({
            clientId: process.env.TD_CLIENT_ID,
            refreshToken: "invalid",
          });
          await client.v1.ready();
        } catch (err) {
          error = err as AxiosError;
        }
      });

      it("should throw a 400 error", () => {
        expect(error.response!.status).toEqual(400);
      });
    });
  });
});
