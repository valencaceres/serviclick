import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { ContentCell, ContentRow } from "../../../layout/Content";
import InputText from "../../../ui/InputText";

import { unFormatRut, formatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useBroker, useDistrict } from "../../../../hooks";
import useAgent from "~/store/hooks/useAgent";
import styles from "./Agent.module.scss";
import ButtonIcon from "~/components/ui/ButtonIcon";
import ComboBox from "~/components/ui/ComboBox";
import { setAgent, agentSlice } from "~/redux/slices/agentSlice";

const AgentForm = ({
  isDisabledAgentForm,
  agentForm,
  setAgentForm,
  editForm,
  setIsDisabledAgentForm,
}: any) => {
  const router = useRouter();

  const { broker, setBroker, getBrokerByRut } = useBroker();
  const { agent, setAgent } = useAgent();
  const { list: districtList } = useDistrict();
  const [enableButtonSave, setEnableButtonSave] = useState(false);
  const [agentCancel, setAgentCancel] = useState(broker);
  const ref = useRef<HTMLInputElement>(null);
  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeName = (event: any) => {
    setAgentForm({
      ...agentForm,
      name: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleChangeFantasyName = (event: any) => {
    setAgentForm({
      ...agentForm,
      fantasyName: {
        value: event.target.value,
        isValid: event.target.value !== "",
      },
    });
  };

  const handleClickRevertForm = () => {
    setIsDisabledAgentForm(true);
    setAgentForm({
      name: { value: agentCancel.name, isValid: true },

      fantasyName: { value: agentCancel.fantasyName, isValid: true },
    });
  };
  useEffect(() => {
    if (agent.agent.id !== "") {
      setAgentForm({
        name: { value: agent.agent.name, isValid: true },

        fantasyName: { value: agent.agent.fantasyname, isValid: true },
      });
    }
  }, [agent.agent.id]);

  useEffect(() => {
    const isValid =
      agentForm.name.isValid &&
      agentForm.name.value !== "" &&
      agentForm.fantasyName.isValid &&
      agentForm.fantasyName.value !== "";

    if (isValid) {
      setAgent({
        ...agent,
        agent: {
          ...agent.agent,
          name: agentForm.name.value,

          fantasyname: agentForm.fantasyName.value,
        },
        products: [...agent.products],
      });
    }
    setEnableButtonSave(isValid);
  }, [agentForm]);

  useEffect(() => {
    if (!isDisabledAgentForm) {
      setAgentCancel(broker);
    }
  }, [!isDisabledAgentForm]);

  return (
    <ContentRow gap="5px">
      <ContentCell className={styles.contentCellForm} gap="5px">
        <InputText
          label="Razón Social"
          width="100%"
          maxLength={50}
          value={agentForm?.name.value}
          onChange={handleChangeName}
          isValid={agentForm?.name.isValid}
          disabled={isDisabledAgentForm}
        />

        <InputText
          label="Nombre de fantasía"
          width="100%"
          maxLength={50}
          value={agentForm?.fantasyName.value}
          onChange={handleChangeFantasyName}
          isValid={agentForm?.fantasyName.isValid}
          disabled={isDisabledAgentForm}
        />
        {/*   <ContentRow gap="5px" align="space-between">
          {!isDisabledAgentForm && (
            <ButtonIcon
              iconName="close"
              color="gray"
              onClick={handleClickRevertForm}
            />
          )}
          <ButtonIcon
            iconName={isDisabledAgentForm ? "edit" : "save"}
            color="gray"
            onClick={editForm}
            disabled={isDisabledAgentForm ? false : !enableButtonSave}
          />
        </ContentRow> */}
      </ContentCell>
    </ContentRow>
  );
};

export default AgentForm;
