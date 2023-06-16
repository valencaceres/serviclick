import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Icons } from "../icons"

export const Details = () => {
  return (
    <Tabs defaultValue="insurance" className="w-full max-w-7xl">
      <TabsList>
        <TabsTrigger
          className="md:max-w-full xl:max-w-[300px] flex gap-2"
          value="insurance"
        >
          <Icons.building />
          Industria seguros
        </TabsTrigger>
        <TabsTrigger
          className="md:max-w-full xl:max-w-[300px] flex gap-2"
          value="pymes"
        >
          <Icons.store />
          PYMES & MYPYMES
        </TabsTrigger>
        <TabsTrigger
          className="md:max-w-full xl:max-w-[300px] flex gap-2"
          value="commercial-insurance"
        >
          <Icons.share />
          Seguros comerciales
        </TabsTrigger>
        <TabsTrigger
          className="md:max-w-full xl:max-w-[300px] flex gap-2"
          value="network"
        >
          <Icons.users />
          Prestadores & Redes de apoyo
        </TabsTrigger>
      </TabsList>
      <TabsContent value="insurance" className="p-4 xl:mx-10">
        Asóciate con Serviclick y colabora con las empresas líderes en Seguros,
        Banca y Retail. Juntos, revolucionaremos la industria de Asistencias
        Masivas, posicionándonos como el motor principal que impulsa su
        crecimiento y evolución.
      </TabsContent>
      <TabsContent value="pymes" className="p-4 xl:mx-10">
        Ofrecemos servicios de asistencia y protección de alta calidad, de
        acceso inmediato y con total libertad de elección. Nuestro compromiso es
        contribuir a la tranquilidad tanto de sus colaboradores como de sus
        familias. Somos más que un proveedor de servicios; somos un aliado
        estratégico que fortalece la lealtad y la satisfacción de su fuerza
        laboral.
      </TabsContent>
      <TabsContent value="commercial-insurance" className="p-4 xl:mx-10">
        Disponemos del plan comercial óptimo para distribuidores, brokers y
        agentes comerciales. Poseemos una unidad de canales comerciales
        especializada y dedicada a ofrecerles atención preferencial. Somos la
        solución de asistencia más destacada: completamente digital, multicanal
        y enfocada en el cliente. Nuestro servicio eficiente y de alta calidad
        se proporciona siempre de forma oportuna, satisfaciendo las necesidades
        de nuestros socios comerciales.
      </TabsContent>
      <TabsContent value="network" className="p-4 xl:mx-10">
        Forma parte de nuestra extensa red de colaboradores. Para más
        información, contáctanos a través de nuestro WhatsApp al +56956451904 y
        uno de nuestros ejecutivos estará encantado de asistirte.
      </TabsContent>
    </Tabs>
  )
}
