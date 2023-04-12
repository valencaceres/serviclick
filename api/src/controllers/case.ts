import createLogger from "../util/logger";

import * as Case from "../models/case";
import * as CaseStage from "../models/caseStage";
import * as CaseStageAttach from "../models/caseStageAttach";
import * as CaseStagePartner from "../models/caseStagePartner";
import * as CaseStageSpecialist from "../models/caseStageSpecialist";
import * as CaseStageResult from "../models/caseStageResult";
import * as CaseReimbursement from "../models/caseReimbursement";
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
    isactive,
  } = req.body;

  if (applicant?.type === "C") {
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
    assistance_id,
    isactive
  );

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/create`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: caseResponse.error });
  }

  const { id } = caseResponse.data;

  const caseStageResponse = await CaseStage.create(
    id,
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

  return res
    .status(200)
    .json({ success: true, data: caseResponse.data, error: null });
};

const getAll = async (req: any, res: any) => {
  const caseResponse = await Case.getAll();

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getAll`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: caseResponse.error });
  }

  createLogger.info({
    model: `case/getAll`,
    message: `Cases retrieved successfully`,
  });

  return res.status(200).json(caseResponse.data);
};

const uploadDocument = async (req: any, res: any) => {
  const { case_id, casestage_id, document_id } = req.body;
  const files = req.files;

  console.log(files);
  if (!files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const document = document_id[i];

    const fileName = file.originalname;
    const fileBase64 = file.buffer.toString("base64");
    const mimeType = file.mimetype;

    const caseStageAttachResponse = await CaseStageAttach.uploadDocument(
      case_id,
      casestage_id,
      document,
      fileName,
      fileBase64,
      mimeType
    );

    if (!caseStageAttachResponse.success) {
      createLogger.error({
        model: `caseStage/uploadDocument`,
        error: caseStageAttachResponse.error,
      });
      return res.status(500).json({ error: caseStageAttachResponse.error });
    }

    createLogger.info({
      model: `caseStage/uploadDocument`,
      message: `Document uploaded successfully`,
    });
  }

  return res.status(200).json({ success: true, data: null, error: null });
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

const getAttachById = async (req: any, res: any) => {
  const { case_id, casestage_id } = req.params;

  const caseStageAttachResponse = await CaseStageAttach.getById(
    case_id,
    casestage_id
  );

  if (!caseStageAttachResponse.success) {
    createLogger.error({
      model: `caseStage/getAttachById`,
      error: caseStageAttachResponse.error,
    });
    return res.status(500).json({ error: caseStageAttachResponse.error });
  }

  const attachments: any = [];

  for (let i = 0; i < caseStageAttachResponse.data.length; i++) {
    const attachment = caseStageAttachResponse.data[i];

    attachments.push({
      document_id: attachment.document_id,
      file: {
        originalname: attachment.file_name,
        base64: attachment.base64,
        mimetype: attachment.mime_type,
      },
    });
  }

  createLogger.info({
    controller: `case/getAttachById`,
    message: `OK - Attachments found`,
  });

  return res.status(200).json(attachments);
};

const getNewCaseNumber = async (req: any, res: any) => {
  const caseResponse = await Case.getNewCaseNumber();

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getNewCaseNumber`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: caseResponse.error });
  }

  createLogger.info({
    controller: `case/getNewCaseNumber`,
    message: `OK - New case number generated`,
  });

  return res.status(200).json(caseResponse.data);
};

const assignPartner = async (req: any, res: any) => {
  const {
    case_id,
    casestage_id,
    partner_id,
    scheduled_date,
    scheduled_time,
    confirmed_date,
    confirmed_time,
  } = req.body;

  const caseStageResponse = await CaseStagePartner.create(
    case_id,
    casestage_id,
    partner_id,
    scheduled_date,
    scheduled_time,
    confirmed_date,
    confirmed_time
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStagePartner/assignPartner`,
      error: caseStageResponse.error,
    });
    return res.status(500).json({ error: caseStageResponse.error });
  }

  createLogger.info({
    controller: `case/assignPartner`,
    message: `OK - Partner assigned`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const getAssignedPartner = async (req: any, res: any) => {
  const { case_id, casestage_id } = req.params;

  const caseStageResponse = await CaseStagePartner.getById(
    case_id,
    casestage_id
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStagePartner/getAssignedPartner`,
      error: caseStageResponse.error,
    });

    return res.status(500).json({ error: caseStageResponse.error });
  }

  createLogger.info({
    controller: `case/getAssignedPartner`,
    message: `OK - Partner assigned`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const assignSpecialist = async (req: any, res: any) => {
  const {
    case_id,
    casestage_id,
    specialist_id,
    district_id,
    scheduled_date,
    scheduled_time,
    confirmed_date,
    confirmed_time,
  } = req.body;

  console.log(req.body);

  const caseStageResponse = await CaseStageSpecialist.create(
    case_id,
    casestage_id,
    specialist_id,
    district_id,
    scheduled_date,
    scheduled_time,
    confirmed_date,
    confirmed_time
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStageSpecialist/assignSpecialist`,
      error: caseStageResponse.error,
    });
    return res.status(500).json({ error: caseStageResponse.error });
  }

  createLogger.info({
    controller: `case/assignSpecialist`,
    message: `OK - Specialist assigned`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const getAssignedSpecialist = async (req: any, res: any) => {
  const { case_id, casestage_id } = req.params;

  const caseStageResponse = await CaseStageSpecialist.getById(
    case_id,
    casestage_id
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStageSpecialist/getAssignedSpecialist`,
      error: caseStageResponse.error,
    });
  }

  createLogger.info({
    controller: `case/getAssignedSpecialist`,
    message: `OK - Specialist assigned`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const reimburse = async (req: any, res: any) => {
  const { case_id, casestage_id, amount, currency } = req.body;

  const caseStageResponse = await CaseStageResult.create(
    case_id,
    casestage_id,
    amount,
    currency
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStageResult/reimburse`,
      error: caseStageResponse.error,
    });
    return res.status(500).json({ error: caseStageResponse.error });
  }

  const caseReimburse = await CaseReimbursement.create(
    case_id,
    caseStageResponse.data.id,
    null,
    "Pendiente"
  );

  if (!caseReimburse.success) {
    createLogger.error({
      model: `caseReimbursement/reimburse`,
      error: caseReimburse.error,
    });
    return res.status(500).json({ error: caseReimburse.error });
  }

  createLogger.info({
    controller: `case/reimburse`,
    message: `OK - Reimbursement created`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const getAssistanceData = async (req: any, res: any) => {
  const { applicant_id, assistance_id, product_id } = req.params;

  const response = await Case.getAssistanceData(
    applicant_id,
    assistance_id,
    product_id
  );

  if (!response.success) {
    createLogger.error({
      model: `case/getAssistanceData`,
      error: response.error,
    });
    return res.status(500).json({ error: response.error });
  }

  createLogger.info({
    controller: `case/getAssistanceData`,
    message: `OK - Assistance data found`,
  });

  return res.status(200).json(response.data);
};

const getReimbursment = async (req: any, res: any) => {
  const { case_id } = req.params;

  const response = await CaseStageResult.getByCase(case_id);

  if (!response.success) {
    createLogger.error({
      model: `caseStageResult/getReimbursment`,
      error: response.error,
    });
    return res.status(500).json({ error: response.error });
  }

  createLogger.info({
    controller: `case/getReimbursment`,
    message: `OK - Reimbursment found`,
  });

  return res.status(200).json(response.data);
};

const getAllReimbursements = async (req: any, res: any) => {
  const response = await CaseReimbursement.getAll();

  if (!response.success) {
    createLogger.error({
      model: `caseStageResult/getAllReimbursements`,
      error: response.error,
    });
    return res.status(500).json({ error: response.error });
  }

  createLogger.info({
    controller: `case/getAllReimbursements`,
    message: `OK - Reimbursments found`,
  });

  return res.status(200).json(response.data);
};

export {
  create,
  uploadDocument,
  getAll,
  getBeneficiaryByRut,
  getCaseById,
  getAttachById,
  getNewCaseNumber,
  assignPartner,
  getAssignedPartner,
  assignSpecialist,
  getAssignedSpecialist,
  reimburse,
  getAssistanceData,
  getReimbursment,
  getAllReimbursements,
};
