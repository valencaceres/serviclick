import createLogger from "../util/logger";

import * as Case from "../models/case";
import * as CaseStage from "../models/caseStage";
import * as Person from "../models/person";

const create = async (req: any, res: any) => {
  const {
    applicant,
    number,
    product_id,
    assistance_id,
    description,
    stage_id,
    user_id,
  } = req.body;

  if (applicant.type === "C") {
    const applicantResponse = await Person.create(
      applicant.rut,
      applicant.name,
      applicant.paternalLastName,
      applicant.maternalLastName,
      applicant.address,
      applicant.district,
      applicant.email,
      applicant.phone,
      applicant.birthDate
    );

    if (!applicantResponse.success) {
      createLogger.error({
        model: `person/create`,
        error: applicantResponse.error,
      });
      return res.status(500).json({ error: applicantResponse.error });
    }

    applicant.id = applicantResponse.data.id;
  }

  const caseResponse = await Case.create(
    applicant,
    number,
    product_id,
    assistance_id
  );

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/create`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: caseResponse.error });
  }

  const { id: case_id } = caseResponse.data;

  const caseStageResponse = await CaseStage.create(
    case_id,
    stage_id,
    user_id,
    description
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStage/create`,
      error: caseStageResponse.error,
    });
    return res.status(500).json({ error: caseStageResponse.error });
  }

  createLogger.info({
    model: `case/create`,
    message: `Case created successfully`,
  });

  console.log(caseResponse.data);
  return { success: true, data: caseResponse.data, error: null };
};

const getBeneficiaryByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const beneficaryResponse = await Case.getBeneficiaryData(rut);

  if (!beneficaryResponse.success) {
    createLogger.error({
      model: `case/getBeneficiaryData`,
      error: beneficaryResponse.error,
    });
    return res.status(500).json({ error: beneficaryResponse.error });
  }

  if (beneficaryResponse.error === "Beneficiary not found") {
    createLogger.info({
      controller: `case/getBeneficiaryByRut`,
      message: `OK - Beneficiary not found`,
    });
    return res.status(200).json(beneficaryResponse.data);
  }

  createLogger.info({
    controller: `case/getBeneficiaryByRut`,
    message: `OK - Beneficiary found`,
  });
  return res.status(200).json(beneficaryResponse.data);
};

const getCaseById = async (req: any, res: any) => {
  const { id } = req.params;

  const caseResponse = await CaseStage.getById(id);

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getById`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: caseResponse.error });
  }

  if (caseResponse.error === "Case not found") {
    createLogger.info({
      controller: `case/getById`,
      message: `OK - Case not found`,
    });
    return res.status(200).json(caseResponse.data);
  }

  createLogger.info({
    controller: `case/getById`,
    message: `OK - Case found`,
  });

  return res.status(200).json(caseResponse.data);
};

export { create, getBeneficiaryByRut, getCaseById };
