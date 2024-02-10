import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "../icons"

export const Details = () => {
  const [selected, setSelected] = useState("insurance")

  return (
    <>
      <Accordion
        className="w-full max-w-4xl xl:hidden"
        type="single"
        collapsible
      >
        <AccordionItem value="insurance">
          <AccordionTrigger>
            <div className="flex w-full items-center gap-2 text-xl">
              <Icons.building />
              Industria seguros
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Asóciate con Serviclick y colabora con las empresas líderes en
            Seguros, Banca y Retail. Juntos, revolucionaremos la industria de
            Asistencias Masivas, posicionándonos como el motor principal que
            impulsa su crecimiento y evolución.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pymes">
          <AccordionTrigger>
            <div className="flex w-full items-center gap-2 text-xl">
              <Icons.store />
              PYMES & MYPYMES
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Ofrecemos servicios de asistencia y protección de alta calidad, de
            acceso inmediato y con total libertad de elección. Nuestro
            compromiso es contribuir a la tranquilidad tanto de sus
            colaboradores como de sus familias. Somos más que un proveedor de
            servicios; somos un aliado estratégico que fortalece la lealtad y la
            satisfacción de su fuerza laboral.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="commercial-insurance">
          <AccordionTrigger>
            <div className="flex w-full items-center gap-2 text-xl">
              <Icons.share />
              Seguros comerciales
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Disponemos del plan comercial óptimo para distribuidores, brokers y
            agentes comerciales. Poseemos una unidad de canales comerciales
            especializada y dedicada a ofrecerles atención preferencial. Somos
            la solución de asistencia más destacada: completamente digital,
            multicanal y enfocada en el cliente. Nuestro servicio eficiente y de
            alta calidad se proporciona siempre de forma oportuna, satisfaciendo
            las necesidades de nuestros socios comerciales.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="network">
          <AccordionTrigger>
            <div className="flex w-full items-center gap-2 text-xl">
              <Icons.users />
              Prestadores & Redes de apoyo
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Forma parte de nuestra extensa red de colaboradores. Para más
            información, contáctanos al 600 0860 580 o a través de nuestro
            WhatsApp al +56939325099 y uno de nuestros ejecutivos estará
            encantado de asistirte.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Tabs
        value={selected}
        onValueChange={setSelected}
        className="hidden w-full xl:block"
      >
        <TabsList className="flex flex-row gap-0.5">
          <TabsTrigger
            className="flex flex-col gap-2 p-0 text-lg md:max-w-full xl:max-w-[265px] 2xl:max-w-[300px]"
            value="insurance"
          >
            <div className=" h-full w-full  p-0 ">
              <div className="flex justify-center  bg-white">
                <Icons.building
                  width={50}
                  height={50}
                  color={selected === "insurance" ? "#03495C" : "#D9D9D9"}
                />{" "}
              </div>
              <div> Industria seguros</div>
            </div>

            <div className="flex h-[20px] w-full justify-center bg-background">
              {selected === "insurance" && <Icons.triangle />}
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col gap-2 p-0 text-lg md:max-w-full xl:max-w-[265px] 2xl:max-w-[300px]"
            value="pymes"
          >
            <div className=" h-full w-full  p-0 ">
              <div className="flex justify-center  bg-white">
                <Icons.store
                  width={50}
                  height={50}
                  color={selected === "pymes" ? "#03495C" : "#D9D9D9"}
                />{" "}
              </div>
              <div>PYMES & MYPYMES</div>
            </div>
            <div className="flex h-[20px] w-full justify-center bg-background">
              {selected === "pymes" && <Icons.triangle />}
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col gap-2 p-0 text-lg md:max-w-full
            xl:max-w-[265px] 2xl:max-w-[300px]"
            value="commercial-insurance"
          >
            <div className=" h-full w-full p-0 ">
              <div className="flex justify-center bg-white">
                <Icons.share
                  width={50}
                  height={50}
                  color={
                    selected === "commercial-insurance" ? "#03495C" : "#D9D9D9"
                  }
                />{" "}
              </div>
              <div> Seguros comerciales</div>
            </div>

            <div className="flex h-[20px] w-full justify-center bg-background">
              {selected === "commercial-insurance" && <Icons.triangle />}
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex flex-col gap-2 p-0 text-lg md:max-w-full xl:max-w-[265px] 2xl:max-w-[300px]"
            value="network"
          >
            <div className=" h-full w-full p-0 ">
              <div className="flex justify-center bg-white">
                <Icons.users
                  width={50}
                  height={50}
                  color={selected === "network" ? "#03495C" : "#D9D9D9"}
                />{" "}
              </div>
              <div> Prestadores & Redes de apoyo</div>
            </div>

            <div className="flex h-[20px] w-full justify-center bg-background">
              {selected === "network" && <Icons.triangle />}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="insurance" className="p-4 xl:mx-16">
          Asóciate con Serviclick y colabora con las empresas líderes en
          Seguros, Banca y Retail. Juntos, revolucionaremos la industria de
          Asistencias Masivas, posicionándonos como el motor principal que
          impulsa su crecimiento y evolución.
        </TabsContent>
        <TabsContent value="pymes" className="p-4 xl:mx-16">
          Ofrecemos servicios de asistencia y protección de alta calidad, de
          acceso inmediato y con total libertad de elección. Nuestro compromiso
          es contribuir a la tranquilidad tanto de sus colaboradores como de sus
          familias. Somos más que un proveedor de servicios; somos un aliado
          estratégico que fortalece la lealtad y la satisfacción de su fuerza
          laboral.
        </TabsContent>
        <TabsContent value="commercial-insurance" className="p-4 xl:mx-16">
          Disponemos del plan comercial óptimo para distribuidores, brokers y
          agentes comerciales. Poseemos una unidad de canales comerciales
          especializada y dedicada a ofrecerles atención preferencial. Somos la
          solución de asistencia más destacada: completamente digital,
          multicanal y enfocada en el cliente. Nuestro servicio eficiente y de
          alta calidad se proporciona siempre de forma oportuna, satisfaciendo
          las necesidades de nuestros socios comerciales.
        </TabsContent>
        <TabsContent value="network" className="p-4 xl:mx-16">
          Forma parte de nuestra extensa red de colaboradores. Para más
          información, contáctanos a través de nuestro WhatsApp al +56939325099
          y uno de nuestros ejecutivos estará encantado de asistirte.
        </TabsContent>
      </Tabs>
    </>
  )
}
