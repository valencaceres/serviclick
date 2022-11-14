import { useEffect } from "react";

import InputText from "../../../ui/InputText";

import { Component, Row, Cell } from "../../../layout/Component";

import { unFormatRut } from "../../../../utils/format";
import { numberRegEx, rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import { useSubscription, useDonation, useUI } from "../../../../redux/hooks";

const DonorForm = ({ donorForm, setDonorForm, disabled }: any) => {
  const { isDesktop } = useUI();
  const { resetSubscription, subscription } = useSubscription();
  const { getDonationBySubscriptionId, resetDonationSubscription, donation } =
    useDonation();

  const handleFocusRut = (event: any) => {
    event.target.value = unFormatRut(event.target.value);
  };

  const handleChangeRut = (event: any) => {
    setDonorForm({
      ...donorForm,
      rut: {
        value: event.target.value,
        isValid:
          (rutRegEx.test(event.target.value) &&
            event.target.value.length > 7 &&
            rutValidate(event.target.value)) ||
          event.target.value === "",
      },
    });
  };

  const handleChangeName = (event: any) => {
    setDonorForm({
      ...donorForm,
      name: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangePaternalLastName = (event: any) => {
    setDonorForm({
      ...donorForm,
      paternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeMaternalLastName = (event: any) => {
    setDonorForm({
      ...donorForm,
      maternalLastName: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeBirthDate = (event: any) => {
    setDonorForm({
      ...donorForm,
      birthDate: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeAddress = (event: any) => {
    setDonorForm({
      ...donorForm,
      address: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeDistrict = (event: any) => {
    setDonorForm({
      ...donorForm,
      district: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  const handleChangeEmail = (event: any) => {
    setDonorForm({
      ...donorForm,
      email: {
        value: event.target.value,
        isValid:
          emailRegEx.test(event.target.value) || event.target.value === "",
      },
    });
  };

  const handleChangePhone = (event: any) => {
    if (numberRegEx.test(event.target.value) || event.target.value === "") {
      setDonorForm({
        ...donorForm,
        phone: {
          value: event.target.value,
          isValid: event.target.value.length === 9,
        },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (subscription.id > 0) {
      getDonationBySubscriptionId(subscription.id);
    }
  }, [subscription]);

  useEffect(() => {
    if (donation.donor.id !== "") {
      setDonorForm({
        id: { value: donation.donor.id, isValid: true },
        rut: { value: donation.donor.rut, isValid: true },
        name: { value: donation.donor.name, isValid: true },
        paternalLastName: {
          value: donation.donor.paternalLastName,
          isValid: true,
        },
        maternalLastName: {
          value: donation.donor.maternalLastName,
          isValid: true,
        },
        birthDate: {
          value: donation.donor.birthDate,
          isValid: true,
        },
        address: { value: donation.donor.address, isValid: true },
        district: { value: donation.donor.district, isValid: true },
        email: { value: donation.donor.email, isValid: true },
        phone: { value: donation.donor.phone, isValid: true },
      });
      resetSubscription();
      resetDonationSubscription();
    }
  }, [donation.donor, setDonorForm]);

  return (
    <Component width={isDesktop ? "560px" : "100%"}>
      <Row>
        <Cell align="left">
          <InputText
            label="Rut"
            width={"100%"}
            onFocus={handleFocusRut}
            maxLength={9}
            value={donorForm?.rut.value}
            onChange={handleChangeRut}
            isValid={donorForm?.rut.isValid}
            disabled={disabled}
          />
        </Cell>
        <Cell align="left">
          <InputText
            type="date"
            label="Fecha de nacimiento"
            width={"100%"}
            maxLength={10}
            value={donorForm?.birthDate.value}
            onChange={handleChangeBirthDate}
            isValid={donorForm?.birthDate.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Nombres"
            width="100%"
            maxLength={50}
            value={donorForm?.name.value}
            onChange={handleChangeName}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Apellido Paterno"
            width="100%"
            maxLength={50}
            value={donorForm?.paternalLastName.value}
            onChange={handleChangePaternalLastName}
            disabled={disabled}
          />
        </Cell>
        <Cell>
          <InputText
            label="Apellido Materno"
            width="100%"
            maxLength={50}
            value={donorForm?.maternalLastName.value}
            onChange={handleChangeMaternalLastName}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Dirección"
            width="100%"
            maxLength={250}
            value={donorForm?.address.value}
            onChange={handleChangeAddress}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Comuna"
            width="100%"
            maxLength={250}
            value={donorForm?.district.value}
            onChange={handleChangeDistrict}
            disabled={disabled}
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <InputText
            label="Correo"
            width="100%"
            type="email"
            maxLength={250}
            value={donorForm?.email.value}
            onChange={handleChangeEmail}
            isValid={donorForm?.email.isValid}
            disabled={disabled}
          />
        </Cell>
        <Cell>
          <InputText
            label="Teléfono"
            width="100%"
            type="tel"
            maxLength={9}
            value={donorForm?.phone.value}
            onChange={handleChangePhone}
            isValid={donorForm?.phone.isValid}
            disabled={disabled}
          />
        </Cell>
      </Row>
    </Component>
  );
};

export default DonorForm;
