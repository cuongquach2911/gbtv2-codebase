import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    birthday: Joi.number().optional(),
    bio: Joi.string().optional(),
    active: Joi.boolean().default(true),
    createdAt: Joi.number().optional(),
    modifiedAt: Joi.number().optional()
});
