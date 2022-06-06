import { z } from "zod";
import { GetAccessTokenRequest } from "~/@types/authentication.types";

export const GetAccessTokenSchema: z.ZodSchema<GetAccessTokenRequest> = z.object({
    grant_type: z.literal("refresh_token"),
    refresh_token: z.string(),
    client_id: z.string()
});