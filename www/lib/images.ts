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
