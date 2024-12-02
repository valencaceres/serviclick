import Image from 'next/image';
import Wrapper from '../Wrapper';
import emailIcon from './images/icon-email.png';
import whatsappIcon from './images/icon-whatsapp.png';
import telphoneIcon from './images/icon-telphone.png';
import bannerImage from './images/banner.png';
import instagramIcon from './images/instagram-icon.svg';
import facebookIcon from './images/facebook-icon.svg';
import linkedinIcon from './images/linkedin-icon.svg';

export default function Footer() {
    return (
        <footer>
            <div className='max-w-7xl mx-auto'>
                <div className='px-4 md:px-16 pt-8 md:pt-16 pb-10 md:pb-24 bg-gradient-to-r from-primary to-blue-light md:rounded-3xl flex flex-col items-center mb-16'>
                    <h2 className='uppercase md:text-4xl text-white font-semibold mb-8'>Contacto</h2>
                    <ul className='flex flex-col space-y-4 md:space-y-0 md:flex-row items-center w-full'>
                        <li>
                            <a href='' className='flex items-center'>
                                <Image src={emailIcon.src} width={80} height={80} alt='' className='mr-1 md:mr-2 w-10 md:w-16 xl:w-auto'/>
                                <span className='text-sm md:text-xl xl:text-3xl font-medium text-white'>info@serviclick.cl</span>
                            </a>
                        </li>
                        <li className='mx-auto'>
                            <a href='' className='flex items-center'>
                                <Image src={whatsappIcon.src} width={80} height={80} alt='' className='mr-1 md:mr-2 w-10 md:w-16 xl:w-auto'/>
                                <span className='text-sm md:text-xl xl:text-3xl font-medium text-white'>+56 9 3932 5099</span>
                            </a>
                        </li>
                        <li>
                            <a href='' className='flex items-center'>
                                <Image src={telphoneIcon.src} width={80} height={80} alt='' className='mr-1 md:mr-2 w-10 md:w-16 xl:w-auto'/>
                                <span className='text-sm md:text-xl xl:text-3xl font-medium text-white'>6000860580</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='bg-primary'>
                <Wrapper className='flex flex-col items-center py-16'>
                    <div className='flex items-center mb-10'>
                        <Image src={bannerImage.src} width={703} height={79} alt=''></Image>
                    </div>
                    <ul className='flex items-center'>
                        <li>
                            <a href=''>
                                <Image src={instagramIcon.src} width={38} height={40} alt=''/>
                            </a>
                        </li>
                        <li className='mx-4'>
                            <a href=''>
                                <Image src={facebookIcon.src} width={38} height={40} alt=''/>
                            </a>
                        </li>
                        <li>
                            <a href=''>
                                <Image src={linkedinIcon.src} width={38} height={40} alt=''/>
                            </a>
                        </li>
                    </ul>
                </Wrapper>
            </div>
        </footer>
    )   
}