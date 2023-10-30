import {
  CaseApplicant,
  CaseInsured,
  CaseProduct,
  CaseEvent,
} from "~/components/functional/_assistances/Case";

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
  // attachment: { component: <CaseAttachment /> },
  // refund: { component: <CaseRefund /> },
  // imed: { component: <CaseIMED /> },
  // specialist: { component: <CaseSpecialist /> },
  // alliance: { component: <CaseAlliance /> },
  // cost: { component: <CaseCost /> },
  // close: { component: <CaseClose /> },
  // reopen: { component: <CaseReopen /> },
};
