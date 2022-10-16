import { TDApi } from "~/client";

describe("withApiKey", () => {
  let client: TDApi;
  beforeAll(async () => {
    client = new TDApi({
      clientId: process.env.TD_CLIENT_ID,
      refreshToken: process.env.TD_REFRESH_TOKEN,
    });

    await client.v1.ready();
  });

  it("should return the passed object with an apiKey attached", () => {
    const testObject = { foo: 0, bar: 1 };

    expect(client.v1.withApiKey(testObject)).toStrictEqual({
      ...testObject,
      apiKey: process.env.TD_CLIENT_ID,
    });
  });

  it("should return an object with an apiKey if no object is passed", () => {
    expect(client.v1.withApiKey()).toStrictEqual({
      apiKey: process.env.TD_CLIENT_ID,
    });
  });
});
