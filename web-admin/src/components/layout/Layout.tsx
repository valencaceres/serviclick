import { UserButton, useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

import { useUI } from "~/store/hooks";
import { Menu } from "../functional/Menu";
import Link from "next/link";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

const Header = () => {
  const { isSignedIn } = useSession();
  const { user } = useUser();

  const { title } = useUI();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header
      className={
        "fixed flex h-[70px] w-full border-b border-ultraLightGrey bg-white"
      }
    >
      <div className={"relative flex w-full items-center pl-2 md:w-1/2"}>
        {isSignedIn && user?.publicMetadata.roles.admin && (
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <div
          className={`select-none ${
            isSignedIn && user?.publicMetadata.roles.admin ? "pl-16" : ""
          }`}
        >
          <Link href="/">
            <Image
              alt="ServiClick"
              src="/logo.jpg"
              width={243}
              height={51}
              className={"hidden md:block"}
              onClick={() => setIsOpen(false)}
            />
            <Image
              alt="ServiClick Logo"
              src="/favicon.ico"
              width={48}
              height={48}
              className={"md:hidden"}
              onClick={() => setIsOpen(false)}
            />
          </Link>
        </div>
      </div>
      <div
        className={
          "flex w-full select-none items-center justify-end gap-2 bg-white px-5 text-[22px] font-semibold text-teal-blue md:w-1/2 md:justify-between md:bg-primary-500 md:text-white"
        }
      >
        {title}
        {isSignedIn && !user?.publicMetadata.roles.admin && <UserButton />}
      </div>
    </header>
  );
};

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pl-12 pt-24">
      {children}
    </main>
  );
};
