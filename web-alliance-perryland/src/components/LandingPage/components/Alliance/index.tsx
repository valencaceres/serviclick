import Image from "next/image";
import mhmEmpresaImage from './images/logo-mhm-empresa.png';
import mhmCorredoraImage from './images/logo-mhm-corredora-x.png';
import serviclickImage from './images/logo-serviclick.png';
import serviTradeImage from './images/logo-servitrade.png';
import proAssistImage from './images/logo-proassist.png';
import proCallImage from './images/logo-procall.png';
import mhmDefensaImage from './images/logo-mhm-defensa.png';
import WrapperSm from "@/components/WrapperSm";

export default function Alliance() {
    return <WrapperSm className="py-20">
        <div className="border-2 border-black-blue rounded-xl px-4 md:px-16 pb-8 md:pb-16 relative">
            <div className="w-full max-w-[500px] text-xl md:text-3xl font-bold mx-auto text-center -mt-8 bg-white">MHM Defensa es parte de MHM Empresas</div>
            <Image src={mhmEmpresaImage.src} width={461} height={116} alt="" className="mx-auto my-8 w-[200px] md:w-[461px]"/>
            <div className="grid grid-cols-2 gap-2 md:gap-8 items-center justify-center mb-8">
                <Image src={mhmCorredoraImage.src} width={402} height={39} alt="" className="mx-auto"/>
                <Image src={serviclickImage.src} width={222} height={41} alt="" className="mx-auto"/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 md:gap-x-8 justify-center">
                <Image src={serviTradeImage.src} width={247} height={30} alt="" className="mx-auto"/>
                <Image src={proAssistImage.src} width={226} height={30} alt="" className="mx-auto"/>
                <Image src={proCallImage.src} width={188} height={30} alt="" className="mx-auto"/>
                <Image src={mhmDefensaImage.src} width={188} height={30} alt="" className="mx-auto"/>
            </div>
        </div>
    </WrapperSm>
}