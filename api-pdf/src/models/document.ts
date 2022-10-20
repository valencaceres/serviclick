import dirPath from "path";

import {
  pdfNewDocument,
  pdfTextLine,
  pdfTable,
  pdfHeaderAndFooter,
  pdfEnd,
} from "../utils/pdf";
import { normalizeFileName } from "../utils/text";

const createContract: any = async (
  lead_id: string,
  correlative: string,
  date: string,
  contact: any,
  company: any,
  customer: any,
  plan: any
) => {
  try {
    const { name: planName, coverages, price } = plan;
    const { phone: contactPhone, email: contactEmail } = contact;

    const title1 =
      "Contrato de prestación de servicios & Certificado de cobertura en asistencia";
    const title2 = "Plan";
    const title3 = `${planName}`;

    const paragraph = `En Santiago a ${date}, comparecen a celebrar el presente contrato de prestación de servicios, por una parte, en adelante el PRESTADOR; MHM SERVICIOS SPA, Rut 76.721.251-8, reordenada en este acto por don CARLOS MOLINA MELLA, chileno, empresario. cédula de identidad 18.810.429-1, ambos con domicilio para estos efectos en calle Enrique Mac Iver 440 piso 7 oficina 702, comuna y ciudad de Santiago; y por otra parte, en adelante el cliente ${
      company
        ? company.companyName
        : `don o (a) ${customer.name}, chileno, fecha de nacimiento ${customer.birthDate}`
    }, correo electrónico ${
      company ? company.email : customer.email
    }, teléfono  de contacto ${
      company ? company.phone : customer.phone
    }, cédula de identidad ${
      company ? company.rut : customer.rut
    }, con domicilio para estos efectos en ${
      company ? company.address : customer.address
    }, comuna de ${company ? company.district : customer.district}.`;

    const priceFormatted = parseFloat(price)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(".0", "");

    const anuallyFormatted = (parseFloat(price) * 12)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(".0", "");

    const articles = [
      {
        name: "PRIMERO:",
        title: "OBJETO CONTRACTUAL Y DECLARACIONES.",
        paragraphs: [
          `Por medio del presente instrumento privado de prestación de servicios en asistencia y certificado de cobertura en asistencia las partes en adelante el prestador y el cliente regularán todo lo relacionado con la asistencia en plan ${planName}. De acuerdo las declaraciones comerciales MHM declara en forma irrevocable.`,
          "a) Es una sociedad vigente y constituida válidamente, que además cuenta con los poderes y facultades suficientes para poder obligarse a través del presente Contrato;",
          "b) Que no existe acuerdo alguno que tenga por objeto ponerle fin a la sociedad, y que tampoco existe alguna petición, procedimiento o solicitud que tenga por objetivo la liquidación o disolución de la sociedad.",
          "c) Que goza de todos los permisos, autorizaciones, concesiones, y licencias necesarias para poder prestar los servicios que serán objeto de este Contrato y de los demás Documentos Contractuales.",
          "d) Que conoce, acepta y se obliga a respetar el Código de Ética de MHM SERVICIOS.",
          "e) Que cumplirá con toda la normativa legal aplicable en razón de los servicios que desarrolla, teniendo especial consideración en aspectos de libre competencia, ambientales, comerciales, laborales, previsionales y tributarios. Por lo demás, declara y garantiza que ha dado y dará cumplimiento a las normas y disposiciones relativas a las leyes aplicables sobre Responsabilidad Penal de la Empresa.",
          "f) Que cuenta con personal, medios y bienes idóneos para el correcto desarrollo de los servicios contratados.",
          "g) MHM SERICIOS SpA, acepta estas declaraciones, las que son consideradas como esenciales y necesarias para suscribir el Contrato.",
        ],
      },
      {
        name: "SEGUNDO:",
        title: "NOMBRE DEL PLAN, PRESTACIONES Y VALORES.",
        paragraphs: [
          `Nombre del plan: ${planName}.`,
          `Prestación: ${coverages}.`,
          `Fecha de inicio de la prestación: ${date}.`,
          `Valor del plan anual: $${priceFormatted}.`,
          `Cuota mensual: $${anuallyFormatted} por doce meses.`,
          `Reajustes: El reajuste será por periodos anuales según la variación del incide del precio al consumidor. Las partes establecen que este incremento no podrá ser objetado por parte del cliente.`,
        ],
      },
      {
        name: "TERCERO:",
        title: "MANEJO DE DATOS PERSONALES.",
        paragraphs: [
          "Por medio del presente instrumento el cliente autoriza a cualquier médico, hospital, clínica u otra institución o persona que tenga registros personales míos incluidos en esta declaración, para que pueda dar información solicitada por MHM SERVICIOS SPA a su vez faculto a ésta última, para que solicite o retire copias de tales antecedentes. conforme a lo señalado en la ley 19.628, relativa a la protección de la vida privada, por este acto vengo en autorizar expresamente a MHM SERVICIOS SPA a la que estoy solicitando la o (las) presente(s) asistencia(s), o quien sus derechos representen, para hacer uso de mis datos de carácter personal, así como también aquellos denominados como sensibles. esta autorización faculta a MHM SERVICIOS SPA para efectuar el tratamiento de dichos datos conforme lo expresa la norma legal señalada. Asimismo, consiento expresamente para que MHM SERVICIOS SPA tenga acceso a los contenidos o copias de las recetas médicas, análisis o exámenes de laboratorios clínicos y servicios relacionados con la salud, según lo expresa el artículo 127 del código sanitario, modificado por la ley ya citada. conforme a lo anterior, declaro haber sido informado que estos datos son para el exclusivo uso de MHM SERVICIOS SPA en el análisis del otorgamiento de asistencias, modificaciones de servicios, análisis de reclamos, investigaciones de accidentes y enfermedades y, en general todo aquello que diga relación con los contratos que celebre con MHM SERVICIOS SPA, pudiendo estos datos ser comunicados a terceros, con estos mismos fines. declaro la veracidad de lo señalado y tomo conocimiento.",
        ],
      },
      {
        name: "CUARTO:",
        title: "CERTIFICADO DE COBERTURA EN ASISTENCIA.",
        paragraphs: [
          `Por medio del presente instrumento, la empresa MHM SERVICIOS SPA, otorga certificado de cobertura número ${correlative}, al cliente don (a) ${
            company ? company.companyName : customer.name
          } antes ya identificado en la presuma del presente instrumento. El presente certificado cuenta con una vigencia de una año, esta vigencia podrá ser renovada o terminada de acuerda a la vigencia del presente contrato de prestación de servicios.`,
        ],
      },
      {
        name: "QUINTO:",
        title: "MANDATO.",
        paragraphs: [
          `Por medio del presente instrumento el cliente autoriza a MHM SERVICIOS SPA para que cargue mensualmente el monto del costo del servicio de “${planName}”, al medio de pago registrado por el cliente en la suscripción n° ${correlative}. Con todo autorizo a que las comunicaciones o notificaciones que MHM SERVICIOS SPA envíe o deba enviar en razón del contrato de prestación de servicios, y que se encuentren regulados en la ley 19.496.`,
        ],
      },
      {
        name: "SEXTO:",
        title: "SERVICIOS OFRECIDOS.",
        paragraphs: [
          "Con el objeto de prestar los Servicios, el Proveedor asignará los especialistas y los recursos que sean necesarios para la debida ejecución de los mismos. Los Servicios se entenderán terminados cuando sean aceptados conforme y sin ningún tipo de observaciones por parte de cliente. Para dichos efectos, los Servicios se entenderán “Aceptados Conforme” cuando se encuentren íntegra y satisfactoriamente ejecutados.",
        ],
      },
      {
        name: "SEPTIMO:",
        title: "VIGENCIA DEL CONTRATO.",
        paragraphs: [
          "El presente Contrato tendrá una duración de un año a partir de la fecha de celebración del presente instrumento, el cual corresponde a la fecha efectiva de inicio de la prestación de los Servicios. La fecha de inicio de la prestación es la que figura detallada en el capítulo SEGUNDO. No obstante, lo anterior, el prestador podrá unilateralmente, sin expresión de causa y en cualquier momento ponerle término, sin necesidad de declaración judicial, mediante una comunicación escrita despachada al domicilio señalado por el cliente cuando este no cumpla con la obligación de pago suscrita en el presente instrumento, esta comunicación se podrá realizar 10 días en forma posterior al pago. Con todo el presente contrato podrá ser renovado con por periodos iguales y sucesivos salvo que ninguna de las partes manifieste por termino al mismo con a lo menos 60 días de anticipación al termino contractual. En el ejercicio de este derecho por parte de MHM SERVCIOS, no generará a favor del Proveedor pago alguno por concepto de indemnización, daños, perjuicios u otro concepto. En el legítimo derecho de retracto por parte del cliente este podrá solicitar la terminación anticipada solo si posee más del 90% de los pagos por concepto del valor del servicio, con a lo menos 30 días de anticipación por medio de carta certificada enviada al domicilio del prestador.",
        ],
      },
      {
        name: "OCTAVO:",
        title: "RESPONSABILIDAD E INDEMNIDADES.",
        paragraphs: [
          "a) El Proveedor será siempre responsable por la prestación del Servicio, bajo las condiciones y niveles que se acuerden en los respectivos Términos y Condiciones Especiales de los Servicios.",
          "b) De la misma forma, cualquier daño indirecto que MHM SERVICIOS, por acciones y omisiones, culpables o negligentes que resulten del ejecutor del servicio o servicios, cometidos por sus funcionarios o los terceros que subcontrate, MHM no será responsable de el o los daños causado, por lo que no responderá por daño emergente, lucro cesante ni daño moral.",
          "c) MHM SERVICIOS no será responsable por la negligencia del actuar medico durante la urgencia media.",
        ],
      },
      {
        name: "NOVENO:",
        title: "DISIPACIONES VARIAS.",
        paragraphs: [
          "a) Indivisibilidad. Las Partes declaran el carácter indivisible de todas y cada una de las cláusulas y obligaciones señaladas en el presente instrumento. En este sentido, MHM podrá exigir el cumplimiento total de cada una de las obligaciones.",
          `b) Comunicaciones: Cualquier comunicación entre las Partes se hará por escrito y a través de las personas designadas para tal efecto, en consecuencia, el teléfono de contacto es ${contactPhone}, o al correo electrónico ${contactEmail}.`,
          "c) Personería: la personería de don Carlos Molina Mella, consta en la escritura pública de fecha 05 de abril del año 2017, bajo la modalidad de empresas en un día, dependiente del Ministerio de Economía, Fomento y Turismo.",
          "d) Anexo: se deja expresa constancia que las condiciones, prestaciones y exclusiones de la asistencia contratada, se encentran expresadas en el anexo número 1 de condiciones, prestaciones y exclusiones de la asistencia, el cual forma parte integral del presente instrumento privado.",
          "e) Domicilio y solución de controversias: las partes de común acuerdo fijan domicilio jurisdiccional en la comuna y ciudad de Santiago. Cualquier dificultad o controversia que se produzca entre los contratantes respecto de la aplicación, interpretación, duración, validez o ejecución de este Contrato o de cualquiera de los Documentos Contractuales, o cualquier otro motivo, será sometida a la competencia de los Tribunales Ordinarios de Justicia.",
        ],
      },
    ];

    const pdfPath = dirPath.join(__dirname, "../../../../", "output");

    const pdf = pdfNewDocument(
      dirPath.join(pdfPath, `contrato_${lead_id}.pdf`)
    );

    const { doc, hMargin, paragraphWidth, fontNameBold } = pdf;

    pdfTextLine(pdf, `${title1}`, "center", true, false);
    pdfTextLine(pdf, `${title2}`, "center", true, true);
    pdfTextLine(pdf, `${title3}`, "center", true, true);

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(pdf, `${paragraph}`, "justify", false, true);

    articles.map((article) => {
      pdfTextLine(pdf, ` `, "justify", true, false);
      pdfTextLine(
        pdf,
        `${article.name} ${article.title}`,
        "justify",
        true,
        true
      );
      article.paragraphs.map((item) => {
        pdfTextLine(pdf, `${item}`, "justify", false, true);
      });
    });

    const companySign = ["P.p.", "MHM SERVICIOS SPA", "Rut 76.721.251-8"];
    const customerSign = [
      company ? company.legalRepresentative : "Cliente",
      company ? company.companyName : customer.name,
      `Rut ${company ? company.rut : customer.rut}`,
    ];

    const signWidth = 210;

    doc
      .moveTo(hMargin, 660)
      .lineTo(hMargin + signWidth, 660)
      .stroke();
    doc.font(fontNameBold, 12);

    companySign.map((line: string, idx: number) => {
      doc.text(`${line}`, hMargin, 665 + idx * 15, {
        width: signWidth,
        align: "center",
      });
    });

    doc
      .moveTo(hMargin + paragraphWidth - signWidth, 660)
      .lineTo(hMargin + paragraphWidth, 660)
      .stroke();

    customerSign.map((line: string, idx: number) => {
      doc.text(
        `${line}`,
        hMargin + paragraphWidth - signWidth,
        665 + idx * 15,
        {
          width: signWidth,
          align: "center",
        }
      );
    });

    pdfHeaderAndFooter(pdf);
    pdfEnd(pdf);
    return true;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const createAnnex: any = async (data: any) => {
  try {
    const {
      lead_id,
      id,
      name,
      title,
      subTitle,
      description,
      territorialScope,
      hiringConditions,
      assistances,
    } = data;

    const pdfPath = dirPath.join(__dirname, "../../../../", "output");
    const pdf = pdfNewDocument(dirPath.join(pdfPath, `anexo_${lead_id}.pdf`));

    pdfTextLine(pdf, `ANEXO DE CONTRATO`, "center", true, false);

    pdfTextLine(
      pdf,
      `El presente documento privado es considerado por los intervinientes parte integral del contrato marco de prestación de servicios el cual se firmó con fecha 19 mes Octubre año 2022.`,
      "justify",
      false,
      true
    );

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(pdf, `1. AMBITO TERRITORIAL`, "justify", true, true);
    pdfTextLine(pdf, territorialScope, "justify", false, true);

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(pdf, `2. CONDICIONES DE CONTRATACION`, "justify", true, true);
    pdfTextLine(pdf, hiringConditions, "justify", false, true);

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(
      pdf,
      `3. SERVICIOS DE ASISTENCIA COMPRENDIDOS`,
      "justify",
      true,
      true
    );
    pdfTextLine(
      pdf,
      `La "${title} ${subTitle}" se compone de las siguientes prestaciones, las cuales fijan sus respectivos límites y topes, estableciendo así, el monto máximo de pago, en razón de las asistencias contratadas.`,
      "justify",
      false,
      true
    );

    pdfTextLine(pdf, ` `, "justify", true, false);

    pdfTable(
      pdf,
      [
        {
          label: "Cobertura",
          property: "name",
          width: 170,
          headerAlign: "center",
          valign: "center",
          columnColor: "#cccccc",
        },
        {
          label: "Límite de servicio\nanual",
          property: "maximum",
          width: 165,
          align: "center",
          headerAlign: "center",
          valign: "center",
        },
        {
          label: "Eventos anuales",
          property: "events",
          width: 70,
          align: "center",
          headerAlign: "center",
          valign: "center",
          columnColor: "#cccccc",
        },
        {
          label: "Carencia",
          property: "lack",
          width: 70,
          align: "center",
          headerAlign: "center",
          valign: "center",
        },
      ],
      assistances.map((assistance: any) => {
        return {
          name: assistance.name,
          maximum: `${assistance.maximum} ${
            assistance.amount > 0 && assistance.maximum !== ""
              ? ` con tope: `
              : ""
          }${assistance.currency === "P" && assistance.amount > 0 ? "$" : ""}${
            assistance.amount > 0
              ? parseFloat(assistance.amount)
                  .toFixed(1)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              : ""
          }${
            assistance.currency === "U" && assistance.amount > 0 ? "UF" : ""
          }`.replace(".0", ""),
          lack: assistance.lack,
          events: assistance.events === 0 ? "Ilimitado" : assistance.events,
        };
      })
    );

    assistances.map((assistance: any, idx: number) => {
      pdfTextLine(
        pdf,
        `${String.fromCharCode(97 + idx)}) ${assistance.name}`,
        "justify",
        true,
        true
      );
      pdfTextLine(pdf, `${assistance.description}`, "justify", false, false);
    });

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(pdf, `4. CONDICIONES DE SERVICIO`, "justify", true, true);

    assistances.map((assistance: any, idx: number) => {
      pdfTextLine(
        pdf,
        `4.${idx + 1}. ${assistance.name}`,
        "justify",
        true,
        true
      );

      pdfTextLine(pdf, `Prestaciones`, "justify", true, true);

      assistance.benefits.map((benefit: string, idx: number) =>
        pdfTextLine(
          pdf,
          `${String.fromCharCode(97 + idx)}) ${benefit}`,
          "justify",
          false,
          true
        )
      );

      pdfTextLine(pdf, `Exclusiones`, "justify", true, true);
      pdfTextLine(
        pdf,
        `No se realizarán las prestaciones o servicios como tampoco reconocerá gastos o costos de tales servicios en las siguientes situaciones:`,
        "justify",
        false,
        true
      );

      assistance.exclusions.map((exclusion: string, idx: number) =>
        pdfTextLine(
          pdf,
          `${String.fromCharCode(97 + idx)}) ${exclusion}`,
          "justify",
          false,
          true
        )
      );
    });

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(
      pdf,
      `5. PROCEDIMIENTO DE SOLICITUD DE PRESTACIONES`,
      "justify",
      true,
      true
    );

    pdfTextLine(
      pdf,
      `Los servicios descritos, para ser entregados por ServiClick, deben solicitarse previamente vía telefónica la número 600 086 0580, donde un ejecutivo de asistencias lo atenderá y guiará de acuerdo con la prestación solicitada.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `El cliente estará obligado a entregar la información mínima requerida para gestionar el servicio y podría incluir y no limitarse a los siguientes datos:`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `
      a. RUT del cliente Titular.
      b. Nombre del Beneficiario.
      c. Fotografía de la mascota.
      d. Detalle de la Urgencia o Emergencia veterinaria y su origen.
      e. Ubicación Geográfica.`,
      "justify",
      false,
      false
    );

    pdfTextLine(
      pdf,
      `Los servicios podrán ser solicitados desde el inicio de la vigencia, mientras el cliente se encuentre al día en los pagos.`,
      "justify",
      false,
      true
    );

    pdfTextLine(pdf, ` `, "justify", true, false);
    pdfTextLine(pdf, `6. DEFINICIONES`, "justify", true, true);

    pdfTextLine(
      pdf,
      `SERVICIO: Esta la garantía del servicio con la cual se afianza una operación en materia civil, comercial o mercantil, estableciendo los pártemelos de la operación.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `CARENCIA: Este es el tiempo en que un determinado servicio, civil, comercial o mercantil detenta un determinado derecho de uso.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `ENFERMEDAD: Alteración o desviación del estado fisiológico en una o varias partes del cuerpo de la mascota, por causas en general conocidas por el titular, donde la mascota manifiesta síntomas y signos característicos, y cuya evolución es más o menos predecible.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `ACCIDENTE: Acontecimiento, independiente de la voluntad de la mascota, causado por una fuerza extraña, de acción rápida, que se manifiesta por la aparición de lesiones orgánicas.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `ATENCIÓN DE URGENCIA: Se entiende por este concepto, cualquier servicio de emergencia que cubre la atención, traslado y comunicaciones realizadas con el fin de proveer servicios de salud veterinaria en caso de urgencia o emergencias veterinarias.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `LIMITE DE PROTECCIÓN: Es el indicador que detenta el prestador de un servicio determinado, con el cual determina el máximo valor a cubrir por cada evento.`,
      "justify",
      false,
      true
    );

    pdfTextLine(
      pdf,
      `EVENTOS: Es la ocurrencia de cada uno de los servicios contratados, el cual es fijado con anterioridad por el prestador de servicios anual.`,
      "justify",
      false,
      true
    );

    pdfHeaderAndFooter(pdf);
    pdfEnd(pdf);
    return true;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export { createContract, createAnnex };
