'use client'

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import WrapperSm from "@/components/WrapperSm";
import CardBenefit from "./CardBenefit";
import { ICardBenefit } from '@/utils/interfaces/CardBenefit';

interface Props{
    cards: Array<ICardBenefit>
}

export default function Benefits({cards}: Props){
    return (
        <WrapperSm className="mb-16 md:mb-32">
            <h2 className="font-bold text-3xl md:text-5xl text-center mb-8 md:mb-16" id="about">¡Elige tu beneficio!</h2>
            <div className='px-10 relative'>
                <button className='swiper-button-prev lg:hidden absolute w-8 h-8 rounded-full left-0 top-24 bg-gray z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-left"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z"/></g></g></svg>
                </button>
                <button className='swiper-button-next lg:hidden absolute w-8 h-8 rounded-full right-0 top-24 bg-gray z-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"/></g></g></svg>
                </button>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        },
                    }}
                >
                    {cards.map((card, i) => (
                        <SwiperSlide key={`benefit-card-${i}`}>
                            <CardBenefit
                                id={card.id}
                                productplan_id={card.productplan_id}
                                image={card.image}
                                name={card.name}
                                price={card.price}
                                detail={card.detail}
                                assistances={card.assistances}
                                hiring_conditions={card.hiring_conditions}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </WrapperSm>
    )
}