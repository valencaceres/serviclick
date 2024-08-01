import { Url } from "next/dist/shared/lib/router/router";

export interface Assistance {
  id: string;
  name: string;
  small_description?: string;
  amount: number;
  currency: string;
  maximum: string;
  events: number;
  lack: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  price: number;
  discount: number;
  beneficiary_price: number;
  color: string;
  hiring_conditions: string;
  pdf_url: string;
  buttonURL: string;
  assistances: Assistance[];
}
export const productData = [
  {
    id: "001",
    name: "Salud Integral familiar",
    description: "",
    basePrice: 20271,
    price: 14190,
    discount: 30,
    beneficiary_price: 0,
    color: "#1161CB",
    buttonURL:"productos.serviclick.cl/contractor?productPlanId=001",
    hiring_conditions:
      "Verificar carencia de asistencia al descargar brochure. Restricción edad contratante es de los 18 años hasta 69 años 182 días.",
    pdf_url:
      "https://library.e.abb.com/public/6fcebe5a40171604c125710d002fa400/2CDC110038B0203.pdf",
    assistances: [
      {
        id: "A001",
        name: "Atención de Urgencia",
        amount: 9,
        currency: "U",
        maximum: "",
        events: 12,
        lack: 45,
      },
      {
        id: "A002",
        name: "Hospitalización",
        amount: 9,
        currency: "U",
        maximum: "",
        events: 2,
        lack: 45,
      },
      {
        id: "A003",
        name: "Atención Ambulatoria",
        small_description: "General- Pediátrica-Oncológica- Exámenes",
        amount: 2,
        currency: "U",
        maximum: "100%",
        events: 3,
        lack: 45,
      },
      {
        id: "A004",
        name: "Telemedicina",
        small_description: "General-Infantil - Nutricional-Kinesiología",
        amount: 0,
        currency: "",
        maximum: "100%",
        events: 3,
        lack: 45,
      },
      {
        id: "A005",
        name: "Descuento en farmacia",
        amount: 15000,
        currency: "P",
        maximum: "50% descuento",
        events: 12,
        lack: 45,
      },
      {
        id: "A006",
        name: "Otros beneficios",
        amount: 0,
        currency: "",
        maximum: "100% descuento",
        events: 3,
        lack: 45,
      },
    ],
  },
  {
    id: "002",
    name: "Mascota Pro",
    description: "",
    basePrice: 9557,
    price: 6990,
    discount: 30,
    color: "#B4CD1B",
    beneficiary_price: 0,
    buttonURL:"productos.serviclick.cl/contractor?productPlanId=002",
    hiring_conditions:
      "Verificar carencia de asistencia al descargar brochure. Nuestra Asistencia es exclusiva para perros y gatos. Las edades de ingreso son 0 años hasta los 9 años con 365 días, si se supera la edad con el contrato activo, no podrá seguir haciendo uso de los beneficios posterior a los 11 años con 182 días de edad. Somos de libre elección",
    pdf_url:
      "https://library.e.abb.com/public/6fcebe5a40171604c125710d002fa400/2CDC110038B0203.pdf",

    assistances: [
      {
        id: "B001",
        name: "Consulta veterinaria",
        amount: 3,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "B002",
        name: "Descuento en Farmacias",
        amount: 15000,
        currency: "P",
        maximum: "50% descuento",
        events: 12,
        lack: 45,
      },
      {
        id: "B003",
        name: "Telemedicina Veterinaria",
        amount: 0,
        currency: "",
        maximum: "100%",
        events: 3,
        lack: 45,
      },
      {
        id: "B004",
        name: "Vacuna Antirrábica",
        amount: 5,
        currency: "U",
        maximum: "",
        events: 1,
        lack: 45,
      },
      {
        id: "B005",
        name: "Descuento en Exámenes",
        amount: 2,
        currency: "U",
        maximum: "60% descuento",
        events: 2,
        lack: 45,
      },
      {
        id: "B006",
        name: "Radiografía",
        small_description: "(vistas- placas)",
        amount: 1,
        currency: "U",
        maximum: "",
        events: 2,
        lack: 45,
      },
      {
        id: "B007",
        name: "Consulta Dermatológica y Cardiológica",
        amount: 5,
        currency: "U",
        maximum: "",
        events: 12,
        lack: 45,
      },
      {
        id: "B008",
        name: "Cremación",
        amount: 1,
        currency: "U",
        maximum: "",
        events: 1,
        lack: 45,
      },
      {
        id: "B009",
        name: "Asistencia Legal Telefónica ",
        amount: 0,
        currency: "",
        maximum: "100%",
        events: 4,
        lack: 45,
      },
    ],
  },
  {
    id: "003",
    name: "Hogar Pro",
    description: "",
    basePrice: 5415,
    price: 3790,
    discount: 30,
    color: "#E84155",
    beneficiary_price: 0,
    buttonURL:"productos.serviclick.cl/contractor?productPlanId=003",
    hiring_conditions:
      "Verificar carencia de asistencia al descargar brochure. Nuestra Asistencia es exclusiva con los profesionales que designamos para realizar las prestaciones del servicio.",
    pdf_url:
      "https://library.e.abb.com/public/6fcebe5a40171604c125710d002fa400/2CDC110038B0203.pdf",

    assistances: [
      {
        id: "C001",
        name: "Plomería",
        amount: 15,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "C002",
        name: "Electricidad",
        amount: 15,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "C003",
        name: "Cerrajería",
        amount: 15,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "C004",
        name: "Vidriería",
        amount: 15,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "C005",
        name: "Instalación Luminaria",
        amount: 1,
        currency: "U",
        maximum: "",
        events: 2,
        lack: 45,
      },
      {
        id: "C006",
        name: "Instalación Cortinas",
        amount: 1,
        currency: "U",
        maximum: "",
        events: 3,
        lack: 45,
      },
      {
        id: "C007",
        name: "Perforación en Muros",
        amount: 0,
        currency: "",
        maximum: "100%",
        events: 12,
        lack: 45,
      },
    ],
  },
];
