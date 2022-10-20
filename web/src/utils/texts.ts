const texts = {
  general: {
    title:
      "Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu mano",
    description:
      "Serviclick.cl - Todas las soluciones para tu hogar, en la palma de tu mano",
  },
  frequency: {
    M: "mensual",
    A: "anual",
    S: "semanal",
  },
  company: {
    title: "Contratante",
    description: (name: string) =>
      `Estás contratando el producto <b>&nbsp;${name.trim()}</b>, ingresa los datos de tu empresa como contratante`,
  },
  customer: {
    title: "Contratante",
    description: (name: string) =>
      `Estás contratando el producto <b>&nbsp;${name.trim()}</b>, ingresa tus datos como contratante y asegurado principal`,
  },
  donor: {
    title: "Donador",
    description: (name: string) =>
      `Estás realizando una donación, ingresa tus datos como donador y luego presiona <b>&nbsp;Registrar</b>`,
  },
  insured: {
    title: "Asegurados",
    description:
      "Ingrese a continuación los datos de los asegurados o seleccione la opción de subida mediante planilla Excel, al concluír presione Continuar",
  },
  Beneficiary: {
    title: "Beneficiarios",
    description: (beneficiaries: number) =>
      `Puede agregar hasta ${beneficiaries} beneficiarios a su plan, ingreselos a continuación y al concluír, presione Continuar`,
  },
  Insured: {
    title: "Asegurados",
    description: `Puede agregar los asegurados que desee al servicio, ingreselos a continuación y al concluír, presione Continuar`,
  },
  payment: {
    title: "Pago",
    description:
      "Revise la información a continuación y de clic sobre los totales y acuerdos para proceder al pago",
  },
};

export default texts;
