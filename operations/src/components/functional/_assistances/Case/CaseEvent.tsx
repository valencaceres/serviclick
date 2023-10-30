import React from "react";

interface ICaseEventProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseEvent = ({ setIsEnabledSave, itWasFound }: ICaseEventProps) => {
  return <div>CaseEvent</div>;
};

export default CaseEvent;
