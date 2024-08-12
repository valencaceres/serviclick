import Image from "next/image"
import { Wrapper } from "../Wrapper"
import CoverImage from './images/cover.png';
import CoverMobileImage from './images/cover-mobile.png';
import LogoImage from './images/logo.png';
import LogoCopecImage from './images/logo-copec.png';

export const Cover = () => {
  return (
    <div className="relative">
        <Image src={CoverImage.src} width={1286} height={575} alt="Portada del sitio web" className="w-full hidden lg:block"/>
        <Image src={CoverMobileImage.src} width={360} height={204} alt="Portada del sitio web en mobile" className="w-full lg:hidden"/>
        <div className="absolute w-full h-full flex flex-col justify-center inset-0">
            <Wrapper className='px-12'>
                <p className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl sm:max-w-xl lg:max-w-2xl leading-tight"><strong>Asistencias</strong> que facilitan tu vida</p>
                <div className="flex items-center">
                    <Image src={LogoImage.src} width={278} height={67} alt="Logo de Serviclick" className="w-[98px] lg:w-[278px] sm:w-[180px] h-auto"/>
                    <div className="w-px h-full border-l border-2 sm:border-[1px] border-white mx-4 lg:mx-8 xl:mx-12">&nbsp;</div>
                    <Image src={LogoCopecImage.src} width={278} height={67} alt="Logo de Copec" className="w-[108px] lg:w-[278px] sm:w-[180px] h-auto"/>
                </div>
            </Wrapper>
        </div>
    </div>
  )
}
