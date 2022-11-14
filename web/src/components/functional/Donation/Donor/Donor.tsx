import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../../../layout/Wizard";

import Button from "../../../ui/Button";
import Navigate, { Back } from "../../../ui/Navigate";
import Tooltip from "../../../ui/Tooltip";

import DonationBadge from "../../DonationBadge";
import DonorForm from "./DonorForm";

import { formatRut } from "../../../../utils/format";
import texts from "../../../../utils/texts";

import {
  useProduct,
  useSubscription,
  useDonation,
} from "../../../../redux/hooks";

const Donor = () => {
  const router = useRouter();

  const { product } = useProduct();
  const { setDonationDonor, donation } = useDonation();

  const initialDataDonorForm = {
    rut: { value: donation.donor.rut, isValid: true },
    name: { value: donation.donor.name, isValid: true },
    paternalLastName: { value: donation.donor.paternalLastName, isValid: true },
    maternalLastName: { value: donation.donor.maternalLastName, isValid: true },
    birthDate: { value: donation.donor.birthDate, isValid: true },
    address: { value: donation.donor.address, isValid: true },
    district: { value: donation.donor.district, isValid: true },
    email: { value: donation.donor.email, isValid: true },
    phone: { value: donation.donor.phone, isValid: true },
  };

  const [donorForm, setDonorForm] = useState(initialDataDonorForm);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const { donor: donorText, frequency } = texts;

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleClickRegister = () => {
    const donorData = {
      id: "",
      rut: formatRut(donorForm.rut.value),
      name: donorForm.name.value,
      paternalLastName: donorForm.paternalLastName.value,
      maternalLastName: donorForm.maternalLastName.value,
      birthDate: donorForm.birthDate.value,
      address: donorForm.address.value,
      district: donorForm.district.value,
      email: donorForm.email.value,
      phone: donorForm.phone.value,
    };

    setDonationDonor(donorData);

    router.push("./payment");
  };

  useEffect(() => {
    let enableButton = true;
    if (
      !donorForm.rut.isValid ||
      donorForm.rut.value === "" ||
      !donorForm.name.isValid ||
      donorForm.name.value === "" ||
      !donorForm.paternalLastName.isValid ||
      donorForm.paternalLastName.value === "" ||
      !donorForm.maternalLastName.isValid ||
      donorForm.maternalLastName.value === "" ||
      !donorForm.birthDate.isValid ||
      donorForm.birthDate.value === "" ||
      !donorForm.address.isValid ||
      donorForm.address.value === "" ||
      !donorForm.district.isValid ||
      donorForm.district.value === "" ||
      !donorForm.email.isValid ||
      donorForm.email.value === "" ||
      !donorForm.phone.isValid ||
      donorForm.phone.value === ""
    )
      enableButton = false;
    setIsEnabled(enableButton);
  }, [donorForm]);

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          {donorText.title}
          <DonationBadge />
        </Title>
        <Content>
          <DonorForm
            donorForm={donorForm}
            setDonorForm={setDonorForm}
            enabled={true}
          />
        </Content>
        <Buttons>
          <Button
            onClick={handleClickRegister}
            text="Registrar"
            width="150px"
            enabled={isEnabled}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Estas realizando una <b>{product.name}</b>, por un valor de{" "}
          <b>
            ${donation.price.toLocaleString().replace(",", ".")}{" "}
            {frequency[product.frequency]}
          </b>{" "}
          <br />
          <br />
          <div>
            Ingresa tus datos personales como donador y al terminar presiona el
            botón <b>Registrar</b>
          </div>
        </div>
      </Tooltip>
    </Fragment>
  );
};

export default Donor;
