const familyImages: { [key: string]: string } = {
  Bicicletas: "/assistance1.png",
  Hogar: "/assistance2.png",
  "Protección Total": "/assistance8.png",
  Salud: "/assistance3.png",
  Vehículo: "/assistance7.png",
  Veterinaria: "/assistance5.png",
}

const categoryImages: { [key: string]: string } = {
  "Asistencia al Ciclista": "/assistance1.png",
  "Asistencia Hogar": "/assistance2.png",
  "Asistencia Protección Total": "/assistance8.png",
  "Asistencia Salud Joven": "/assistance3.png",
  "Asistencia Salud Universal": "/assistance2.png",
  "Asistencia Vehicular": "/assistance7.png",
  "Asistencia Veterinaria": "/assistance5.png",
}

export function getFamilyImage(familyName: string): string {
  return (
    familyImages[familyName as keyof typeof familyImages] || "/assistance6.png"
  )
}

export function getCategoryImage(categoryName: string): string {
  return (
    categoryImages[categoryName as keyof typeof categoryImages] ||
    "/assistance6.png"
  )
}
