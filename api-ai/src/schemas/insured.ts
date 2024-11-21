import joi from "joi";

export const getByRut = joi.object({
  rut: joi.string().required(),
});
