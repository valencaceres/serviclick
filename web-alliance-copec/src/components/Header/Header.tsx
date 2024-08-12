'use client';

import Image from "next/image"
import { Button } from "../Button"
import { Wrapper } from "../Wrapper"
import { useState } from "react";

const links = [
  {name: 'Asistencias', to: ''},
  {name: 'Ubicación', to: ''},
  {name: 'Contacto', to: ''},
]

export const Header = () => {
  const [active, setActive] = useState(false);
  
  return (
    <header className={`absolute inset-0 z-10 py-4 h-20`}>
      <Wrapper>
        <nav className="flex items-center">
          <button className={`fixed bg-black opacity-50 w-full h-full inset-0 xl:hidden ${active ? 'block' : 'hidden'}`} onClick={() => setActive(false)}></button>
          <ul className={`ml-auto flex items-center xl:space-x-6 fixed xl:relative bg-white xl:bg-transparent h-full xl:h-auto xl:right-0 top-0 w-[90%] max-w-[320px] flex-col xl:flex-row py-9 xl:py-0 transition-[right] ${active ? 'right-0' : 'right-[-320px]'}`}>
            {links.map((link,i) => 
              <li key={`link-${i}`}>
                <a href={link.to} className="text-xl xl:text-base mb-3 xl:mb-0 block xl:text-white opacity-80">{link.name}</a>
              </li>
            )}
          </ul>
          <Button className="ml-auto xl:ml-0">Habla con nosotros</Button>
          <button className="ml-3 xl:hidden mr-3 xl:mr-0" onClick={() => setActive(true)}><Image src="menu-white.svg" width={32} height={32} alt="Botón del menú"/></button>
        </nav>
      </Wrapper>
    </header>
  )
}
