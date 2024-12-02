'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import logoImage from './images/logo.png';
import Wrapper from '../Wrapper';
import iconMenu from './images/icon-menu.svg';

interface Props{
    links: Array<{name: string, to: string}>
}

export default function Header({links}: Props) {
    const [active, setActive] = useState(false);

    return (
        <header className="bg-primary relative z-10">
            <Wrapper className='h-14 md:h-20 flex items-center'>
                <Image src={logoImage.src} width={233} height={52} alt='Logo' className='mr-auto hidden md:block'/>
                <nav className='flex items-center w-full md:w-auto'>
                    <button className={`fixed md:relative h-screen md:h-auto w-screen md:w-auto bg-black/30 inset-0 ${active ? 'block' : 'hidden'}`} onClick={() => setActive(!active)}></button>
                    <ul className={`fixed p-4 md:p-0 md:relative h-screen md:h-auto w-[300px] md:w-auto bg-white md:bg-transparent top-0 flex flex-col md:flex-row md:items-center mr-0 md:mr-4 transition-[right] ${active ? 'right-0' : 'right-[-300px] md:right-0'}`}>
                        {links?.map((link,i) => 
                            <li key={`link-${i}`} className='md:mx-4 text-lg md:text-base mb-1 md:mb-0 text-primary md:text-white'>
                                <Link href={link.to} className='block p-4 md:p-0'>{link.name}</Link>
                            </li>
                        )}
                    </ul>
                    <button className='bg-white h-7 text-sm md:text-base md:h-9 px-4 rounded-full'>Habla con nosotros</button>
                    <button className='ml-auto md:ml-0 md:hidden' onClick={() => setActive(!active)}>
                        <Image src={iconMenu.src} width={28} height={28} alt=''/>
                    </button>
                </nav>
            </Wrapper>
        </header>
    )   
}