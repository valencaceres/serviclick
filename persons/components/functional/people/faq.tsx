"use client"

import { useState } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Icons } from "../icons"

export default function Faq() {
  return (
    <>
      <FaqAccordion />
      <FaqTabs />
    </>
  )
}

function FaqAccordion() {
  return (
    <Accordion className="block w-full xl:hidden" type="single" collapsible>
      <AccordionItem value="subscription">
        <AccordionTrigger>
          <div className="flex w-full items-center gap-2 text-xl">
            Suscripción
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                ¿Cómo obtengo mi asistencia?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Si deseas contratar nuestra asistencia, simplemente haz clic
                  en el botón "¡Lo quiero!" o contáctanos al 600 0860 580 o a
                  través de WhatsApp al número +56939325099.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">
                ¿Necesito Tarjeta de Crédito para suscribir mi asistencia?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Puedes utilizar tanto tarjetas de débito como tarjetas de
                  crédito que sean compatibles con nuestro sistema de pago
                  Webpay.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">
                ¿Tiene deducible?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>No, no hay deducible.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold">
                ¿Existe límite de edad para suscribirme?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>No tenemos límites de edad para suscripción.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="assistances">
        <AccordionTrigger>
          <div className="flex w-full items-center gap-2 text-xl">
            Asistencias
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                ¿Puedo suscribir a alguien más a la asistencia?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Sí, puedes suscribir a todas las personas que desees proteger.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">
                ¿Puedo contratar más de una asistencia?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>Sí, puedes contratar tantas asistencias como desees.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">
                ¿Debo tener una previsión de salud?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>Debes tener previsión Fonasa o Isapre.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold">
                ¿Debo contratar por un período de 12 meses obligatoriamente?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  No, nuestras Asistencias no requieren un compromiso de
                  permanencia de 12 meses. Puedes disfrutar del servicio durante
                  el tiempo que desees.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="font-bold">
                ¿Necesito ser mayor de edad para contratar?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Sí, debes ser mayor de edad y contar con una tarjeta de débito
                  o crédito para realizar el pago mensual.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="my-assistance">
        <AccordionTrigger>
          <div className="flex w-full items-center gap-2 text-xl">
            Mis asistencias
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                ¿Puedo utilizar mi Asistencia el mismo mes en que me suscribo?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Sí, puedes utilizarla durante el mismo mes de suscripción. Sin
                  embargo, es importante tener en cuenta que existe un período
                  de carencia que varía entre 15 y 25 días, dependiendo del plan
                  de contrato.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">
                ¿En qué parte del país puedo utilizar los servicios?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Puedes utilizar nuestros servicios en todo el país, excepto en
                  territorios insulares y antárticos.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">
                ¿A quién debo contactar una vez que me haya suscrito?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  Puedes comunicarte con nosotros de forma gratuita al 600 0860
                  580 o a través de WhatsApp al +56939325099.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="others">
        <AccordionTrigger>
          <div className="flex w-full items-center gap-2 text-xl">Otros</div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold">
                ¿Debo tener seguro para poder suscribirme?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p>
                  No es necesario tener un seguro, aunque nuestro servicio de
                  Asistencia funciona como complemento a cualquier seguro
                  existente.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold">
                ¿Cómo opera la Asistencia?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <p className="pb-1">
                  La Asistencia debe ser solicitada previamente a través de
                  llamada telefónica al número 600 086 0580, donde un ejecutivo
                  de asistencias te atenderá y guiará según la prestación
                  solicitada.
                </p>
                <p className="py-1">
                  El cliente debe proporcionar la información mínima requerida
                  para gestionar el servicio, que puede incluir (pero no
                  limitarse a) los siguientes datos:
                </p>
                <ul className="list-disc px-6">
                  <li>RUT del cliente titular.</li>
                  <li>Nombre del beneficiario.</li>
                  <li>Ubicación geográfica.</li>
                </ul>
                <p className="pt-1">
                  Los servicios pueden ser solicitados desde el inicio de la
                  vigencia, siempre que el cliente esté al día con los pagos.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold">
                ¿Qué cubre?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <ul className="list-disc px-3">
                    <li>Urgencia médica por enfermedad</li>
                    <li>Atención médica ambulatoria</li>
                    <li>Descuento en farmacias</li>
                    <li>Telemedicina</li>
                    <li>Urgencia veterinaria por enfermedad o accidente</li>
                    <li>Telemedicina veterinaria</li>
                    <li>Vacuna antirrábica</li>
                    <li>Asistencia plomería</li>
                  </ul>
                  <ul className="list-disc px-3">
                    <li>Asistencia electricidad</li>
                    <li>Asistencia cerrajería</li>
                    <li>Asistencia vidriería</li>
                    <li>Asistencia para neumáticos</li>
                    <li>Asistencia para amortiguadores</li>
                    <li>Asistencia al vidrio lateral del vehículo</li>
                    <li>Asistencia de cerrajería para el vehículo</li>
                    <li>Asistencia legal</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold">
                ¿Qué NO cubre?
              </AccordionTrigger>
              <AccordionContent className="font-semibold">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <ul className="list-disc px-3">
                    <li>Gastos de hospitalización</li>
                    <li>Gastos de hospitalización veterinaria</li>
                    <li>Gastos de traslado médico</li>
                    <li>
                      Servicios que no se han activado en la central de
                      asistencia
                    </li>
                    <li>Medicamentos no recetados por un médico</li>
                    <li>Devolución de gastos veterinarios sin informe</li>
                    <li>Medicamentos no recetados por un veterinario</li>
                    <li>Detección de fugas de agua</li>
                  </ul>
                  <ul className="list-disc px-3">
                    <li>Despeje de zonas afectadas</li>
                    <li>Eventos en áreas comunes</li>
                    <li>Domicilio beneficiario distinto al registrado</li>
                    <li>Electrodomésticos ni elementos eléctricos</li>
                    <li>Caderas, calefont bombas hidráulicas</li>
                    <li>Problemas eléctricos en el exterior del inmueble</li>
                    <li>Vidriería en el interior del inmueble</li>
                    <li>
                      Cerrajería en puertas que no sean de acceso principal al
                      inmueble
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function FaqTabs() {
  const [selected, setSelected] = useState("subscription")
  return (
    <Tabs
      value={selected}
      onValueChange={setSelected}
      className="hidden w-full max-w-7xl xl:block"
    >
      <TabsList className="flex max-w-7xl flex-row gap-1 p-0 2xl:gap-2  ">
        <TabsTrigger
          className="min-w-[295px] max-w-[295px] flex-col p-0 text-center 2xl:min-w-[310px] 2xl:max-w-[310px] "
          value="subscription"
        >
          <span className="py-4">Suscripción</span>
          <div className="flex h-[20px] w-full justify-center bg-background">
            {selected === "subscription" && <Icons.triangle />}
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="min-w-[295px] max-w-[295px] flex-col p-0   text-center 2xl:min-w-[310px] 2xl:max-w-[310px]"
          value="assistances"
        >
          <span className="py-4">Asistencias</span>
          <div className="flex h-[20px] w-full justify-center bg-background">
            {selected === "assistances" && <Icons.triangle />}
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="min-w-[295px] max-w-[295px] flex-col p-0   text-center 2xl:min-w-[310px] 2xl:max-w-[310px]"
          value="my-assistance"
        >
          <span className="py-4">Mis asistencias</span>
          <div className="flex h-[20px] w-full justify-center bg-background">
            {selected === "my-assistance" && <Icons.triangle />}
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="min-w-[295px] max-w-[295px] flex-col p-0   text-center 2xl:min-w-[310px] 2xl:max-w-[310px]"
          value="others"
        >
          <span className="py-4">Otros</span>
          <div className="flex h-[20px] w-full justify-center bg-background">
            {selected === "others" && <Icons.triangle />}
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="subscription">
        <Accordion
          type="single"
          className="flex flex-col gap-2 bg-white"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              ¿Cómo obtengo mi asistencia?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Si deseas contratar nuestra asistencia, simplemente haz clic en
                el botón "¡Lo quiero!" o contáctanos al 600 0860 580 o a través
                de WhatsApp al número +56939325099.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              ¿Necesito Tarjeta de Crédito para suscribir mi asistencia?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Puedes utilizar tanto tarjetas de débito como tarjetas de
                crédito que sean compatibles con nuestro sistema de pago Webpay.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              ¿Tiene deducible?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>No, no hay deducible.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              ¿Existe límite de edad para suscribirme?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>No tenemos límites de edad para suscripción.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="assistances">
        <Accordion
          type="single"
          className="flex flex-col gap-2 bg-white"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              ¿Puedo suscribir a alguien más a la asistencia?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Sí, puedes suscribir a todas las personas que desees proteger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              ¿Puedo contratar más de una asistencia?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>Sí, puedes contratar tantas asistencias como desees.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              ¿Debo tener una previsión de salud?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>Debes tener previsión Fonasa o Isapre.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              ¿Debo contratar por un período de 12 meses obligatoriamente?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                No, nuestras Asistencias no requieren un compromiso de
                permanencia de 12 meses. Puedes disfrutar del servicio durante
                el tiempo que desees.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold">
              ¿Necesito ser mayor de edad para contratar?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Sí, debes ser mayor de edad y contar con una tarjeta de débito o
                crédito para realizar el pago mensual.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="my-assistance">
        <Accordion
          className="flex flex-col gap-2 bg-white"
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              ¿Puedo utilizar mi Asistencia el mismo mes en que me suscribo?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Sí, puedes utilizarla durante el mismo mes de suscripción. Sin
                embargo, es importante tener en cuenta que existe un período de
                carencia que varía entre 15 y 25 días, dependiendo del plan de
                contrato.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              ¿En qué parte del país puedo utilizar los servicios?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Puedes utilizar nuestros servicios en todo el país, excepto en
                territorios insulares y antárticos.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              ¿A quién debo contactar una vez que me haya suscrito?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                Puedes comunicarte con nosotros de forma gratuita al 600 0860
                580 o a través de WhatsApp al +56939325099.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
      <TabsContent value="others">
        <Accordion
          className="flex flex-col gap-2 bg-white"
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              ¿Debo tener seguro para poder suscribirme?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p>
                No es necesario tener un seguro, aunque nuestro servicio de
                Asistencia funciona como complemento a cualquier seguro
                existente.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              ¿Cómo opera la Asistencia?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <p className="pb-1">
                La Asistencia debe ser solicitada previamente a través de
                llamada telefónica al número 600 086 0580, donde un ejecutivo de
                asistencias te atenderá y guiará según la prestación solicitada.
              </p>
              <p className="py-1">
                El cliente debe proporcionar la información mínima requerida
                para gestionar el servicio, que puede incluir (pero no limitarse
                a) los siguientes datos:
              </p>
              <ul className="list-disc px-6">
                <li>RUT del cliente titular.</li>
                <li>Nombre del beneficiario.</li>
                <li>Ubicación geográfica.</li>
              </ul>
              <p className="pt-1">
                Los servicios pueden ser solicitados desde el inicio de la
                vigencia, siempre que el cliente esté al día con los pagos.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              ¿Qué cubre?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <ul className="list-disc px-3">
                  <li>Urgencia médica por enfermedad</li>
                  <li>Atención médica ambulatoria</li>
                  <li>Descuento en farmacias</li>
                  <li>Telemedicina</li>
                  <li>Urgencia veterinaria por enfermedad o accidente</li>
                  <li>Telemedicina veterinaria</li>
                  <li>Vacuna antirrábica</li>
                  <li>Asistencia plomería</li>
                </ul>
                <ul className="list-disc px-3">
                  <li>Asistencia electricidad</li>
                  <li>Asistencia cerrajería</li>
                  <li>Asistencia vidriería</li>
                  <li>Asistencia para neumáticos</li>
                  <li>Asistencia para amortiguadores</li>
                  <li>Asistencia al vidrio lateral del vehículo</li>
                  <li>Asistencia de cerrajería para el vehículo</li>
                  <li>Asistencia legal</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              ¿Qué NO cubre?
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <ul className="list-disc px-3">
                  <li>Gastos de hospitalización</li>
                  <li>Gastos de hospitalización veterinaria</li>
                  <li>Gastos de traslado médico</li>
                  <li>
                    Servicios que no se han activado en la central de asistencia
                  </li>
                  <li>Medicamentos no recetados por un médico</li>
                  <li>Devolución de gastos veterinarios sin informe</li>
                  <li>Medicamentos no recetados por un veterinario</li>
                  <li>Detección de fugas de agua</li>
                </ul>
                <ul className="list-disc px-3">
                  <li>Despeje de zonas afectadas</li>
                  <li>Eventos en áreas comunes</li>
                  <li>Domicilio beneficiario distinto al registrado</li>
                  <li>Electrodomésticos ni elementos eléctricos</li>
                  <li>Caderas, calefont bombas hidráulicas</li>
                  <li>Problemas eléctricos en el exterior del inmueble</li>
                  <li>Vidriería en el interior del inmueble</li>
                  <li>
                    Cerrajería en puertas que no sean de acceso principal al
                    inmueble
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  )
}
