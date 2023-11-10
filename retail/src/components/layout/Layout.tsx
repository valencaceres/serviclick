import React, { useState } from "react";
import { UserButton, useSession, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { Menu } from "../functional/Menu";
import { SelectRetail } from "../functional/SelectRetail";

import { useUI } from "~/store/hooks";
import { Button } from "../ui/Button";
import { PlusIcon } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Serviclick.cl - Retail</title>
        <meta name="description" content="Serviclick Admin Module" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

const Header = () => {
  const { isSignedIn } = useSession();
  const { user } = useUser();
  const router = useRouter();

  const { title } = useUI();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const { retail, setRetail } = useUI();

  return (
    <header
      className={
        "fixed z-20 flex h-32 w-full flex-col border-ultraLightGrey bg-white"
      }
    >
      <div className="relative flex w-full items-center border-b bg-white md:bg-primary-500 ">
        {isSignedIn && user?.publicMetadata.roles.retail && (
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <div className={"flex w-full items-center bg-white p-2 md:w-1/2"}>
          <div
            className={`select-none ${
              isSignedIn && user?.publicMetadata.roles.retail ? "pl-16" : ""
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
          {isSignedIn && !user?.publicMetadata.roles.retail && <UserButton />}
        </div>
      </div>
      {isSignedIn && user?.publicMetadata.roles.retail && (
        <div
          className={`relative flex w-full justify-between border-b p-2 ${
            isSignedIn ? "pl-16" : ""
          }`}
        >
          <>
            <SelectRetail
              retail={retail}
              setRetail={setRetail}
              open={open}
              setOpen={setOpen}
            />
            {router.pathname !== "/sale" && (
              <Button
                className="hidden gap-1 md:flex"
                type="button"
                onClick={() => void router.push("/sale")}
              >
                <PlusIcon size={20} />
                Nueva Venta
              </Button>
            )}
          </>
        </div>
      )}
    </header>
  );
};

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-32">
      {children}
    </main>
  );
};
