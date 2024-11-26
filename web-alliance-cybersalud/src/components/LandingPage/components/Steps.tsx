'use client';

import CardStep from "./CardStep";

export default function Steps(){
    return (
        <div className="w-[95%] max-w-4xl mx-auto flex flex-col md:space-y-8 mb-32">
            <h2 className="text-center text-3xl md:text-5xl mb-8 md:mb-12 md:font-bold">¿Cómo <span className="font-bold">funciona</span> mi Asistencia?</h2>
            <CardStep
                    step={1}
                >¿Tuviste un <b className="text-secondary">imprevisto</b>? Activa tu asistencia llamando al <b>6000860580</b> opción 2 y nuestros ejecutivos te guiarán.  </CardStep>
            <CardStep
                step={2}
                reverse={true}
            >Podrás obtener un <b className="text-secondary">descuento automático</b> en tu asistencia de salud, utilizando tu huella con el sistema I-MED.</CardStep>
            <CardStep
                step={3}
            >En el caso de no usar el servicio I-MED, los valores que corresponda al descuento de tu asistencia utilizada, serán <b className="text-secondary">reintegrados a tu cuenta personal.</b></CardStep>
            <CardStep
                step={4}
                reverse={true}
            >Solo debes enviar toda la documentación correspondiente al mail <b className="text-secondary">hola@serviclick.cl</b>, antes de <b>72 horas hábiles.</b></CardStep>
        </div>
    )
}