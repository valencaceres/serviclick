import React from 'react'

import styles from "./Landing.module.scss"

import Paragraph from "@/components/ui/Paragraph/Paragraph";
import Card from "@/components/ui/Card/Card";
import Benefit from '@/components/ui/Benefit/Benefit';

const Landing = () => {
    const content = "Junto a Felicity 360, te brindamos las mejores Asistencias diseñadas especialmente para ti y tu seres queridos. ";
    const wordsWithStyles = [
        {
            word: "360,", color: "#29ABE2", fontWeight: "bolder"
        },
        {
            word: "Felicity", color: "#DE0079", fontWeight: "bolder"
        },
    ];

    return (
        <div className={styles.landing}>
            
            <Paragraph content={content} wordsWithStyles={wordsWithStyles} />
            
            <div className={styles.cards}>
            <Card title="Asistencia Integral Pro " paragraph="Podrás obtener beneficios en: Urgencia Médica por Accidente, Urgencia Médica  por Enfermedad, Atención Médica Ambulatoria,  Descuento en Farmacias, Telemedicina, Orientación Médica Telefónica,  Médico a Domicilio. " traced=" $14.990" priceText="$11.990" discountText="20%" beneficiaryText="$3.590 (cada carga)" buttonLink="" buttonText="VER MÁS" img="/img/card/asistencia1.png" />
            <Card title="Asistencia Mascota Pro" paragraph="Podrás obtener beneficios en: Urgencia Veterinaria, Consulta Médica, Descuento en Farmacias, Telemedicina, Asistencia Legal Telefónica, Vacuna Antirrábica." traced=" $8.590" priceText="$6.870" discountText="20%" buttonLink="" buttonText="VER MÁS" img="/img/card/asistencia2.png" />
            <Card title="Asistencia Hogar Pro " paragraph="Podrás obtener beneficios en: Plomería, Cerrajería, Servicios de Electricidad, Instalación de Lámparas e Iluminaria, Servicios de Pintura Baño y Cocina, Perforaciones en Muro. " traced=" $9.490" priceText="$7.590" discountText="20%" buttonLink="" buttonText="VER MÁS" img="/img/card/asistencia3.png" />
            </div>

            <div className={styles.benefit}>
           <Benefit text='50% en farmacias' img='/img/benefit/img1.png'/>
           <Benefit text='50% en farmacias' img='/img/benefit/img2.png'/>
           <Benefit text='50% en farmacias' img='/img/benefit/img3.png'/>
           <Benefit text='50% en farmacias' img='/img/benefit/img4.png'/>
           <Benefit text='50% en farmacias' img='/img/benefit/img5.png'/>
           <Benefit text='50% en farmacias' img='/img/benefit/img6.png'/>
            </div>

        </div>
    )
}
export default Landing