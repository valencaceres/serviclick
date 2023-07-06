const familyImages: { [key: string]: string } = {
  bicicletas: "/assistance1.png",
  hogar: "/assistance2.png",
  "protección total": "/assistance8.png",
  salud: "/assistance3.png",
  vehículo: "/assistance7.png",
  veterinaria: "/assistance5.png",
}

export function getFamilyImage(familyName: string): string {
  return (
    familyImages[familyName.toLowerCase() as keyof typeof familyImages] ||
    "/assistance6.png"
  )
}

const categoryImages: { [key: string]: string } = {
  "asistencia al ciclista": "/assistance1.png",
  "asistencia hogar": "/assistance2.png",
  "asistencia protección total": "/assistance8.png",
  "asistencia salud joven": "/assistance3.png",
  "asistencia salud universal": "/assistance2.png",
  "asistencia vehicular": "/assistance7.png",
  "asistencia veterinaria": "/assistance5.png",
}

export function getCategoryImage(categoryName: string): string {
  return (
    categoryImages[categoryName.toLowerCase() as keyof typeof categoryImages] ||
    "/assistance6.png"
  )
}

const serviceImages: { [key: string]: string } = {
  medicamentos: "/serviceIcon/urgenciaMedica.png",
  "orientación medica telefónica": "/serviceIcon/orientacionMedicaTel.png",
  telemedicina: "/serviceIcon/telemedicina.png",
  "urgencia médica por accidente": "/serviceIcon/urgenciaAccidente.png",
  "medica ambulatoria": "/serviceIcon/atencionMedica.png",
  "urgencia médica por enfermedad": "/serviceIcon/urgenciaMedica.png",
  "medico a domicilio": "/serviceIcon/atencionMedica.png",
  "atención ambulatoria": "/serviceIcon/atencionMedica.png",
}

export function getServiceImage(serviceName: string): string {
  return (
    serviceImages[serviceName.toLowerCase() as keyof typeof serviceImages] ||
    "/serviceIcon/urgenciaMedica.png"
  )
}
