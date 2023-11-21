import createLogger from "../util/logger";
import { getFileViewLink, uploadFile } from "../util/s3";

import * as Case from "../models/case";
import * as CaseStage from "../models/caseStage";
import * as CaseStageAttach from "../models/caseStageAttach";
import * as CaseStagePartner from "../models/caseStagePartner";
import * as CaseStageSpecialist from "../models/caseStageSpecialist";
import * as CaseStageResult from "../models/caseStageResult";
import * as CaseReimbursement from "../models/caseReimbursement";
import * as CaseChat from "../models/caseChat";
import * as Insured from "../models/insured";
import * as Beneficiary from "../models/beneficiary";
import * as Customer from "../models/customer";
import { fetchClerkUser } from "../util/clerkUserData";

const create = async (req: any, res: any) => {
  const {
    applicant,
    retail_id,
    customer_id,
    isInsured,
    number,
    product_id,
    assistance_id,
    description,
    stage_id,
    user_id,
    beneficiary_id,
    isactive,
    lead_id,
    event_date,
    event_location,
  } = req.body;

  if (
    (applicant?.type === "C" && isInsured === true) ||
    applicant?.type === "I"
  ) {
    const applicantResponse = await Insured.create(
      applicant.rut,
      applicant.name,
      applicant.paternalLastName,
      applicant.maternalLastName,
      applicant.birthDate,
      applicant.address,
      applicant.district,
      applicant.email,
      applicant.phone
    );

    if (!applicantResponse.success) {
      createLogger.error({
        model: `insured/create(1)`,
        error: applicantResponse.error,
      });
      return res.status(500).json({ error: "Error creating insured" });
    }

    const customerResponse = await Customer.createModel(
      applicant.rut,
      applicant.name,
      applicant.paternalLastName,
      applicant.maternalLastName,
      applicant.address,
      applicant.district,
      applicant.email,
      applicant.phone
    );

    if (!customerResponse.success) {
      createLogger.error({
        model: `insured/customer`,
        error: customerResponse.error,
      });
      return res.status(500).json({ error: "Error creating customer" });
    }

    applicant.id = applicantResponse.data.id;
  }

  if (
    (applicant?.type === "C" && isInsured === false) ||
    applicant?.type === "B"
  ) {
    const applicantResponse = await Beneficiary.createModel(
      applicant.rut,
      applicant.name,
      applicant.paternalLastName,
      applicant.maternalLastName,
      applicant.birthDate,
      applicant.address,
      applicant.district,
      applicant.email,
      applicant.phone
    );

    if (!applicantResponse.success) {
      createLogger.error({
        model: `beneficiary/create`,
        error: applicantResponse.error,
      });
      return res.status(500).json({ error: "Error creating beneficiary" });
    }

    applicant.id = applicantResponse.data.id;
  }

  const caseResponse = await Case.create(
    applicant,
    number,
    product_id,
    assistance_id,
    isactive,
    isInsured,
    retail_id,
    customer_id,
    beneficiary_id,
    lead_id,
    event_date,
    event_location
  );

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/create`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: "Error creating case" });
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
    return res.status(500).json({ error: "Error creating case stage" });
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
  const { retail_id, applicant_rut, applicant_name, stage_id, records, page } =
    req.query;

  const caseResponse = await Case.getAll(
    retail_id,
    applicant_rut,
    applicant_name,
    stage_id,
    records,
    page
  );

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getAll`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving cases" });
  }

  createLogger.info({
    model: `case/getAll`,
    message: `Cases retrieved successfully`,
  });

  return res.status(200).json(caseResponse.data);
};

const uploadDocument = async (req: any, res: any) => {
  const { case_id } = req.body;
  const document_id = req.body.document_id;

  if (req.files === null) {
    return res
      .status(200)
      .json({ success: true, data: null, error: "No file uploaded" });
  }

  const file = req.files["files"];

  const result = await uploadFile(file);

  if (!result) {
    return res.status(400).json({ error: "No file was uploaded." });
  }

  const caseStageAttachResponse = await CaseStageAttach.uploadDocument(
    case_id,
    document_id,
    file.name
  );

  if (!caseStageAttachResponse.success) {
    createLogger.error({
      model: `caseStage/uploadDocument`,
      error: caseStageAttachResponse.error,
    });
    return res.status(500).json({ error: "Error uploading document" });
  }

  createLogger.info({
    model: `caseStage/uploadDocument`,
    message: `Document uploaded successfully`,
  });

  return res.status(200).json({ success: true, data: null, error: null });
};

const getBeneficiaryByRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const beneficiaryResponse = await Case.getBeneficiaryData(rut);

  if (!beneficiaryResponse.success) {
    createLogger.error({
      model: `case/getBeneficiaryData`,
      error: beneficiaryResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving beneficiary data" });
  }

  if (beneficiaryResponse.error === "Beneficiary not found") {
    createLogger.info({
      controller: `case/getBeneficiaryByRut`,
      message: `OK - Beneficiary not found`,
    });
    return res.status(200).json(beneficiaryResponse.data);
  }

  createLogger.info({
    controller: `case/getBeneficiaryByRut`,
    message: `OK - Beneficiary found`,
  });
  return res.status(200).json(beneficiaryResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;

  const caseResponse = await Case.getById(id);

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getById`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving case" });
  }

  createLogger.info({
    controller: `case/getById`,
    message: `OK - Case found`,
  });

  return res.status(200).json(caseResponse.data);
};

const getAttachById = async (req: any, res: any) => {
  const { case_id } = req.params;

  const caseStageAttachResponse = await CaseStageAttach.getById(case_id);

  if (!caseStageAttachResponse.success) {
    createLogger.error({
      model: `caseStage/getAttachById`,
      error: caseStageAttachResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving attachments" });
  }

  const attachments: any = [];

  for (let i = 0; i < caseStageAttachResponse.data.length; i++) {
    const attachment = caseStageAttachResponse.data[i];

    const viewLink = await getFileViewLink(attachment.file_tag);

    attachments.push({
      document_id: attachment.document_id,
      viewLink,
      file_tag: attachment.file_tag,
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
    return res.status(500).json({ error: "Error generating new case number" });
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
    return res.status(500).json({ error: "Error assigning partner" });
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

    return res.status(500).json({ error: "Error retrieving assigned partner" });
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
    return res.status(500).json({ error: "Error assigning specialist" });
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
  const {
    case_id,
    casestage_id,
    imed_amount,
    amount,
    currency,
    uf_value,
    available,
  } = req.body;
  const caseStageResponse = await CaseStageResult.create(
    case_id,
    casestage_id,
    amount,
    currency,
    uf_value,
    available
  );

  if (!caseStageResponse.success) {
    createLogger.error({
      model: `caseStageResult/reimburse`,
      error: caseStageResponse.error,
    });
    return res.status(500).json({ error: "Error creating reimbursement" });
  }

  const caseReimburse = await CaseReimbursement.create(
    case_id,
    caseStageResponse.data.id,
    null,
    amount,
    "Pendiente",
    imed_amount
  );

  if (!caseReimburse.success) {
    createLogger.error({
      model: `caseReimbursement/reimburse`,
      error: caseReimburse.error,
    });
    return res.status(500).json({ error: "Error creating reimbursement" });
  }

  createLogger.info({
    controller: `case/reimburse`,
    message: `OK - Reimbursement created`,
  });

  return res.status(200).json(caseStageResponse.data);
};

const getAssistanceData = async (req: any, res: any) => {
  const { insured_id, assistance_id, product_id } = req.params;

  const response = await Case.getAssistanceData(
    insured_id,
    assistance_id,
    product_id
  );

  if (!response.success) {
    createLogger.error({
      model: `case/getAssistanceData`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving assistance data" });
  }

  createLogger.info({
    controller: `case/getAssistanceData`,
    message: `OK - Assistance data found`,
  });

  return res.status(200).json(response.data);
};

const discountAssistanceData = async (req: any, res: any) => {
  const { insured_id, assistance_id, product_id } = req.params;

  const response = await Case.discountAssistanceData(
    insured_id,
    assistance_id,
    product_id
  );

  if (!response.success) {
    createLogger.error({
      model: `case/discountAssistanceData`,
      error: response.error,
    });
    return res.status(500).json({ error: "error discounting assistance data" });
  }

  createLogger.info({
    controller: `case/discountAssistanceData`,
    message: `OK - Assistance data discounted`,
  });

  if ("data" in response) {
    return res.status(200).json(response.data);
  } else {
    return res.status(200).json({ message: response.message });
  }
};

const getReimbursment = async (req: any, res: any) => {
  const { case_id } = req.params;

  const response = await CaseStageResult.getByCase(case_id);

  if (!response.success) {
    createLogger.error({
      model: `caseStageResult/getReimbursment`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving reimbursment" });
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
    return res.status(500).json({ error: "Error retrieving reimbursments" });
  }

  createLogger.info({
    controller: `case/getAllReimbursements`,
    message: `OK - Reimbursments found`,
  });

  return res.status(200).json(response.data);
};

const updateReimbursementStatus = async (req: any, res: any) => {
  const { case_id, casestageresult_id, status } = req.body;

  const response = await CaseReimbursement.updateStatus(
    case_id,
    casestageresult_id,
    status
  );

  if (!response.success) {
    createLogger.error({
      model: `caseStageResult/updateReimbursementStatus`,
      error: response.error,
    });
    return res
      .status(500)
      .json({ error: "Error updating reimbursment status" });
  }

  createLogger.info({
    controller: `case/updateReimbursementStatus`,
    message: `OK - Reimbursment status updated`,
  });

  return res.status(200).json(response.data);
};

const createChatMessage = async (req: any, res: any) => {
  try {
    const { case_id, stage_id, message, user_id, type } = req.body;
    if (case_id === null) {
      return res.status(200).json(null);
    }

    const response = await CaseChat.create(
      case_id,
      stage_id,
      user_id,
      message,
      type
    );

    if (!response.success) {
      createLogger.error({
        model: `caseChat/createChatMessage`,
        error: response.error,
      });
      return res.status(500).json({ error: "Error creating chat message" });
    }

    createLogger.info({
      controller: `case/createChatMessage`,
      message: `OK - Chat message created`,
    });

    return res.status(200).json(response.data);
  } catch (e) {
    createLogger.error({
      model: `case/createChatMessage`,
      error: (e as Error).message,
    });

    return res.status(500).json({ error: "Error creating chat message" });
  }
};

const getChatByCase = async (req: any, res: any) => {
  const { case_id } = req.params;

  if (case_id === null) {
    return res.status(200).json(null);
  }

  const response = await CaseChat.getByCase(case_id);

  if (!response.success) {
    createLogger.error({
      model: `caseChat/getChatByCase`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving chat messages" });
  }

  createLogger.info({
    controller: `case/getChatByCase`,
    message: `OK - Chat messages found`,
  });

  return res.status(200).json(response.data);
};

const getStatistics = async (req: any, res: any) => {
  const monthlyCases = await Case.getMonthlyCases();

  if (!monthlyCases.success) {
    createLogger.error({
      model: "case/getMonthlyCases",
      error: monthlyCases.error,
    });
    res.status(500).json({ error: "Error retrieving monthly cases" });
    return;
  }

  const casesReimbursment = await Case.getCasesReimbursment();

  if (!casesReimbursment.success) {
    createLogger.error({
      model: "case/getCasesReimbursment",
      error: casesReimbursment.error,
    });
    res.status(500).json({ error: "Error retrieving case reimbursment" });
    return;
  }
  const getTotalCases = await Case.getTotalCases();

  if (!getTotalCases.success) {
    createLogger.error({
      model: "case/getTotalCases",
      error: getTotalCases.error,
    });
    res.status(500).json({ error: "Error retrieving total cases" });
    return;
  }

  const statistics = {
    monthlyCases: monthlyCases.data,
    casesReimbursment: casesReimbursment.data,
    totalCases: getTotalCases.data,
  };

  createLogger.info({
    controller: "case/getStatistics",
    message: "OK",
  });

  res.status(200).json(statistics);
};

const createCaseSummary = async (req: any, res: any) => {
  try {
    const { case_id, amount, extraamount, comment } = req.body;

    const caseSummaryResponse = await Case.createCaseSummary(
      case_id,
      amount,
      extraamount,
      comment
    );

    if (!caseSummaryResponse.success) {
      createLogger.error({
        model: `caseSummary/createCaseSummary`,
        error: caseSummaryResponse.error,
      });
      return res.status(500).json({ error: "Error creating case summary" });
    }

    createLogger.info({
      controller: `case/createCaseSummary`,
      message: `OK - case summary created`,
    });

    return res.status(200).json(caseSummaryResponse.data);
  } catch (e) {
    createLogger.error({
      controller: `case/createCaseSummary`,
      error: (e as Error).message,
    });

    return res.status(500).json({ error: "Error creating case summary" });
  }
};

const getApplicantByRut = async (req: any, res: any) => {
  try {
    const { rut } = req.params;

    const caseApplicant = await Case.getApplicantByRut(rut);

    if (!caseApplicant.success) {
      createLogger.error({
        model: `case/getApplicantByRut`,
        error: caseApplicant.error,
      });
      return res.status(500).json({ error: "Error creating case summary" });
    }

    createLogger.info({
      controller: `case/getApplicantByRut`,
      message: `OK - case summary created`,
    });

    return res.status(200).json(caseApplicant.data);
  } catch (e) {
    createLogger.error({
      controller: `case/getApplicantByRut`,
      error: (e as Error).message,
    });

    return res.status(500).json({ error: "Error creating case summary" });
  }
};

const getServicesAndValues = async (req: any, res: any) => {
  const {
    insured_id,
    beneficiary_id,
    retail_id,
    customer_id,
    product_id,
    assistance_id,
  } = req.body;

  const response = await Case.getServicesAndValues(
    insured_id,
    beneficiary_id,
    retail_id,
    customer_id,
    product_id,
    assistance_id
  );

  if (!response.success) {
    createLogger.error({
      model: `case/getServicesAndValues`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving services" });
  }

  createLogger.info({
    controller: `case/getServicesAndValues`,
    message: `OK - Services found`,
  });

  return res.status(200).json(response.data);
};

const upsert = async (req: any, res: any) => {
  const {
    case_id,
    user_id,
    type,
    insured,
    beneficiary,
    customer,
    retail,
    product,
    assistance,
    lead_id,
    values,
    event,
    files,
    procedure_id,
    refund,
    specialist,
    alliance,
    cost,
  } = req.body;

  const response = await Case.upsert(
    case_id,
    user_id,
    type,
    insured,
    beneficiary,
    customer,
    retail,
    product,
    assistance,
    lead_id,
    values,
    event,
    files,
    procedure_id,
    refund,
    specialist,
    alliance,
    cost
  );
  if (!response.success) {
    createLogger.error({
      model: `case/upsert`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error inserting/updating case" });
  }

  createLogger.info({
    controller: `case/upsert`,
    message: `OK - Services found`,
  });

  return res.status(200).json(response.data);
};

const getRetails = async (req: any, res: any) => {
  const response = await Case.getRetails();

  if (!response.success) {
    createLogger.error({
      model: `case/getRetails`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving retails" });
  }

  createLogger.info({
    controller: `case/getRetails`,
    message: `OK - Retails found`,
  });

  return res.status(200).json(response.data);
};

const getStatus = async (req: any, res: any) => {
  const response = await Case.getStatus();

  if (!response.success) {
    createLogger.error({
      model: `case/getStatus`,
      error: response.error,
    });
    return res.status(500).json({ error: "Error retrieving status" });
  }

  createLogger.info({
    controller: `case/getStatus`,
    message: `OK - Status found`,
  });

  return res.status(200).json(response.data);
};
const getAllReimbursments = async (req: any, res: any) => {
  const { isImed, applicant_rut, applicant_name, records, page } = req.query;
  req.query;

  const caseResponse = await Case.getReimbursment(
    isImed,
    applicant_rut,
    applicant_name,
    records,
    page
  );

  if (!caseResponse.success) {
    createLogger.error({
      model: `case/getAllReimbursments`,
      error: caseResponse.error,
    });
    return res.status(500).json({ error: "Error retrieving reimbursments" });
  }

  createLogger.info({
    model: `case/getAll`,
    message: `reimbursments retrieved successfully`,
  });

  return res.status(200).json(caseResponse.data);
};

const updateReimbursment = async (req: any, res: any) => {
  const { status, user_id, imed_amount, amount, comment } = req.body;
  const { id } = req.params;
  const reimbursmentsResponse = await Case.updateReimbursment(
    id,
    status,
    user_id,
    imed_amount,
    amount,
    comment
  );
  console.log(req.body);
  if (!reimbursmentsResponse.success) {
    createLogger.error({
      model: `reimbursment/update`,
      error: reimbursmentsResponse.error,
    });
    return res.status(500).json({ error: "Error updating reimbursments" });
  }

  createLogger.info({
    model: `reimbursment/update`,
    message: `reimbursments updating successfully`,
  });

  return res.status(200).json(reimbursmentsResponse);
};

export {
  create,
  uploadDocument,
  getAll,
  getBeneficiaryByRut,
  getById,
  getAttachById,
  getNewCaseNumber,
  assignPartner,
  getAssignedPartner,
  assignSpecialist,
  getAssignedSpecialist,
  reimburse,
  getAssistanceData,
  discountAssistanceData,
  getReimbursment,
  getAllReimbursements,
  updateReimbursementStatus,
  createChatMessage,
  getChatByCase,
  getStatistics,
  createCaseSummary,
  getApplicantByRut,
  getServicesAndValues,
  upsert,
  getRetails,
  getStatus,
  updateReimbursment,
  getAllReimbursments,
};
