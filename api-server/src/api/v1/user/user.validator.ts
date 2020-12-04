import Joi from "joi";
import { ScopeEnum } from "../../../configs/scope.enum";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    birthday: Joi.number().optional(),
    email: Joi.string().email({ tlds: { allow: false } }).max(256),
    phone: Joi.string().optional().max(20),
    bio: Joi.string().optional(),
    scopes: Joi.array().items().valid({ ...Object.values(ScopeEnum) }).optional(),
    isRoot: Joi.boolean().default(false),
    active: Joi.boolean().default(true),
    createdAt: Joi.number().optional(),
    modifiedAt: Joi.number().optional()
});
