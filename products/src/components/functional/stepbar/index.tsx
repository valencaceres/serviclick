import Link from "next/link";
import { IStage } from "@/data/stage";
import { Button } from "@/components/ui/button-ui";
import { useRouter } from "next/router";
import { ILead } from "@/interfaces/lead";
interface StepBarProps {
  steps: IStage[];
  currentStep?: string;
  productPlanId?: string;
  beneficiaries?: number;
  lead?: ILead;
}

const StepBar = ({
  steps,
  currentStep,
  productPlanId,
  beneficiaries,
  lead,
}: StepBarProps) => {
  const router = useRouter();
  const getStepUrl = (stepCode: string) => {
    return productPlanId
      ? `/${stepCode}?productPlanId=${productPlanId}`
      : `/${stepCode}`;
  };
  console.log(lead);
  const showBeneficiariesStep = beneficiaries && beneficiaries > 0;
  const paymentStepNumber = showBeneficiariesStep ? 5 : 4;
  const isDisabled = (stepCode: string) => {
    if (router?.query?.stage?.includes(stepCode)) {
      return false;
    } else if (stepCode === "contractor" && lead?.insured[0]?.name !== "") {
      return false;
    } else if (stepCode === "insured" && lead?.customer?.name !== "") {
      return false;
    } else if (
      stepCode === "beneficiaries" &&
      lead?.insured[0]?.beneficiaries?.[0]?.name !== undefined &&
      lead?.insured[0]?.beneficiaries?.[0]?.name !== ""
    ) {
      return false;
    } else if (
      stepCode === "product" &&
      lead?.insured[0]?.values?.[0]?.value !== undefined &&
      lead?.insured[0]?.values?.[0]?.value !== ""
    ) {
      return false;
    }
    return true;
  };

  const handleClick = (stepCode: string) => {
    const url = getStepUrl(stepCode);
    router.push(url);
  };

  return (
    <div className="flex flex-row md:flex-col justify-center gap-2 mt-4 md:mt-0 md:gap-4">
      {steps.map((step, index) => (
        <Button
          key={step.code}
          className={`flex items-center justify-center  h-10 w-10 rounded-full bg-${
            currentStep === step.code ? "" : "gray"
          }-500 text-white ${
            isDisabled(step.code)
              ? "pointer-events-none bg-gray-300"
              : "bg-[#B4CD25]"
          }`}
          disabled={isDisabled(step.code)}
          onClick={() => handleClick(step.code)}
        >
          {step.code === "payment" && (!beneficiaries || beneficiaries <= 0)
            ? paymentStepNumber
            : step.number}
        </Button>
      ))}
    </div>
  );
};

export default StepBar;
