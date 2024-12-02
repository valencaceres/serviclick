'use client';

import Image, { StaticImageData } from "next/image"
import Wrapper from "../../Wrapper"
import CardBanner from "./CardBanner"
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Col{
    dcto: string,
    name: string,
    image: StaticImageData
}

interface Props{
    colA: Array<Col>,
    colB: Array<Col>
}

export default function Banner({colA, colB}: Props){
    return (
        <div className="mb-16 md:mb-32">
            <header className="py-8 md:py-28">
                <Wrapper>
                    <h2 className="text-secondary md:uppercase text-xl md:text-5xl md:font-bold text-center">Beneficios Perryland</h2>
                </Wrapper>
            </header>
            <div className="bg-primary py-16 md:py-28">
                <Wrapper className="relative md:hidden">
                    <button className='swiper-button-prev lg:hidden absolute w-8 h-8 rounded-full left-0 top-24 bg-gray z-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-left"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z"/></g></g></svg>
                    </button>
                    <button className='swiper-button-next lg:hidden absolute w-8 h-8 rounded-full right-0 top-24 bg-gray z-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"/></g></g></svg>
                    </button>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                    >
                        {colA.concat(colB).map((card, i) => (
                            <SwiperSlide>
                                <CardBanner
                                    key={`col-${i}`}
                                    name={card.name}
                                    dcto={card.dcto}
                                    image={card.image}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Wrapper>
                <Wrapper className="hidden md:block">
                    <div className="grid grid-cols-3 mb-8">
                        { colA.map((card, i) => (
                            <CardBanner
                                key={`col-a-${i}`}
                                name={card.name}
                                dcto={card.dcto}
                                image={card.image}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-2">
                        { colB.map((card, i) => (
                            <CardBanner
                                key={`col-b-${i}`}
                                name={card.name}
                                dcto={card.dcto}
                                image={card.image}
                            />
                        ))}
                    </div>
                </Wrapper>
            </div>
        </div>
    )
}