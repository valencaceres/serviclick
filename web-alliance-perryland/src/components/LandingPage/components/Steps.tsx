'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardStep from "./CardStep";
import Wrapper from '../../Wrapper';
import CardStepMobile from './CardStepMobile';

export default function Steps(){
    return (
        <>
            <h2 className="text-secondary text-center text-3xl md:text-5xl mb-8 md:mb-12 md:font-bold">¿Cómo <span className="font-bold">funciona</span> mi Asistencia?</h2>
            <Wrapper className='md:hidden mb-20 relative px-16'>
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
                    slidesPerView={1}
                >
                    <SwiperSlide>
                        <CardStepMobile
                                step={1}
                        >¿Tuviste un <b className="text-secondary">imprevisto</b> con tu mascota? Activa tu asistencia llamando al <b>6000860580</b> opción 2 y nuestros ejecutivos te guiarán.  </CardStepMobile>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardStepMobile
                            step={2}
                        >Indica al ejecutivo el <b className="text-secondary">lugar de atención de tu mascota,</b> para luego enviar los documentos solicitados</CardStepMobile>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardStepMobile
                            step={3}
                        >Recuerda <b className="text-secondary">guardar la boleta</b>, para luego enviar los documentos solicitados</CardStepMobile>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardStepMobile
                            step={4}
                        >Posterior a la atención debes enviar la documentación correspondiente al mail <b className="text-secondary">hola@serviclick.cl hasta 72</b> horas hábiles</CardStepMobile>
                    </SwiperSlide>
                </Swiper>
            </Wrapper>
            <div className="w-[95%] max-w-4xl mx-auto flex flex-col md:space-y-8 mb-32 hidden md:block">
                <CardStep
                        step={1}
                        >¿Tuviste un <b className="text-secondary">imprevisto</b> con tu mascota? Activa tu asistencia llamando al <b>6000860580</b> opción 2 y nuestros ejecutivos te guiarán.</CardStep>
                <CardStep
                    step={2}
                    reverse={true}
                >Indica al ejecutivo el <b className="text-secondary">lugar de atención de tu mascota,</b> para luego enviar los documentos solicitados</CardStep>
                <CardStep
                    step={3}
                >Recuerda <b className="text-secondary">guardar la boleta</b>, para luego enviar los documentos solicitados</CardStep>
                <CardStep
                    step={4}
                    reverse={true}
                >Posterior a la atención debes enviar la documentación correspondiente al mail <b className="text-secondary">hola@serviclick.cl hasta 72</b> horas hábiles</CardStep>
            </div>
        </>
    )
}