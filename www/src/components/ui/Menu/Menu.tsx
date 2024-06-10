import React, { useState, useEffect } from 'react';

import styles from './Menu.module.scss';

import withScrollAnimation from "@/components/ui/Framer";
import ContactForm from "../ContactForm/ContactForm";
import { useRouter } from 'next/router';

interface MenuProps {
    menuIconColor?: string;
    closeIconColor?: string;
    searchIconColor?: string;
}

const Menu: React.FC<MenuProps> = ({
    menuIconColor = 'white',
    closeIconColor = '#B4CD25',
    searchIconColor = '#000000'
}) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showWhatsAppSection, setShowWhatsAppSection] = useState(true);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLinkClick = (
        sectionId: string,
        event: React.MouseEvent<HTMLAnchorElement>
    ) => {
        event.preventDefault();
        scrollToSection(sectionId);
    };

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const openContactForm = () => {
        setShowContactForm(true);
    };

    const closeContactForm = () => {
        setShowContactForm(false);
    };

    const closeWhatsAppSection = () => {
        setShowWhatsAppSection(false);
    };

    const router = useRouter();
    const { pathname } = router;

    const AnimateDiv = withScrollAnimation("div");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${styles.menu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <div className={styles.desktopMenu}>
                {pathname !== "/servicios" &&
                    <ul>
                        <li>
                            <a onClick={(e) => handleLinkClick("novedades", e)} href="#novedades">
                                Novedades
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("servicios", e)} href="#servicios">
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("sobre", e)} href="#sobre">
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("ubicacion", e)} href="#ubicacion">
                                Ubicación
                            </a>
                        </li>
                        <li>
                            <a onClick={openContactForm}>Contacto</a>
                            {showContactForm && (
                                <div className={styles.contactForm}>
                                    <ContactForm onClose={closeContactForm} />
                                </div>
                            )}
                        </li>
                    </ul>
                }
            </div>

            <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
                <span className="material-icons" style={{ color: menuIconColor }}>
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchInputContainer}>
                            <div className={styles.searchIcon}>
                                <span className="material-icons" style={{ color: searchIconColor }}>search</span>
                            </div>
                            <input type="text" placeholder="Buscar..." className={styles.searchInput} />
                        </div>
                        <span className="material-icons closeIcon" style={{ color: closeIconColor }} onClick={toggleMobileMenu}>close</span>
                    </div>
                    <ul>
                        <li>
                            <a onClick={(e) => handleLinkClick("novedades", e)} href="#novedades">
                                Novedades
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("servicios", e)} href="#servicios">
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("sobre", e)} href="#sobre">
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleLinkClick("ubicacion", e)} href="#ubicacion">
                                Ubicación
                            </a>
                        </li>
                        <li>
                            <a onClick={openContactForm}>Contacto</a>
                            {showContactForm && (
                                <div className={styles.contactForm}>
                                    <ContactForm onClose={closeContactForm} />
                                </div>
                            )}
                        </li>
                    </ul>

                    {showWhatsAppSection && (
                        <div className={styles.whatsAppSection}>
                            <div className={styles.whatsAppHeader}>
                                <h3>
                                    <img src="/img/hero/wsplogo.png" alt="WhatsApp Icon" className={styles.whatsappIcon} />
                                    WhatsApp
                                </h3>
                                <span className="material-icons" onClick={closeWhatsAppSection}>close</span>
                            </div>
                            <p>¡Hola! <br /> Me interesa tener más información.</p>
                            <a href="https://api.whatsapp.com/send/?phone=56939325099&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                                <button className={styles.whatsAppButton}>
                                    Abrir chat <span className="material-icons">send</span>
                                </button>
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
