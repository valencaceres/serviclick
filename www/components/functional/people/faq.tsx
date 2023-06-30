import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"

export default function Faq() {
  return (
    <>
      <Tabs defaultValue="subscription" className="w-full max-w-2xl">
        <TabsList>
          <TabsTrigger value="subscription">Suscripción</TabsTrigger>
          <TabsTrigger value="assistances">Asistencias</TabsTrigger>
          <TabsTrigger value="my-assistance">Mis asistencias</TabsTrigger>
          <TabsTrigger value="others">Otros</TabsTrigger>
        </TabsList>
        <TabsContent value="subscription">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo obtengo mi asistencia?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Si deseas contratar nuestra asistencia, simplemente haz clic
                  en el botón "¡Lo quiero!" o contáctanos a través de WhatsApp
                  al número +56956451904.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Necesito Tarjeta de Crédito para suscribir mi asistencia?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes utilizar tanto tarjetas de débito como tarjetas de
                  crédito que sean compatibles con nuestro sistema de pago
                  Webpay.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Tiene deducible?</AccordionTrigger>
              <AccordionContent>
                <p>No, no hay deducible.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                ¿Existe límite de edad para suscribirme?
              </AccordionTrigger>
              <AccordionContent>
                <p>No tenemos límites de edad para suscripción.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="assistances">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Puedo suscribir a alguien más a la asistencia?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Sí, puedes suscribir a todas las personas que desees proteger.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Puedo contratar más de una asistencia?
              </AccordionTrigger>
              <AccordionContent>
                <p>Sí, puedes contratar tantas asistencias como desees.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿Debo tener una previsión de salud?
              </AccordionTrigger>
              <AccordionContent>
                <p>Debes tener previsión Fonasa o Isapre.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                ¿Debo contratar por un período de 12 meses obligatoriamente?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  No, nuestras Asistencias no requieren un compromiso de
                  permanencia de 12 meses. Puedes disfrutar del servicio durante
                  el tiempo que desees.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                ¿Necesito ser mayor de edad para contratar?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Sí, debes ser mayor de edad y contar con una tarjeta de débito
                  o crédito para realizar el pago mensual.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="my-assistance">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Puedo utilizar mi Asistencia el mismo mes en que me suscribo?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Sí, puedes utilizarla durante el mismo mes de suscripción. Sin
                  embargo, es importante tener en cuenta que existe un período
                  de carencia que varía entre 15 y 25 días, dependiendo del plan
                  de contrato.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿En qué parte del país puedo utilizar los servicios?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes utilizar nuestros servicios en todo el país, excepto en
                  territorios insulares y antárticos.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿A quién debo contactar una vez que me haya suscrito?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes comunicarte con nosotros de forma gratuita al 600 0860
                  580 o a través de WhatsApp al +56 9 56451904.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="others">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Debo tener seguro para poder suscribirme?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  No es necesario tener un seguro, aunque nuestro servicio de
                  Asistencia funciona como complemento a cualquier seguro
                  existente.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo opera la Asistencia?</AccordionTrigger>
              <AccordionContent>
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
              <AccordionTrigger>¿Qué cubre?</AccordionTrigger>
              <AccordionContent>
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
              <AccordionTrigger>¿Qué NO cubre?</AccordionTrigger>
              <AccordionContent>
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
        </TabsContent>
      </Tabs>
    </>
  )
}
