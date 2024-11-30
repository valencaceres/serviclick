import Image from "next/image";
import Wrapper from "../Wrapper";
import telImage from './images/tel.png';
import mailImage from './images/mail.png';
import locationImage from './images/location.png';
import MapImage from './images/map.png';
import WebPayImage from './images/webpay.png';
import InstagramImage from './images/instagram.png';
import FacebookImage from './images/facebook.png';
import LinkedinImage from './images/linkedin.png';
import LogoImage from './images/logo-white.png';

export default function Footer(){
  return (
    <footer id="contact">
      <div className="bg-slate-200">
      <Wrapper className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 font-black">¡CONTÁCTANOS!</h3>
            <ul>
              <li className="flex items-center">
                <Image src={telImage.src} width={40} height={40} alt="Icono de teléfono"/>
                <span>6000860580</span>
              </li>
              <li className="flex items-center">
                <Image src={mailImage.src} width={40} height={40} alt="Icono de teléfono"/>
                <span>comercial@serviclick.cl</span>
              </li>
              <li className="flex items-center">
                <Image src={locationImage.src} width={40} height={40} alt="Icono de teléfono"/>
                <span>Huerfános 669, Piso 7</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image src={MapImage.src} width={280} height={280} alt="Mapa"/>
          </div>
          <div className="flex justify-center items-center">
            <Image src={WebPayImage.src} width={236} height={99} alt="Mapa" className=""/>
          </div>
        </div>
      </Wrapper>
      </div>
      <div className="bg-black md:bg-primary py-8">
        <Wrapper className="md:flex items-center">
          <div className="items-center space-x-3 hidden md:flex">
            <a href=""><Image src={InstagramImage.src} width={40} height={40} alt="Icono de Instagram"/></a>
            <a href=""><Image src={FacebookImage.src} width={40} height={40} alt="Icono de Facebook"/></a>
            <a href=""><Image src={LinkedinImage.src} width={40} height={40} alt="Icono de Linkedin"/></a>
          </div>
          <div className="flex justify-center md:ml-auto">
            <Image src={LogoImage.src} width={252} height={53} alt="Logo"/>
          </div>
        </Wrapper>
      </div>
    </footer>
  )
}
