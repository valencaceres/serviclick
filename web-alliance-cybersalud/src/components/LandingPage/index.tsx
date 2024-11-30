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

interface Props {
    initialData: any;
}

export default function LandingPage({ initialData }: Props) {
    return (
        <div>
            <Cover image={bannerImage} imageMobile={bannerMobileImage}/>
            <Wrapper className='py-12 md:py-20'>
                <p className='text-xl md:text-4xl text-center'>Suscribe hoy tu Asistencia en salud desde <b className='font-bold'>$6.490</b> y obtén prestaciones  de telemedicina, urgencias y más beneficios.</p>
            </Wrapper>
            <Benefits
                cards={initialData}
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