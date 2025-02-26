import createLogger from "../util/logger";
import * as Assistance from "../models/assistance";
import * as AssistanceValue from "../models/assistanceValue";
import * as AssistanceSpecialty from "../models/assistanceSpecialty";
import * as AssistanceDocument from "../models/assistanceDocument";
import * as AssistanceBenefit from "../models/assistanceBenefit";
import * as AssistanceExclusion from "../models/assistanceExclusion";
import * as LeadProductValue from "../models/leadProductValue";

import { IFamily } from "../interfaces/family";
import { IValue } from "../interfaces/value";
import { IBenefit } from "../interfaces/benefit";
import { IExclusion } from "../interfaces/exclusion";
import { IAssistance } from "../interfaces/assistance";

const create = async (req: any, res: any) => {
  const {
    id,
    family,
    name,
    description,
    values,
    specialties,
    documents,
    benefits,
    exclusions,
  }: IAssistance = req.body;

  const assistanceResponse = id
    ? await Assistance.updateById(id, family.id, name, description)
    : await Assistance.create(family.id, name, description);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: `assistance/${id ? "updateById" : "create"}`,
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error creating assistance" });
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
    res.status(500).json({ error: "Error deleting values" });
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
      res.status(500).json({ error: "Error creating values" });
      return;
    }
    line_order++;
  }

  const deleteSpecialties = await AssistanceSpecialty.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteSpecialties.success) {
    createLogger.error({
      model: "assistanceSpecialty/deleteByAssistanceId",
      error: deleteSpecialties.error,
    });
    res.status(500).json({ error: "Error deleting specialties" });
    return;
  }

  if (specialties && specialties.length > 0) {
    for (const specialty of specialties) {
      const addSpecialty = await AssistanceSpecialty.create(
        assistance_id,
        specialty.id,
        line_order
      );

      if (!addSpecialty.success) {
        createLogger.error({
          model: "assistanceSpecialty/create",
          error: addSpecialty.error,
        });
        res.status(500).json({ error: "Error creating specialties" });
        return;
      }
    }
  }

  const deleteDocuments = await AssistanceDocument.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteDocuments.success) {
    createLogger.error({
      model: "assistanceDocument/deleteByAssistanceId",
      error: deleteDocuments.error,
    });
    res.status(500).json({ error: "Error deleting documents" });
    return;
  }

  if (documents && documents.length > 0) {
    for (const document of documents) {
      const addDocument = await AssistanceDocument.create(
        assistance_id,
        document.id,
        line_order
      );

      if (!addDocument.success) {
        createLogger.error({
          model: "assistanceDocument/create",
          error: addDocument.error,
        });
        res.status(500).json({ error: "Error creating documents" });
        return;
      }
    }
  }

  const deleteBenefits = await AssistanceBenefit.deleteByAssistanceId(
    assistance_id
  );

  if (!deleteBenefits.success) {
    createLogger.error({
      model: "assistanceBenefit/deleteByAssistanceId",
      error: deleteBenefits.error,
    });
    res.status(500).json({ error: "Error deleting benefits" });
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
      res.status(500).json({ error: "Error creating benefits" });
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
    res.status(500).json({ error: "Error deleting exclusion" });
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
      res.status(500).json({ error: "Error creating exclusions" });
      return;
    }
  }

  createLogger.info({
    controller: "assistance/create",
    message: "OK - Create",
  });

  const responseGet = await functionGetById(assistance_id);

  if (!responseGet.success) {
    res.status(500).json({ error: "Error retrieving asistance" });
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
    res.status(500).json({ error: "error updating asistance" });
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
    res.status(500).json({ error: "error deleting asistance" });
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
    res.status(500).json({ error: "Error retrieving assistances" });
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
    res.status(500).json({ error: "Error retrieving assistance" });
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
    res.status(500).json({ error: "Error retrieving families" });
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
    res.status(500).json({ error: "Error retrieving assistance" });
    return;
  }

  createLogger.info({
    controller: "assistance/getByFamilyId",
    message: "OK",
  });
  res.status(200).json(assistanceResponse.data);
};

const getValues = async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Id is required" });
    return;
  }

  const assistanceResponse = await AssistanceValue.getByAssistanceId(id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistanceValue/getByAssistanceId",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error retrieving assistance value" });
    return;
  }

  createLogger.info({
    controller: "assistance/getValues",
    message: "OK",
  });

  res.status(200).json(assistanceResponse.data);
};

const getValuesById = async (req: any, res: any) => {
  const { insured_id, product_id, assistance_id } = req.params;

  const assistanceResponse = await LeadProductValue.getById(
    insured_id,
    product_id,
    assistance_id
  );

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistanceValue/getByInsuredId",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error retrieving values" });
    return;
  }

  createLogger.info({
    controller: "assistance/getValuesById",
    message: "OK - Values by Id",
  });

  return res.status(200).json(assistanceResponse.data);
};

const getDocumentsById = async (req: any, res: any) => {
  const { id } = req.params;

  const assistanceResponse = await AssistanceDocument.getByAssistanceId(id);

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "assistanceDocument/getByAssistanceId",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: "Error retrieving document" });
    return;
  }

  createLogger.info({
    controller: "assistance/getDocumentsById",
    message: "OK - Documents by Id",
  });

  return res.status(200).json(assistanceResponse.data);
};

const assignValue = async (req: any, res: any) => {
  const { lead_id, product_id, insured_id, value_id, value } = req.body;

  const response = await LeadProductValue.create(
    lead_id,
    product_id,
    insured_id,
    value_id,
    value
  );

  if (!response.success) {
    createLogger.error({
      model: "assistanceValue/assignValue",
      error: response.error,
    });
    res.status(500).json({ error: "error creating lead product value" });
    return;
  }

  createLogger.info({
    controller: "assistance/assignValue",
    message: "OK - Value assigned",
  });

  return res.status(200).json(response.data);
};

export {
  create,
  updateById,
  deleteById,
  getAll,
  getById,
  getFamilies,
  getByFamilyId,
  getValues,
  getValuesById,
  getDocumentsById,
  assignValue,
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
    specialties: [],
    documents: [],
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

  const responseSpecialties = await AssistanceSpecialty.getByAssistanceId(id);

  if (!responseSpecialties.success) {
    createLogger.error({
      model: "assistanceSpecialty/getByAssistanceId",
      error: responseSpecialties.error,
    });
    return { success: false, data: null, error: responseSpecialties.error };
  }

  data.specialties = responseSpecialties.data;

  const responseDocuments = await AssistanceDocument.getByAssistanceId(id);

  if (!responseDocuments.success) {
    createLogger.error({
      model: "assistanceDocument/getByAssistanceId",
      error: responseDocuments.error,
    });
    return { success: false, data: null, error: responseDocuments.error };
  }

  data.documents = responseDocuments.data;

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
