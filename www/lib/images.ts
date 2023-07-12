function removeUnwantedChars(str: string) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .toLowerCase() // Convert everything to lowercase
}

const familyImages: { [key: string]: string } = {
  bicicletas: "/assistance1.jpg",
  hogar: "/assistance2.jpg",
  "protección total": "/assistance8.jpg",
  salud: "/assistance3.jpg",
  vehículo: "/assistance7.jpeg",
  veterinaria: "/assistance5.jpg",
}

export function getFamilyImage(familyName: string): string {
  return (
    familyImages[familyName.toLowerCase() as keyof typeof familyImages] ||
    "/assistance6.jpg"
  )
}

const categoryImages: { [key: string]: string } = {
  "asistencia al ciclista": "/assistance1.jpg",
  "asistencia hogar": "/assistance2.jpg",
  "asistencia protección total": "/assistance8.jpg",
  "asistencia salud joven": "/assistance3.jpg",
  "asistencia salud universal": "/assistance2.jpg",
  "asistencia vehicular": "/assistance7.jpeg",
  "asistencia veterinaria": "/assistance5.jpg",
}

export function getCategoryImage(categoryName: string): string {
  return (
    categoryImages[categoryName.toLowerCase() as keyof typeof categoryImages] ||
    "/assistance6.jpg"
  )
}

const serviceImages: { [key: string]: string } = {
  medicamentos: "/serviceIcon/medicamentos.png",
  "orientación medica telefónica": "/serviceIcon/orientacionMedicaTel.png",
  telemedicina: "/serviceIcon/telemedicina.png",
  "urgencia médica por accidente": "/serviceIcon/urgenciaAccidente.png",
  "medica ambulatoria": "/serviceIcon/atencionMedica.png",
  "urgencia médica por enfermedad": "/serviceIcon/urgenciaMedica.png",
  "medico a domicilio": "/serviceIcon/atencionMedica.png",
  "atención ambulatoria": "/serviceIcon/atencionMedica.png",
  "urgencia veterinaria": "/serviceIcon/urgenciaVet.png",
  "perforaciones en muro": "/serviceIcon/perforaciones.png",
  "servicio de electricidad": "/serviceIcon/electricidad.png",
  "servicio de cerrajería": "/serviceIcon/cerrajeria.png",
  "servicio de plomeria": "/serviceIcon/plomeria.png",
  "servicio de vidriera": "/serviceIcon/vidrieria.png",
  "instalación de cortinas": "/serviceIcon/cortinas.png",
  "instalacion de luminarias y/o lamparas": "/serviceIcon/luminarias.png",
  "orientación médica telefónica": "/serviceIcon/orientacionMedicaTel.png",
  "asistencia legal": "/serviceIcon/asistenciaLegal.png",
  "urgencia por accidente en bicicleta": "/serviceIcon/bicicleta.png",
  "mano de obra en pintura baño y cocina": "/serviceIcon/perforaciones.png",
  "asistencia legal telefónica": "/serviceIcon/legalTel.png",
  amortiguador: "/serviceIcon/amortiguador.png",
  cerrajería: "/serviceIcon/cerrajeriaVehicular.png",
  neumático: "/serviceIcon/neumatico.png",
  "vidrio lateral": "/serviceIcon/vidrioLateral.png",
  "tele-medicina veterinaria": "/serviceIcon/telmedVet.png",
  "consulta medica": "/serviceIcon/atencionMedica.png",
}

export function getServiceImage(serviceName: string): string {
  serviceName = serviceName.trim()
  return (
    serviceImages[serviceName.toLowerCase() as keyof typeof serviceImages] ||
    "/serviceIcon/urgenciaMedica.png"
  )
}
