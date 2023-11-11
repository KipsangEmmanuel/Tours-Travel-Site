import Joi from 'joi'

export const validateRegisterUser = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().pattern(
        new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        )
    )
})


export const validateLoginUser = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});