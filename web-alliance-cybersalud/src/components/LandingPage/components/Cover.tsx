
import Wrapper from '@/components/Wrapper';
import Image, { StaticImageData } from 'next/image';

interface Props{
    image: StaticImageData,
    imageMobile: StaticImageData
}


export default function Cover({image, imageMobile}: Props) {
    return (
        <div style={{
            backgroundImage: `url(${image.src})`
        }} className='bg-cover bg-center py-48 relative'>
            <Wrapper className='absolute inset-0 w-full h-full bg-primary flex flex-col md:hidden items-center justify-center'>
                <Image src={imageMobile.src} width={320} height={61} alt=""/>
                <p className='text-white text-lg text-center px-4 mt-8'>Protección para tu <b>familia</b> y <b>mascota</b> ❤</p>
            </Wrapper>
            <Wrapper className='hidden md:block'>
                <h1 className='text-white text-3xl mb-10 font-bold'>¡Cyber Salud y Serviclick se unieron! </h1>
                <p className='text-white text-3xl max-w-2xl mb-10'>Proteger nos mueve ❤ máxima protección de salud para toda tu familia y mascota.</p>
                <button className='h-12 bg-white px-8 uppercase rounded-full font-bold text-lg'>Conoce más aquí</button>
            </Wrapper>
        </div>
    )   
}