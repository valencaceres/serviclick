import PDFDocument from "pdfkit-table";
import fs from "fs";
import { mdToPdf } from "md-to-pdf";

import {
  pdfNewDocument,
  pdfTextLine,
  pdfTable,
  pdfHeaderAndFooter,
  pdfEnd,
} from "../utils/pdf";
import { linesFromTextFile } from "../utils/text";

const createContract: any = async (
  correlative: string,
  date: string,
  contact: any,
  customer: any,
  plan: any,
  res: any
) => {
  try {
    const {
      name: customerName,
      birthDate,
      email,
      phone,
      rut,
      address,
      district,
    } = customer;
    const { name: planName, coverages } = plan;
    const { phone: contactPhone, email: contactEmail } = contact;

    const title1 =
      "Contrato de prestación de servicios & Certificado de cobertura en asistencia";
    const title2 = "Plan";
    const title3 = `${planName}`;

    const paragraph = `En Santiago a ${date}, comparecen a celebrar el presente contrato de prestación de servicios, por una parte, en adelante el PRESTADOR; MHM SERVICIOS SPA, Rut 76.721.251-8, reordenada en este acto por don CARLOS MOLINA MELLA, chileno, empresario. cédula de identidad 18.810.429-1, ambos con domicilio para estos efectos en calle Enrique Mac Iver 440 piso 7 oficina 702, comuna y ciudad de Santiago; y por otra parte, en adelante el cliente don o (a) ${customerName}, chileno, fecha de nacimiento ${birthDate}, correo electrónico ${email}, teléfono  de contacto ${phone}, cédula de identidad ${rut}, con domicilio para estos efectos en ${address}, comuna de ${district}.`;

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
        title: "NOMBRE DEL PLAN & PRESTACIONES.",
        paragraphs: [
          `Nombre del plan: ${planName}.`,
          `Prestación: ${coverages}.`,
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
          `Por medio del presente instrumento, la empresa MHM SERVICIOS SPA, otorga certificado de cobertura número ${correlative}, al cliente don (a) ${customerName} antes ya identificado en la presuma del presente instrumento. El presente certificado cuenta con una vigencia de una año, esta vigencia podrá ser renovada o terminada de acuerda a la vigencia del presente contrato de prestación de servicios.`,
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
        name: "SÉPTIMO:",
        title: "RESPONSABILIDAD EMPRESARIAL DE LAS PERSONAS JURÍDICAS.",
        paragraphs: [
          "Ripley, en cumplimiento con las leyes y regulaciones vigentes que le rigen, cuenta con políticas y procedimientos, cuyo objetivo es controlar y evitar la comisión de hechos constitutivos de delito, mitigar los riesgos asociados a su actividad y garantizar un entorno seguro para la compañía, sus colaboradores y sus clientes. En atención a ello, el proveedor entiende que, el incumplimiento de sus obligaciones contractuales puede causar un daño económico o un perjuicio reputacional al cliente. En consideración a lo anterior, el Proveedor, en el ejercicio de su actividad, y en particular en aquellas relativas al contrato que lo vincula con la Compañía se compromete a:",
          "a) Cumplir con las disposiciones establecidas en la Ley Nº20.393 de Responsabilidad Penal de la Persona Jurídica.",
          "b) Cumplir, de buena fe, el contrato suscrito con el cliente.",
          "c) Regir su actuar, y el de todos sus colaboradores, según los más altos estándares éticos.",
          "d) Respetar las cláusulas de reserva y confidencialidad establecidas en el contrato.",
          "e) En caso de ser aplicable, actuar con apego a la normativa de Protección al Consumidor.",
          "f) Gestionar e informar, de la forma más expedita posible, los conflictos de interés que puedan afectar la relación contractual.",
          "g) Velar por el cumplimiento de la normativa de Protección de Datos Personales.",
          "h) Velar por el cumplimiento de la normativa de Libre Competencia.",
          "i) Velar por el cumplimiento de todas las leyes y regulaciones aplicables al servicio y/o producto contratado.",
          "j) Denunciar e informar a la Compañía, tan pronto se tome conocimiento, toda conducta que sea contraria a lo establecido precedentemente.",
          "En cumplimiento de la normativa sobre Responsabilidad Penal de la Persona Jurídica, con respecto a los delitos de Lavado de Activos, Financiamiento del Terrorismo, Cohecho, Receptación, Corrupción entre Particulares, Apropiación Indebida, Administración Desleal, Negociación Incompatible, y otros delitos que establezcan la normativa aplicable, MHM SERVICIOS cuenta con un Modelo de Prevención de Delitos, a través del cual, busca asegurar una estructura organizacional, recursos, políticas, procesos y procedimientos que permitan prevenir la comisión de los delitos de la Ley.",
        ],
      },
      {
        name: "OCTAVO:",
        title: "VIGENCIA DEL CONTRATO.",
        paragraphs: [
          "El presente Contrato tendrá una duración de un año a partir de la fecha de celebración del presente instrumento, el cual corresponde a la fecha efectiva de inicio de la prestación de los Servicios. No obstante, lo anterior, el prestador podrá unilateralmente, sin expresión de causa y en cualquier momento ponerle término, sin necesidad de declaración judicial, mediante una comunicación escrita despachada al domicilio señalado por el cliente cuando este no cumpla con la obligación de pago suscrita en el presente instrumento, esta comunicación se podrá realizar 10 días en forma posterior al pago. Con todo el presente contrato podrá ser renovado con por periodos iguales y sucesivos salvo que ninguna de las partes manifieste por termino al mismo con a lo menos 60 días de anticipación al termino contractual. En el ejercicio de este derecho por parte de MHM SERVCIOS, no generará a favor del Proveedor pago alguno por concepto de indemnización, daños, perjuicios u otro concepto. En el legítimo derecho de retracto por parte del cliente este podrá solicitar la terminación anticipada solo si posee más del 90% de los pagos por concepto del valor del servicio, con alómenos 30 días de anticipación por medio de carta certificada enviada al domicilio del prestador.",
        ],
      },
      {
        name: "NOVENO:",
        title: "RESPONSABILIDAD E INDEMNIDADES.",
        paragraphs: [
          "a) El Proveedor será siempre responsable por la prestación del Servicio, bajo las condiciones y niveles que se acuerden en los respectivos Términos y Condiciones Especiales de los Servicios.",
          "b) De la misma forma, cualquier daño indirecto que MHM SERVICIOS, por acciones y omisiones, culpables o negligentes que resulten del ejecutor del servicio o servicios, cometidos por sus funcionarios o los terceros que subcontrate, MHM no será responsable de el o los daños causado, por lo que no responderá por daño emergente, lucro cesante ni daño moral.",
          "c) MHM SERVICIOS no será responsable por la negligencia del actuar medico durante la urgencia media.",
        ],
      },
      {
        name: "DECIMO:",
        title: "DISIPACIONES VARIAS.",
        paragraphs: [
          "a) Indivisibilidad. Las Partes declaran el carácter indivisible de todas y cada una de las cláusulas y obligaciones señaladas en el presente instrumento. En este sentido, MHM podrá exigir el cumplimiento total de cada una de las obligaciones.",
          `b) Comunicaciones: Cualquier comunicación entre las Partes se hará por escrito y a través de las personas designadas para tal efecto, en consecuencia, el teléfono de contacto es ${contactPhone}, o al correo electrónico ${contactEmail}.`,
          "c) Personería: la personería de don Carlos Molina Mella, consta en la escritura pública de fecha 05 de abril del año 2017, bajo la modalidad de empresas en un día, dependiente del Ministerio de Economía, Fomento y Turismo.",
          "d) Anexo: se deja expresa constancia que las condiciones, prestaciones y exclusiones de la asistencia contratada, se encentran expresadas en el anexo número 1 de condiciones, prestaciones y exclusiones de la asistencia, el cual forma parte integral del presente instrumento privado.",
          "e) Ejemplares: el presente instrumento en conjunto con sus anexos correspondientes se firmará en dos copias del mismo tenor.",
          "f) Domicilio y solución de controversias: las partes de común acuerdo fijan domicilio jurisdiccional en la comuna y ciudad de Santiago. Cualquier dificultad o controversia que se produzca entre los contratantes respecto de la aplicación, interpretación, duración, validez o ejecución de este Contrato o de cualquiera de los Documentos Contractuales, o cualquier otro motivo, será sometida a la competencia de los Tribunales Ordinarios de Justicia.",
        ],
      },
    ];

    const hMargin = 70;
    const paragraphWidth = 612 - hMargin * 2;

    const doc = new PDFDocument({
      size: "LETTER",
      margins: {
        top: 100,
        bottom: 70,
        left: hMargin,
        right: hMargin,
      },
      bufferPages: true,
    });

    doc.pipe(fs.createWriteStream("./output/contract.pdf"));

    doc.font("Times-Bold", 12);
    doc.text(`${title1}`, hMargin, 100, {
      width: paragraphWidth,
      align: "center",
    });

    doc.moveDown();
    doc.font("Times-Roman", 12);
    doc.text(`${title2}`, {
      width: paragraphWidth,
      align: "center",
    });

    doc.moveDown();
    doc.text(`${title3}`, {
      width: paragraphWidth,
      align: "center",
    });

    doc.moveDown();
    doc.text(`${paragraph}`, {
      width: paragraphWidth,
      align: "justify",
    });

    articles.map((article) => {
      doc.moveDown();
      doc
        .font("Times-Bold", 12)
        .text(article.name + " ", { continued: true })
        .font("Times-Roman", 12)
        .text(article.title, {
          continued: false,
          width: paragraphWidth,
          align: "justify",
        });

      article.paragraphs.map((item) => {
        doc.moveDown();
        doc.text(`${item}`, {
          width: paragraphWidth,
          align: "justify",
        });
      });
    });

    const companySign = ["P.p.", "MHM SERVICIOS SPA", "Rut 76.721.251-8"];
    const customerSign = ["Cliente", customerName, `Rut ${rut}`];

    const signWidth = 210;

    doc
      .moveTo(hMargin, 660)
      .lineTo(hMargin + signWidth, 660)
      .stroke();
    doc.font("Times-Bold", 12);

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

    const range = doc.bufferedPageRange();

    for (let i = 0; i < range.start + range.count; i++) {
      doc.switchToPage(i);

      doc.image("./img/logo.jpg", hMargin, 40, {
        fit: [121, 25],
        align: "center",
        valign: "center",
      });

      const pageNumber = `Página ${i + 1} de ${range.count}`;

      var widthText = doc.widthOfString(pageNumber);

      doc
        .font("Times-Bold", 12)
        .text(pageNumber, hMargin + (paragraphWidth - widthText) / 2, 740, {
          lineBreak: false,
        });
    }

    doc.flushPages();

    doc.pipe(res);
    doc.end();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const createAnnex: any = async (contact: any, plan: any, res: any) => {
  try {
    const { coverages } = plan;

    const pdf = pdfNewDocument("./output/medical_emergency_pro.pdf");
    const lines = linesFromTextFile("./annexes/medical_emergency_pro.txt");

    lines.forEach((line) => {
      if (line === "<<COVERAGES>>") {
        pdfTable(
          pdf,
          [
            { label: "Cobertura", property: "name", width: 150 },
            { label: "Monto", property: "amount", width: 100, align: "right" },
            {
              label: "Límite",
              property: "maximum",
              width: 115,
              align: "center",
            },
            { label: "Inicio", property: "lack", width: 50, align: "center" },
            {
              label: "Eventos",
              property: "events",
              width: 55,
              align: "center",
            },
          ],
          coverages
        );
      } else {
        pdfTextLine(
          pdf,
          processLine(line, contact, plan),
          line.includes("<c>") ? "center" : "justify",
          line.includes("<b>"),
          true
        );
      }
    });

    pdfHeaderAndFooter(pdf);
    pdfEnd(pdf, res);
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const processLine = (line: string, contact: any, plan: any) => {
  const { phone, email, web } = contact;
  const { validityInit, name } = plan;

  line = line.replace("<<PLAN_NAME>>", name);
  line = line.replace("<<PHONE>>", phone);
  line = line.replace("<<EMAIL>>", email);
  line = line.replace("<<WEB>>", web);
  line = line.replace("<<VALIDITY_INIT>>", validityInit);
  line = line.replace("<b>", "");
  line = line.replace("<c>", "");

  return line;
};

export { createContract, createAnnex };
