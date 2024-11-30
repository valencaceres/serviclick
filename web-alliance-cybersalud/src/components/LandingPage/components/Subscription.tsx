'use client'

import Wrapper from "@/components/Wrapper";
import CardArea from "./CardArea";
import Image, { StaticImageData } from "next/image";
import CardSubscription from "./CardSubscription";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface Props{
    cards: Array<{
        image: StaticImageData,
        name: string
    }>
    benefits: Array<{
        image: StaticImageData,
        name: string
    }>
    logo: StaticImageData
}

export default function Subscription({cards, benefits, logo}: Props){
    return (
        <Wrapper>
            <h2 className="text-center text-3xl md:text-5xl mb-8 md:mb-12 md:font-bold">¿Ya <span className="font-bold">suscribiste</span> tu Asistencia?</h2>
            <p className='text-lg md:text-2xl text-center mb-16'>Al obtener tu asistencia podrás disfrutar de más de 1.200 beneficios exclusivos para ti: </p>
            <Swiper
                className={`mb-16`}
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                slidesPerView="auto"
                autoHeight={true}
                spaceBetween={20}
                centerInsufficientSlides={true}
            >
                {cards.map((card,i) => (
                    <SwiperSlide key={`card-subscription-${i}`} style={{width: 'auto !important'}}>
                        <CardArea
                            image={card.image}
                            name={card.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <p className='text-xl md:text-2xl text-center mb-12'>Solo debes ingresar a beneficios.serviclick.cl y canjea tu descuento en tu tienda favorita.</p>
            <div className="flex items-center justify-center mb-16 md:mb-32">
                <button className="uppercase text-white font-bold bg-green h-12 px-4 rounded-2xl">IR A PLATAFORMA DE BENEFICIOS </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mb-32 space-y-16 md:space-y-0">
                {benefits.map((card,i) => (
                        <CardSubscription
                            key={`card-benefit-${i}`}
                            image={card.image}
                            name={card.name}
                        />
                    ))}
            </div>
            <div>
                <p className='text-2xl font-bold md:font-normal md:text-4xl text-center mb-8'>Beneficio exclusivo con:</p>
                <Image src={logo.src} width={327} height={94} alt="" className="mx-auto mb-32"/>
            </div>
        </Wrapper>
    )
}