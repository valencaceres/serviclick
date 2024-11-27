import joi from "joi";

export const getById = joi.object({
  id: joi.string().uuid().required(),
});

export const getByRut = joi.object({
  rut: joi.string().required(),
});

export const upsert = joi.object({
  leadId: joi.string().uuid().required(),
  beneficiaryId: joi.string().uuid().allow(null),
  assistanceId: joi.string().uuid().required(),
  eventDescription: joi.string().required(),
  scheduledDateFrom: joi.string().required(),
  scheduledDateTo: joi.string().required(),
  scheduledTimeFrom: joi.string().required(),
  scheduledTimeTo: joi.string().required(),
  id: joi.string().uuid().required().allow(null),
});
