import Wrapper from '../Wrapper';
import Cover from './components/Cover';
import bannerImage from './images/bannner.png';

export default function LandingPage() {
    return (
        <div>
            <Cover image={bannerImage} />
            <Wrapper className='py-20'>
                <p className='text-4xl text-center'>Suscribe hoy tu Asistencia en salud desde <b className='font-bold'>$6.490</b> y obtén prestaciones  de telemedicina, urgencias y más beneficios.</p>
            </Wrapper>
            
        </div>
    )   
}