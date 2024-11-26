import Wrapper from '../Wrapper';
import Benefits from './components/Benefits';
import Cover from './components/Cover';
import Steps from './components/Steps';
import Subscription from './components/Subscription';
import bannerImage from './images/bannner.png';
import bannerMobileImage from './images/banner-mobile.png';
import asistenciaUniversalImage from './images/asistencia-universal.jpeg';
import asistenciaUniversalProImage from './images/asistencia-universal-pro.jpeg';
import asistenciaIntegralProImage from './images/asistencia-integral-pro.jpeg';
import comprasImage from './images/compras.png';
import gastronomiaImage from './images/gastronomia.png';
import educacionImage from './images/eduacion.png';
import turismoImage from './images/turismo.png';
import bellezaYSaludImage from './images/belleza-y-salud.png';
import somosLibreEleccionImage from './images/somos-libre-eleccion.png';
import sinDeducibleImage from './images/sin-deducible.png';
import presenteEnTodoChileImage from './images/presente-en-todo-chile.png';
import serviclickImage from './images/serviclick-logo.png';

export default function LandingPage() {
    return (
        <div>
            <Cover image={bannerImage} imageMobile={bannerMobileImage}/>
            <Wrapper className='py-12 md:py-20'>
                <p className='text-xl md:text-4xl text-center'>Suscribe hoy tu Asistencia en salud desde <b className='font-bold'>$6.490</b> y obtén prestaciones  de telemedicina, urgencias y más beneficios.</p>
            </Wrapper>
            <Benefits
                cards={[
                    {
                        image: asistenciaUniversalImage,
                        name: "Asistencia universal",
                        price: "$6.490*",
                        detail: "*Consulta por plan familiar",
                        benefits: [
                            {name: 'Urgencia Médica por Accidente', details: ['100% Isapre - Fonasa / 50% Fonasa A', '$315.000	 - 12 Eventos al Año']},
                            {name: 'Urgencia Médica por Enfermedad', details: ['100% Isapre - Fonasa / 50% Fonasa A', '$315.000	3 Eventos al Año']},
                            {name: 'Consulta Médica General', details: ['100% Tope 2 UF', '5 Eventos al Año']},
                            {name: 'Descuento en Farmacias', details: ['50% de la boleta Tope $15.000', '12 Eventos al Año']},
                            {name: 'Telemedicina', details: ['100% Tope 2 UF', '3 Eventos al Año']},
                            {name: 'Orientación Médica Telefónica', details: ['100% Tope 2 UF', '12 Eventos al Año']},
                        ]
                    }, {
                        image: asistenciaUniversalProImage,
                        name: "Asistencia Universal Pro",
                        price: "$9.590*",
                        detail: "*Consulta por plan familiar",
                        benefits: [
                            {name: 'Urgencia Médica por Accidente', details: ['100% Isapre - Fonasa / 50% Fonasa A', '$630.000 - 12 Eventos al Año ']},
                            {name: 'Urgencia Médica por Enfermedad', details: ['100% Isapre - Fonasa / 50% Fonasa A', '$630.000	3 Eventos al Año ']},
                            {name: 'Consulta Médica General', details: ['100% Tope 2 UF', '5 Eventos al Año']},
                            {name: 'Descuento en Farmacias', details: ['50% de la boleta  Tope $25.000', '12 Eventos al Año']},
                            {name: 'Telemedicina', details: ['100% Tope 2 UF', '3 Eventos al Año']},
                            {name: 'Orientación Médica Telefónica', details: ['100% Tope 2 UF', '12 Eventos al Año']},
                            {name: 'Médico a Domicilio', details: ['100% Tope $60.000', '3 Eventos al Año ']},
                        ]
                    }, {
                        image: asistenciaIntegralProImage,
                        name: "Asistencia Integral Pro",
                        price: "$14.990*",
                        detail: "*Consulta por plan familiar",
                        benefits: [
                            {name: 'Urgencia Dental', details: ['60% Tope 5 UF', '3 Eventos al Año  - Carencia 45 días']},
                            {name: 'Exodoncia Simple', details: ['50% Tope 2 UF', '2 Eventos al Año - Carencia 45 días']},
                            {name: 'Exodoncia Colgajo', details: ['50% Tope 2 UF', '2 Eventos al Año - Carencia 45 días']},
                            {name: 'Radiografía Panorámica', details: ['100% Tope 2 UF', '2 Eventos al Año - Carencia 45 días']},
                            {name: 'Limpieza Dental', details: ['100% Tope 2 UF', '2 Eventos al Año - Carencia 45 días']},
                            {name: 'Urgencia Médica por Enfermedad', details: ['100% Tope 9 UF', '5 Eventos al Año - Carencia 10 días']},
                            {name: 'Urgencia Médica por Accidente', details: ['100% Tope 9 UF', '12 Eventos al Año- Carencia 10 días']},
                            {name: 'Parto Normal', details: ['40% Tope 8 UF', '1 Evento al Año - Carencia 45 días']},
                        ]
                    }
                ]}
            />
            <Steps/>
            <Subscription
                cards={[
                    {image: comprasImage, name: 'Compras'},
                    {image: gastronomiaImage, name: 'Gastronomía'},
                    {image: educacionImage, name: 'Educación'},
                    {image: turismoImage, name: 'Turismo'},
                    {image: bellezaYSaludImage, name: 'Belleza y Salud'},
                ]}

                benefits={[
                    {name: 'Somos libre elección', image: somosLibreEleccionImage},
                    {name: 'Sin deducible', image: sinDeducibleImage},
                    {name: 'Presente en todo Chile', image: presenteEnTodoChileImage},
                ]}

                logo={serviclickImage}
            />
        </div>
    )   
}