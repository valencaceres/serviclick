import React from "react";
import Step, { StepProps } from "./Step";
import styles from "./InfoSteps.module.scss";

interface InfoStepsProps {
  steps: StepProps[];
}

const InfoSteps: React.FC<InfoStepsProps> = ({ steps }) => {
  return (
    <div className={styles.infoSteps}>
      {steps.map((step, index) => (
        <Step
          key={index}
          number={step.number}
          title={step.title}
          iconColor={step.iconColor}
          boldWords={step.boldWords}
          contactInfo={step.contactInfo}
        />
      ))}
    </div>
  );
};

export default InfoSteps;
