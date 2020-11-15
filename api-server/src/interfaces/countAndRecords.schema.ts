import Joi from "joi";
import { join } from "path";

export const countAndRecordsSchema = {
    statusCode: Joi.number(),
    message: Joi.string().optional(),
    data: Joi.object({
        count: Joi.number(),
        rows: Joi.array()
    })
};
