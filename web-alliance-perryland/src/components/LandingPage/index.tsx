// Components
import Wrapper from '../Wrapper';
import Cover from './components/Cover';
import Benefits from './components/Benefits';
import Steps from './components/Steps';
import Subscription from './components/Subscription';
import Banner from './components/Banner';
// Images
import coverImage from './images/cover.png';
import dogImage from './images/dog.png';
import allianceImage from './images/alliance.png';
import allianceWhiteImage from './images/alliance-white.png';
import comprasImage from './images/compras.png';
import gastronomiaImage from './images/gastronomia.png';
import educacionImage from './images/eduacion.png';
import turismoImage from './images/turismo.png';
import bellezaYSaludImage from './images/belleza-y-salud.png';
import somosLibreEleccionImage from './images/somos-libre-eleccion.png';
import sinDeducibleImage from './images/sin-deducible.png';
import presenteEnTodoChileImage from './images/presente-en-todo-chile.png';
import hoteleriaCaninaImage from './images/hoteleria-caninca.png';
import jardinCaninoImage from './images/jardin-canino.png';
import jardinCaninoDobleImage from './images/jardin-canino-doble.png';
import peluqueriaYBanoImage from './images/peluqueria-bano.png';
import petShopImage from './images/petshop.png';
import Alliance from './components/Alliance';

interface Props {
    initialData: any;
}

export default function LandingPage({ initialData }: Props) {
    return (
        <div>
            <Cover
                image={coverImage}
                dog={dogImage}
                alliance={allianceImage}
                allianceWhite={allianceWhiteImage}
            />
            <div className='py-16 md:py-32'>
                <Wrapper>
                    <p className='text-lg text-center md:text-4xl max-w-6xl mx-auto'><span className='text-secondary md:text-font'>Asistencia</span> que permiten <span className='md:text-secondary'>proteger, otorgar bienestar y </span><span className='text-secondary'>calidad de vida</span> <span className='text-secondary md:text-font'>para tu perro</span> y su familia.</p>
                </Wrapper>
            </div>
            <Benefits
                cards={initialData}
            />
            <Steps/>
            <Banner
                colA={[
                    {image: hoteleriaCaninaImage, dcto: '15', name: 'en servicio de hotelería canina.'},
                    {image: jardinCaninoImage, dcto: '15', name: 'en servicio de hotelería canina.'},
                    {image: jardinCaninoDobleImage, dcto: '15', name: 'en servicio de hotelería canina.'},
                ]}

                colB={[
                    {image: peluqueriaYBanoImage, dcto: '15', name: 'en servicio de hotelería canina.'},
                    {image: petShopImage, dcto: '15', name: 'en servicio de hotelería canina.'},
                ]}
            />
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
            />
            <Alliance/>
        </div>
    )   
}