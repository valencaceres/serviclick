import React from "react";
import { useRouter } from "next/router";
import { UserButton, useUser } from "@clerk/nextjs";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

interface Route {
  text: string;
  route?: string;
  roles?: string[];
  subRoutes?: Route[];
}

const routes = [
{
  text: "Novedades",
  roles: ["moderator","admin"],
  route: "/news",
},
{
  text:"Hero",
  roles: ["moderator","admin"],
  route: "/hero",
},
{
  text:"Categorias",
  roles: ["moderator","admin"],
  route: "/category",
},
{
  text:"Familias",
  roles: ["moderator","admin"],
  route: "/family",
},

];

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Menu({ isOpen, setIsOpen }: MenuProps) {
  const user = useUser();
  return (
    <>
      <nav
        className={`border-grayDark-6 absolute left-0 top-0 z-20 flex h-screen flex-col justify-between overflow-y-auto border-r bg-white duration-75 ${
          isOpen ? "w-64" : "w-12"
        }`}
      >
        <div className="w-full">
          <div
            className={`flex w-full px-2 py-4 ${
              !isOpen ? "justify-center" : "justify-end"
            }`}
          >
            <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className={`flex flex-col gap-2 p-1 ${!isOpen ? "hidden" : ""}`}>
            {routes.map((route, key) => (
              <MenuItem
                key={key}
                route={route}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div>
          <div className={`flex items-center justify-start gap-2 p-2`}>
            <UserButton />
            <p
              className={`${
                !isOpen ? "hidden" : ""
              } whitespace-nowrap text-sm text-black`}
            >
              {user.user?.fullName}
            </p>
          </div>
        </div>
      </nav>
      <div
        className={`absolute left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-20 ${
          isOpen ? "" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
}

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {!isOpen ? (
        <MenuIcon
          size={24}
          className="text-teal-blue hover:text-teal-blue-300"
        />
      ) : (
        <XIcon size={24} className="text-teal-blue hover:text-teal-blue-300" />
      )}
    </button>
  );
};

interface MenuItemProps {
  route: Route;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ route, isOpen, setIsOpen }) => {
  const { pathname } = useRouter();
  const { user } = useUser();
  const userRoles = user?.publicMetadata.roles?.admin;

  const userHasRole = (role: string) => {
    return userRoles === role;
  };

  if (route.roles && !route.roles.some(userHasRole)) {
    return null;
  }

  if (!route.route && !route.subRoutes) {
    return (
      <li
        className={`flex w-full list-none p-2  text-dusty-gray-200 line-through ${
          pathname === route.route ? "font-extrabold" : "font-medium"
        }`}
      >
        {route.text}
      </li>
    );
  }

  if (!route.route)
    return (
      <Accordion type="multiple">
        <AccordionItem
          className="list-none rounded-md border border-dusty-gray-100 px-2 text-teal-blue-100 shadow-sm hover:border-teal-blue-100"
          value={route.text}
        >
          <AccordionTrigger>{route.text}</AccordionTrigger>
          <AccordionContent>
            {route.subRoutes?.map((subRoute) => (
              <MenuItem
                key={subRoute.text}
                route={subRoute}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

  return (
    <li
      className={`flex w-full list-none p-2  text-teal-blue-100 ${
        pathname === route.route ? "font-extrabold" : "font-medium"
      }`}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      <Link className="w-full py-2 hover:underline" href={route.route}>
        {route.text}
      </Link>
    </li>
  );
};
