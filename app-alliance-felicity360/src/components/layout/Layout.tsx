import React from 'react'

import Hero from '@/components/ui/Hero/Hero';
import Contact from '@/components/ui/Contact/Contact';
import Footer from '@/components/ui/Footer/Footer';

const Layout = ({ children }: any) => {
    return (
        <>
            <Hero title="ASISTENCIAS QUE TE PROTEGEN <br> EN TODO MOMENTO" firstLogo="/img/hero/serviclick.png" secondLogo="/img/hero/logo-felicity-white.png" />
            <main>{children}</main>
            <Contact />
            <Footer />
        </>
    )
}

export default Layout