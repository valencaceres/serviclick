import React, { useState } from "react";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { Menu } from "../functional/Menu";
import { SelectBroker } from "../functional/SelectBroker";

import { useUI } from "~/store/hooks";
import { Button } from "../ui/Button";
import { PlusIcon } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Serviclick.cl - Broker</title>
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
  const router = useRouter();

  const { title } = useUI();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const { broker, setBroker } = useUI();

  return (
    <header
      className={
        "fixed z-20 flex h-32 w-full flex-col border-ultraLightGrey bg-white"
      }
    >
      <div className="relative flex w-full items-center border-b bg-white md:bg-primary-500 ">
        {isSignedIn && <Menu isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div className={"flex w-full items-center bg-white p-2 md:w-1/2"}>
          <div className={`select-none ${isSignedIn ? "pl-16" : ""}`}>
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
            "flex w-full select-none items-center justify-end bg-white pl-5 pr-2 text-[22px] font-semibold text-teal-blue md:w-1/2 md:justify-start md:bg-primary-500 md:text-white"
          }
        >
          {title}
        </div>
      </div>
      {isSignedIn && (
        <div
          className={`relative border-b flex w-full justify-between p-2 ${
            isSignedIn ? "pl-16" : ""
          }`}
        >
          <>
            <SelectBroker
              broker={broker}
              setBroker={setBroker}
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
