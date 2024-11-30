
import Wrapper from '@/components/Wrapper';
import Image, { StaticImageData } from 'next/image';

interface Props{
    image: StaticImageData,
    dog: StaticImageData,
    alliance: StaticImageData,
    allianceWhite: StaticImageData
}


export default function Cover({image, dog, alliance, allianceWhite}: Props) {
    return (
        <div className='relative md:min-h-[400px] bg-gray-light'>
            <Image src={image.src} width={1286} height={494} alt='' className='w-full hidden md:block'/>
            
            <div className='hidden md:flex flex-col items-center justify-center absolute w-full h-full inset-0'>
                <Image src={dog.src} width={148} height={102} alt=''/>
                <h1 className='text-5xl max-auto max-w-xl text-center text-secondary my-8'>La <b className='font-bold'>Asistencia</b> perfecta para tu fiel compañero</h1>
                <Image src={alliance} width={465} height={68} alt=''/>
            </div>

            <div className='md:hidden w-full h-full bg-primary flex flex-col items-center justify-center py-20'>
                <Image src={allianceWhite.src} width={299} height={41} alt=''/>
                <h1 className='text-md text-white mt-4 text-center mx-2'>La <b className='font-bold'>Asistencia Perfecta</b> para tu fiel compañer@</h1>
            </div>
        </div>
    )   
}