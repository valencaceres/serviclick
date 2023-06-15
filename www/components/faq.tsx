import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

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
                  Si selecionas la Asistencia que deseas contratar, debes hacer
                  clic en el botón ¡Lo quiero! o en nuestro WhatsaApp
                  +56956451904.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Necesito Tarjeta de Crédito para suscribir mi asistencia?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes utilizar tarjetas de débito/crédito que te permitan el
                  pago por medio del sistema de pago Webpay.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Tiene deducible?</AccordionTrigger>
              <AccordionContent>
                <p>No tiene deducible.</p>
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
                ¿Puedo suscribir una Asistencia para alguien más?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes suscribir a todas las personas que deseas proteger.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Puedo contratar más de una asistencia?
              </AccordionTrigger>
              <AccordionContent>
                <p>Puedes contratar las Asistencias que desees.</p>
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
                ¿Debo contratar por 12 meses de forma obligatoria?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  No, las Asistencias no tienen un tiempo de permanencia
                  obligatoria, puedes toamr el servicio el tiempo que tu desees.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                ¿Debo tener la mayoría de edad para contratar?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Si, debes ser mayor de edad y tener una tarjeta de débito o
                  crédito para el pago mensual.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="my-assistance">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Puedo utilizar mi Asistencia el mismo mes de suscripción?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes utilizarla dentro del mes, siempre y cuando consideres
                  el tiempo de carencia que varía entre 15 a 25 días,
                  dependiendo del plan de contrato.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿En qué parte del país puedo utilizar los servicios?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes utilizar tus servicios a lo largo de todo el país. Pero
                  exluye territorios insulares y antárticos.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿Dónde me puedo comunicar una vez que hice mi suscripción?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Puedes comunicarte gratis al 600 0860 580 o por WhatsApp al
                  +56 9 56451904.
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
                  No es necesario, aunque el servicio de Asistencia funciona
                  como servicio complementario a cualquier Seguro.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo opera la Asistencia?</AccordionTrigger>
              <AccordionContent>
                <p className="pb-1">
                  Debe solicitarse previamente vía telefónica al número 600 086
                  0580, donde un ejecutivo de asistencias lo atenderá y guiará
                  de acuerdo con la prestación solicitada.
                </p>
                <p className="py-1">
                  El cliente estará obligado a entregar la información mínima
                  requerida para gestionar el servicio y podría incluir y no
                  limitarse a los siguientes datos:
                </p>
                <ul className="list-disc px-6">
                  <li>RUT del cliente Titular.</li>
                  <li>Nombre del Beneficiario.</li>
                  <li>Ubicación</li>
                  <li>Geográfica.</li>
                </ul>
                <p className="pt-1">
                  Los servicios podrán ser solicitados desde el inicio de la
                  vigencia, mientras el cliente se encuentre al día en los
                  pagos.
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
