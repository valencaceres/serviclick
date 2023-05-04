import { useState } from "react";
import { SaleFamilyStep } from "./SaleFamilyStep";
import { SaleProductStep } from "./SaleProductStep";
import { Button } from "~/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useUI } from "~/store/hooks";

enum SaleSteps {
  FAMILY,
  PRODUCT,
}

export function Sale() {
  const [saleStep, setSaleStep] = useState(SaleSteps.FAMILY);

  const { setFamily } = useUI();

  const goToNextStep = () => setSaleStep((saleStep) => saleStep + 1);

  const goToPreviousStep = () => {
    setSaleStep((saleStep) => saleStep - 1);
    setFamily(null);
  };

  return (
    <>
      {(() => {
        switch (saleStep) {
          case SaleSteps.FAMILY:
            return <SaleFamilyStep onDone={goToNextStep} />;
          case SaleSteps.PRODUCT:
            return (
              <>
                <SaleProductStep
                  onDone={goToNextStep}
                  previousStep={goToPreviousStep}
                />
                <Button
                  className="fixed bottom-0 right-0 m-4 h-16 w-16 rounded-full bg-teal-blue"
                  onClick={goToPreviousStep}
                >
                  <ArrowLeftIcon size={24} />
                </Button>
              </>
            );
        }
      })()}
    </>
  );
}
