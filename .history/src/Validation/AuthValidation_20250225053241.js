
import Joi from "joi";


export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword:Joi.string().min(6).valid(Joi.ref('password')).required().messages({
            "any.only": "Passwords do not match",
        }),
        isAdmin: Joi.boolean().default(false),
    });
    return schema.validate(data);
};

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};