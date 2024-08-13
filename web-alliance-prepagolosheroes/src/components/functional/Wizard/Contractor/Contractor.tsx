import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Person from "../../Entity/Person";

import {
  Screen,
  Content,
  Aside,
  Article,
  Footer,
  Row,
} from "../../../layout/Form";

import Button from "../../../ui/Button/Button";
import Loading from "../../../ui/Loading";

import { unFormatRut } from "../../../../utils/format";
import { rutRegEx, emailRegEx } from "../../../../utils/regEx";
import { rutValidate } from "../../../../utils/validations";

import {
  IFieldFormCustomerType,
  IFieldFormString,
} from "../../../../interfaces/form";

import {
  useSlug,
  useProduct,
  usePerson,
  useLead,
} from "../../../../hooks/store";
import BreadCumbs from "../../../ui/BreadCumbs";

interface IContractor {
  customerType: "p";
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface IPersonForm {
  customerType: IFieldFormCustomerType;
  rut: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const Contractor = () => {
  const router = useRouter();

  const initialDataForm = {
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    address: { value: "", isValid: true },
    district: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const initialDataContractor: IContractor = {
    customerType: "p",
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  };

  const { slug } = useSlug();
  const { product } = useProduct();
  const { getByRut, person } = usePerson();
  const { isSuccess, isLoading, lead, create } = useLead();

  const [contractor, setContractor] = useState<IContractor>(
    initialDataContractor
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [personForm, setPersonForm] = useState<IPersonForm>({
    customerType: { value: "p", isValid: true },
    rut: { value: "", isValid: true },
    ...initialDataForm,
  });

  const isValidRut = (rut: string) => {
    return (
      (rutRegEx.test(unFormatRut(rut)) &&
        unFormatRut(rut).length > 7 &&
        rutValidate(unFormatRut(rut))) ||
      rut === ""
    );
  };

  const isValidEmail = (email: string) => {
    return emailRegEx.test(email) || email === "";
  };

  const isValidPhone = (phone: string) => {
    return phone.length === 9;
  };

  const fillForm = (data: any) => {
    const {
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    } = data;

    setPersonForm({
      customerType: { value: "p", isValid: true },
      rut: { value: rut || "", isValid: isValidRut(rut) },
      name: { value: name || "", isValid: true },
      paternalLastName: {
        value: paternalLastName || "",
        isValid: true,
      },
      maternalLastName: {
        value: maternalLastName || "",
        isValid: true,
      },
      address: { value: address || "", isValid: true },
      district: { value: district || "", isValid: true },
      email: {
        value: email || "",
        isValid: isValidEmail(email),
      },
      phone: {
        value: phone || "",
        isValid: isValidPhone(phone),
      },
    });
  };

  const handleClickSave = () => {
    create({
      ...lead,
      id: lead?.id || "",
      agent_id: slug?.id || "",
      customer: {
        id: "",
        rut: contractor.rut,
        name: contractor.name,
        paternalLastName: contractor.paternalLastName,
        maternalLastName: contractor.maternalLastName,
        address: contractor.address,
        district: contractor.district,
        email: contractor.email,
        phone: contractor.phone,
      },
      product: {
        currency_code: product?.currency || "",
        frequency_code: product?.plan.frequencyCode || "",
        id: product?.id || "",
        price: product?.plan.price || 0,
        productPlan_id: product?.plan.planId || 0,
      },
      subscription: false,
      send: false,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const { slug, plan } = router.query;
      router.push(`/${slug}/insured/${plan}?leadId=${lead.id}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (lead && lead.customer.rut !== "") {
      fillForm(lead.customer);
    }
  }, [lead]);

  useEffect(() => {
    if (person && person && person.rut !== "") {
      fillForm(person);
    }
  }, [person]);

  useEffect(() => {
    const isValid =
      personForm.rut.value !== "" &&
      personForm.rut.isValid &&
      personForm.name.value !== "" &&
      personForm.name.isValid &&
      personForm.paternalLastName.value !== "" &&
      personForm.paternalLastName.isValid &&
      personForm.maternalLastName.value !== "" &&
      personForm.maternalLastName.isValid &&
      personForm.address.value !== "" &&
      personForm.address.isValid &&
      personForm.district.value !== "" &&
      personForm.district.isValid &&
      personForm.email.value !== "" &&
      personForm.email.isValid &&
      personForm.phone.value !== "" &&
      personForm.phone.isValid;

    setIsButtonEnabled(isValid);

    if (isValid) {
      setContractor({
        id: "",
        customerType: "p",
        rut: personForm.rut.value,
        name: personForm.name.value,
        paternalLastName: personForm.paternalLastName.value,
        maternalLastName: personForm.maternalLastName.value,
        address: personForm.address.value,
        district: personForm.district.value,
        email: personForm.email.value,
        phone: personForm.phone.value,
      });
    }
  }, [personForm]);

  return (
    <Screen>
      <Content>
        <Person
          getByRut={getByRut}
          initialDataForm={initialDataForm}
          formData={personForm}
          setFormData={setPersonForm}
        />
      </Content>
      <Footer>
        <Button
          text="Registrar"
          width="200px"
          onClick={handleClickSave}
          enabled={isButtonEnabled}
        />
      </Footer>
      {isLoading && <Loading />}
    </Screen>
  );
};

export default Contractor;
