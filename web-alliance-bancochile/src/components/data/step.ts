export interface StepProps {
  number: number;
  title: string;
  iconColor: string;
  boldWords?: { text: string; color: string }[];
  contactInfo?: string;
  showLineVer?: boolean;
}

export const stepData = [
  {
    number: 1,
    title:
      "¿Tuviste un imprevisto en salud, hogar o con tu mascota? Activa tu asistencia llamando al <strong>6000860580</strong> opción 2 y nuestros ejecutivos te guiarán.",
    iconColor: "#03495C",
    showLineVer: false,
    boldWords: [
      {
        text: "imprevisto",
        color: "#B4CD25",
      },
      {
        text: "6000860580",
        color: "#03495C",
      },
    ],
  },
  {
    number: 2,
    title:
      "Podrás obtener un <strong>descuento automático</strong> en tu asistencia de salud, utilizando tu huella con el sistema I-MED.",
    iconColor: "#1161CB",
    showLineVer: true,
    boldWords: [
      {
        text: "descuento automático",
        color: "#B4CD25",
      },
    ],
  },
  {
    number: 3,
    title:
      "En el caso de no usar el servicio IMED, los valores que correspondan al descuento de tu asistencia utilizada, serán <strong>reintegrados a tu cuenta personal.</strong>",
    iconColor: "#E84155",
    showLineVer: true,
    boldWords: [
      {
        text: "reintegrados a tu cuenta personal",
        color: "#B4CD25",
      },
    ],
  },
  {
    number: 4,
    title:
      "Solo debes enviar toda la documentación correspondiente al mail <strong>hola@serviclick.cl</strong>, antes de <strong>72 horas hábiles.</strong>",
    iconColor: "#F9B617",
    showLineVer: true,
    boldWords: [
      {
        text: "hola@serviclick.cl",
        color: "#B4CD25",
      },
      {
        text: "72 horas hábiles",
        color: "#03495C",
      },
    ],
  },
];
