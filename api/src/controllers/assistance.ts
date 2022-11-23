import createLogger from "../util/logger";
import * as Assistance from "../models/assistance";
import * as AssistanceValue from "../models/assistanceValue";
import * as AssistanceBenefit from "../models/assistanceBenefit";
import * as AssistanceExclusion from "../models/assistanceExclusion";

type FamilyT = {
  id: string;
  name: string;
};

type ValueT = {
  id: string;
  name: string;
};

type BenefitT = {
  id: string;
  description: string;
};

type ExclusionT = {
  id: string;
  description: string;
};

export type AssistanceT = {
  id: string;
  name: string;
  description: string;
  family: FamilyT;
  values: ValueT[];
  benefits: BenefitT[];
  exclusions: ExclusionT[];
};

const create = async (req: any, res: any) => {
  const { id, family, name, description, values, benefits, exclusions } =
    req.body;

  const assistanceResponse = id
    ? await Assistance.updateById(id, family.id, name, description)
    : await Assistance.create(family.id, name, description);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: `assistance/${id ? "updateById" : "create"}`,
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  const { id: assistance_id } = assistanceResponse.data;

  const deleteValues = await AssistanceValue.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteValues.success) {
    createLogger.error({
      model: "assistanceValue/deleteByAssistanceId",
      error: deleteValues.error,
    });
    res.status(500).json({ error: deleteValues.error });
    return;
  }

  let line_order = 1;
  for (const value of values) {
    const addValue = await AssistanceValue.create(
      assistance_id,
      value.id,
      line_order
    );

    if (!addValue.success) {
      createLogger.error({
        model: "assistanceValue/create",
        error: addValue.error,
      });
      res.status(500).json({ error: addValue.error });
      return;
    }
    line_order++;
  }

  const deleteBenefits = await AssistanceBenefit.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteBenefits.success) {
    createLogger.error({
      model: "assistanceBenefit/deleteByAssistanceId",
      error: deleteBenefits.error,
    });
    res.status(500).json({ error: deleteBenefits.error });
    return;
  }

  for (const benefit of benefits) {
    const addBenefit = await AssistanceBenefit.create(
      assistance_id,
      benefit.description
    );

    if (!addBenefit.success) {
      createLogger.error({
        model: "assistanceBenefit/create",
        error: addBenefit.error,
      });
      res.status(500).json({ error: addBenefit.error });
      return;
    }
  }

  const deleteExclusions = await AssistanceExclusion.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteExclusions.success) {
    createLogger.error({
      model: "assistanceExclusion/deleteByAssistanceId",
      error: deleteExclusions.error,
    });
    res.status(500).json({ error: deleteExclusions.error });
    return;
  }

  for (const exclusion of exclusions) {
    const addExclusion = await AssistanceExclusion.create(
      assistance_id,
      exclusion.description
    );

    if (!addExclusion.success) {
      createLogger.error({
        model: "assistanceExclusion/create",
        error: addExclusion.error,
      });
      res.status(500).json({ error: addExclusion.error });
      return;
    }
  }

  createLogger.info({
    controller: "assistance/create",
    message: "OK - Create",
  });

  const responseGet = await functionGetById(assistance_id);

  if (!responseGet.success) {
    res.status(500).json({ error: responseGet.error });
    return;
  }

  res.status(200).json(responseGet.data);
};

const updateById = async (req: any, res: any) => {
  const { id, family_id, name, description } = req.body;

  const assistanceResponse = await Assistance.updateById(
    id,
    family_id,
    name,
    description
  );

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/updateById",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  createLogger.info({
    controller: "assistance/updateById",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const assistanceResponse = await Assistance.deleteById(id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/delete",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  createLogger.info({
    controller: "assistance/delete",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const getAll = async (req: any, res: any) => {
  const assistanceResponse = await Assistance.getAll();

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/getAll",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  createLogger.info({
    controller: "assistance/getAll",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const responseGet = await functionGetById(id);

  if (!responseGet.success) {
    res.status(500).json({ error: responseGet.error });
    return;
  }

  res.status(200).json(responseGet.data);
};

const getFamilies = async (req: any, res: any) => {
  const assistanceResponse = await Assistance.getFamilies();

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/getFamilies",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  createLogger.info({
    controller: "assistance/getFamilies",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const getByFamilyId = async (req: any, res: any) => {
  const { family_id } = req.params;
  const assistanceResponse = await Assistance.getByFamilyId(family_id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/getByFamilyId",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  createLogger.info({
    controller: "assistance/getByFamilyId",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

export {
  create,
  updateById,
  deleteById,
  getAll,
  getById,
  getFamilies,
  getByFamilyId,
};

const functionGetById = async (id: string) => {
  const assistanceResponse = await Assistance.getById(id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistance/getById",
      error: assistanceResponse.error,
    });
    return { success: false, data: null, error: assistanceResponse.error };
  }

  const data = {
    ...assistanceResponse.data,
    values: [],
    benefits: [],
    exclusions: [],
  };

  const responseValues = await AssistanceValue.getByAssistanceId(id);

  if (!responseValues.success) {
    createLogger.error({
      model: "assistanceValue/getByAssistanceId",
      error: responseValues.error,
    });
    return { success: false, data: null, error: responseValues.error };
  }

  data.values = responseValues.data;

  const responseBenefits = await AssistanceBenefit.getByAssistanceId(id);

  if (!responseBenefits.success) {
    createLogger.error({
      model: "assistanceBenefit/getByAssistanceId",
      error: responseBenefits.error,
    });
    return { success: false, data: null, error: responseBenefits.error };
  }

  data.benefits = responseBenefits.data;

  const responseExclusions = await AssistanceExclusion.getByAssistanceId(id);

  if (!responseExclusions.success) {
    createLogger.error({
      model: "assistanceExclusion/getByAssistanceId",
      error: responseExclusions.error,
    });
    return { success: false, data: null, error: responseExclusions.error };
  }

  data.exclusions = responseExclusions.data;

  return { success: true, data, error: null };
};
