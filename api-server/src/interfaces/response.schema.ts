import Joi from "joi";

export const responseSchema = Joi.object({
    statusCode: Joi.number(),
    message: Joi.string().optional(),
    data: Joi.object()
});
