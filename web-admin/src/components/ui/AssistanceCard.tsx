/* import Image from "next/image";
import Link from "next/link";

import { Button } from "./Button";
type AssistanceCardProps = {
  family_id: string;
  title: string;
  imageLink: string;
  link: string;
};

export const AssistanceCard = ({
  family_id,
  title,
  imageLink,
  link,
}: AssistanceCardProps) => {
  return (
    <article className="border-primary border-t-4 bg-slate-50">
      <div className="p-2">
        <div className="relative h-[250px] w-full">
          <Image
            src={imageLink}
            alt="Slide 1"
            fill={true}
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex h-24 w-full items-center justify-center">
        <h2 className="font-bebas text-center text-2xl uppercase">{title}</h2>
      </div>
      <Link href={link} passHref={true}>
        <Button className="bg-foreground font-bebas w-full rounded-none text-2xl uppercase">
          Ver más
        </Button>
      </Link>
    </article>
  );
};
 */
