import Image from 'next/image';
import logoImage from './images/logo.png';
import Wrapper from '../Wrapper';
import Link from 'next/link';

interface Props{
    links: Array<{name: string, to: string}>
}

export default function Header({links}: Props) {
    return (
        <header className="bg-primary">
            <Wrapper className='h-20 flex items-center'>
                <Image src={logoImage.src} width={233} height={52} alt='Logo' className='mr-auto'/>
                <nav className='flex items-center'>
                    <ul className='flex items-center mr-4'>
                        {links?.map((link,i) => 
                            <li key={`link-${i}`} className='mx-4 text-white'>
                                <Link href={link.to}>{link.name}</Link>
                            </li>
                        )}
                    </ul>
                    <button className='bg-white h-9 px-4 rounded-full'>Habla con nosotros</button>
                </nav>
            </Wrapper>
        </header>
    )   
}