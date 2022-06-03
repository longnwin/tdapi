import { z } from "zod";
import { GetAccountRequest, GetAccountRequestField } from "../@types/accounts.types";

const GetAccountRequestFieldSchema: z.ZodSchema<GetAccountRequestField> = z.union([z.literal("positions"), z.literal("orders")]);
export const GetAccountRequestSchema: z.ZodSchema<GetAccountRequest> = z.object({
    accountId: z.string(),
    fields: z.array(GetAccountRequestFieldSchema).optional()
});