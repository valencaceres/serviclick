import Image from "next/image"

export default function CompaniesPage() {
  return (
    <>
      <section className="relative h-[450px] flex items-center px-20 pb-20">
        <Image
          src="/companiescover.png"
          alt="Picture of the author"
          quality={100}
          fill={true}
          className="absolute z-0 object-cover" // This will position the image below the text.
        />
        <div className="z-10 w-96">
          <h1 className="uppercase text-4xl text-background font-bold">
            Juntos somos un gran equipo.
          </h1>
        </div>
        <div className="bg-black absolute w-full h-full z-5 top-0 right-0 bg-opacity-30"></div>
      </section>
    </>
  )
}
