import joi from "joi";

export const upsert = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
});

export const updatePassword = joi.object({
  id: joi.string().uuid().required(),
  password: joi.string().required(),
});

export const validate = joi.object({
  login: joi.string().email().required(),
  password: joi.string().required(),
});
