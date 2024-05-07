import React, { useState, useEffect } from "react";
import styles from "./Menu.module.scss";
import Icon from "../Icon";
import ContactForm from "../ContactForm/ContactForm";

import withScrollAnimation from "@/components/ui/Framer";



const Menu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
     // setMobileMenuOpen(true);
    } else {
      //setMobileMenuOpen(false);
    }
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

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const openContactForm = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };
  const AnimateDiv = withScrollAnimation("div");
  
  return (
   
    <div className={styles.menu}>
      <AnimateDiv>
      <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        <Icon
          icon={isMobileMenuOpen ? "close" : "menu"}
          color={isMobileMenuOpen ? "#000000" : "#ffffff"}
        />
      </div></AnimateDiv>
      
      <ul
        className={isMobileMenuOpen ? styles.menuItemsOpen : styles.menuItems}
      ><AnimateDiv>
        <li>
          <a onClick={(e) => handleLinkClick("novedades", e)} href="#novedades">
            Novedades
          </a>
        </li></AnimateDiv>
        <AnimateDiv>
        <li>
          <a onClick={(e) => handleLinkClick("servicios", e)} href="#servicios">
            Servicios
          </a>
        </li></AnimateDiv>
        <AnimateDiv>
        <li>
          <a onClick={(e) => handleLinkClick("sobre", e)} href="#sobre">
            Sobre Nosotros
          </a>
        </li></AnimateDiv>
        <AnimateDiv>
        <li>
          <a onClick={(e) => handleLinkClick("ubicacion", e)} href="#ubicacion">
            Ubicación
          </a>
        </li></AnimateDiv>
        
        <li><AnimateDiv>
          <a onClick={openContactForm}>Contacto</a></AnimateDiv>
          {showContactForm && (
            <div className={styles.contactForm}>
              <ContactForm onClose={closeContactForm} />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
