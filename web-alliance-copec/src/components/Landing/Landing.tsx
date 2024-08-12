import { Card, CardStep, Cover, Wrapper } from "@/components";
import CopecImage from "./images/copec.png";
import MhmEmpresas from "./images/mhm-empresas.png";
import ServiclickImage from "./images/serviclick.png";
import ProDefensaImage from "./images/pro-defensa.png";
import ProAssistImage from "./images/pro-assist.png";
import ServiTradeImage from "./images/servi-trade.png";
import ProCallImage from "./images/pro-call.png";
import MhmImage from "./images/mhm.png";
import MhmEmpresaBig from "./images/mhm-empresas-big.png";
import MhmBig from "./images/mhm-big.png";
import ServiclickBigImage from "./images/serviclick-big.png";
import ServiTradeBigImage from "./images/servitrade-big.png";
import ProAssistBigImage from "./images/proassist-big.png";
import ProCallBigImage from "./images/procall-big.png";
import ProDefensaBigImage from "./images/prodefensa-big.png";
import Image from "next/image";
interface Props {
  initialData: any;
}

export const Landing = ({ initialData }: Props) => {
  return (
    <>
      <Cover />
      <div className="bg-yellow-500"></div>
      <Wrapper>
        <header className="py-8 lg:py-16 text-base sm:text-2xl lg:text-4xl">
          <p className="text-center">
            Suscribe hoy tu Asistencia por solo <b>$12.000</b> al año.
          </p>
          <p className="text-center mb-4 lg:mb-16">
            <b>¡Muévete Protegido!</b>
          </p>
          <h2 className="text-center text-xl lg:text-5xl">
            <b>¡Elige tu beneficio!</b>
          </h2>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 lg:mb-32">
          {initialData.map((data: any, i: number) => (
            <Card
              index={i}
              key={`card-${i}`}
              title={data.name}
              price={data.price}
              assistances={data.assistances}
              productId={data.id}
              hiringConditions={data.hiring_conditions}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:space-y-8">
          <h2 className="text-center text-xl lg:text-5xl mb-8 md:mb-0">
            <b>¿Cómo funciona mi Asistencia?</b>
          </h2>
          <CardStep step={1} color="sky-800">
            ¿Tuviste un <b className="text-laiki">imprevisto</b> en salud, hogar
            o con tu mascota? Activa tu asistencia llamando al <b>6000860580</b>{" "}
            opción 2 y nuestros ejecutivos te guiarán.
          </CardStep>
          <CardStep step={2} reverse={true} color="copec">
            Podrás obtener un <b className="text-laiki">descuento automático</b>{" "}
            en tu asistencia de salud, utilizando tu huella con el sistema
            I-MED.
          </CardStep>
          <CardStep step={3} color="secondary">
            En el caso de no usar el servicio IMED, los valores que corresponda
            al descuento de tu asistencia utilizada, serán{" "}
            <b className="text-laiki">reintegrados a tu cuenta personal.</b>
          </CardStep>
          <CardStep step={4} color="yellow-500" reverse={true}>
            Solo debes enviar toda la documentación correspondiente al mail{" "}
            <b className="text-laiki">hola@serviclick.cl</b>, antes de{" "}
            <b>72 horas hábiles.</b>
          </CardStep>
        </div>
        <div className="pt-12 md:pt-20">
          <h2 className="uppercase text-center text-xl md:text-4xl md:normal-case">
            Beneficio exclusivo con:
          </h2>
          <div className="flex justify-center">
            <Image
              src={CopecImage.src}
              width={327}
              height={173}
              alt="Logo de Copec Empresa"
              className="w-[304px] md:w-[327px]"></Image>
          </div>
        </div>
        <div className="pt-4 md:hidden mb-16">
          <h2 className="font-bold text-center">
            Serviclick es parte de MHM Empresas
          </h2>
          <div className="flex flex-col items-center">
            <Image
              src={MhmEmpresas.src}
              width={165}
              height={54}
              alt="Logo MHM Empresas"
              className="my-4"></Image>
            <div>
              <Image
                src={ServiclickImage.src}
                width={177}
                height={24}
                alt="Logo MHM Empresas"
                className="mb-4"></Image>
              <Image
                src={ProDefensaImage.src}
                width={226}
                height={25}
                alt="Logo MHM Empresas"
                className="mb-4"></Image>
              <Image
                src={ProAssistImage.src}
                width={192}
                height={24}
                alt="Logo MHM Empresas"
                className="mb-4"></Image>
              <Image
                src={ServiTradeImage.src}
                width={213}
                height={25}
                alt="Logo MHM Empresas"
                className="mb-4"></Image>
              <Image
                src={ProCallImage.src}
                width={161}
                height={25}
                alt="Logo MHM Empresas"
                className="mb-4"></Image>
              <Image
                src={MhmImage.src}
                width={109}
                height={24}
                alt="Logo MHM Empresas"></Image>
            </div>
          </div>
        </div>
        <div className="pt-4 hidden md:block mb-16">
          <h2 className="font-bold text-center text-2xl max-w-xs bg-white mx-auto -mb-8 z-10 relative">
            Serviclick es parte de MHM Empresas
          </h2>
          <div className="flex flex-col items-center border border-sky-800 border-4 rounded-3xl">
            <Image
              src={MhmEmpresaBig.src}
              width={461}
              height={116}
              alt="Logo MHM Empresas"
              className="mt-16"></Image>
            <div className="p-16 space-x-8">
              <div className="flex items-center justify-center">
                <Image
                  src={MhmBig.src}
                  width={431}
                  height={106}
                  alt="Logo MHM Empresas"></Image>
                <Image
                  src={ServiclickBigImage.src}
                  width={237}
                  height={32}
                  alt="Logo MHM Empresas"></Image>
              </div>
              <div className="flex items-center space-x-8 flex-wrap justify-center">
                <Image
                  src={ServiTradeBigImage.src}
                  width={236}
                  height={53}
                  alt="Logo MHM Empresas"></Image>
                <Image
                  src={ProAssistBigImage.src}
                  width={215}
                  height={66}
                  alt="Logo MHM Empresas"></Image>
                <Image
                  src={ProCallBigImage.src}
                  width={218}
                  height={53}
                  alt="Logo MHM Empresas"></Image>
                <Image
                  src={ProDefensaBigImage.src}
                  width={282}
                  height={49}
                  alt="Logo MHM Empresas"></Image>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
