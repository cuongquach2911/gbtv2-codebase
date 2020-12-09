import Joi, { number } from "joi";
import { homedir } from "os";
import { ScopeEnum } from "../../../configs/scope.enum";

export const roleSchema = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string(),
    scopes: Joi.array().items(Joi.string().valid(...Object.keys(ScopeEnum))),
    active: Joi.boolean().default(true)
});
