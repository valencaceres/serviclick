import {
  CaseApplicant,
  CaseInsured,
  CaseProduct,
  CaseEvent,
} from "~/components/functional/_assistances/Case";
import CaseAlliance from "~/components/functional/_assistances/Case/CaseAlliance";
import CaseAttachment from "~/components/functional/_assistances/Case/CaseAttachment";
import CaseImed from "~/components/functional/_assistances/Case/CaseImed";
import CaseRefund from "~/components/functional/_assistances/Case/CaseRefund";
import CaseSpecialist from "~/components/functional/_assistances/Case/CaseSpecialist";
import CaseClosed from "~/components/functional/_assistances/Case/CaseClosed";
import CaseNulledAlliance from "~/components/functional/_assistances/Case/CaseNulledAlliance";
import CaseNulledSpecialist from "~/components/functional/_assistances/Case/CaseNulledSpecialist";
interface IStagePages {
  [key: string]: {
    component: JSX.Element;
  };
}

export const stagePages = {
  applicant: {
    component: (
      <CaseApplicant
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  insured: {
    component: (
      <CaseInsured
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  product: {
    component: (
      <CaseProduct
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  event: {
    component: (
      <CaseEvent
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  attachment: {
    component: (
      <CaseAttachment
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  refund: {
    component: (
      <CaseRefund
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  imed: {
    component: (
      <CaseImed
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  specialist: {
    component: (
      <CaseSpecialist
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  alliance: {
    component: (
      <CaseAlliance
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  // cost: { component: <CaseCost /> },
  close: {
    component: (
      <CaseClosed
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  anulled_alliance: {
    component: (
      <CaseNulledAlliance
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  anulled_specialist: {
    component: (
      <CaseNulledSpecialist
        setIsEnabledSave={(isEnabled: boolean): void => {
          throw new Error("Function not implemented.");
        }}
        itWasFound={false}
      />
    ),
  },
  // reopen: { component: <CaseReopen /> },
};
