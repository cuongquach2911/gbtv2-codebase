import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    birthday: Joi.number().optional(),
    email: Joi.string().email({ tlds: { allow: false } }).max(256),
    phone: Joi.string().optional().max(20),
    bio: Joi.string().optional(),
    isRoot: Joi.string().default(false),
    active: Joi.boolean().default(true),
    createdAt: Joi.number().optional(),
    modifiedAt: Joi.number().optional()
});
