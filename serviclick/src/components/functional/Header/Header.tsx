import Image from "next/image";

import useUI from "../../../hooks/useUI";
/* import { UserButton, useSession, useUser } from "@clerk/nextjs"; */
import { cn } from "~/utils/cn";

const Header = () => {
  const { title } = useUI();
/*   const { isSignedIn } = useSession();
  const { user } = useUser(); */

  return (
    <div className={"flex h-[70px] w-full border-b border-ultraLightGrey"}>
      <div className={"flex w-full items-center pl-2 md:w-1/2"}>
        <div
          className={`select-none flex items-center gap-2 pl-16 `}
        >
          <Image
            alt="ServiClick"
            src="/logo.jpg"
            width={243}
            height={51}
            className={"hidden md:block"}
          />
          <Image
            alt="ServiClick Logo"
            src="/favicon.png"
            width={48}
            height={48}
            className={"md:hidden"}
          />
        </div>
      </div>
      <div
        className={`flex h-full w-full items-center bg-primary-500 px-5 text-[22px] font-semibold text-white md:w-1/2 justify-between`}
      >
        {title}
{/*         {isSignedIn && !user?.publicMetadata.roles?.serviclick && (
          <UserButton />
        )} */}
      </div>
    </div>
  );
};

export default Header;