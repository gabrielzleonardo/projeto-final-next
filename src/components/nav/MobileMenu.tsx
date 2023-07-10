"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
const MobileMenu = ({ userIsAdmin }: { userIsAdmin?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="grid align-content-center lg:hidden">
      <button  onClick={openModal}>
        <Image
          src="/ui-icons/menu-icon.svg"
          width={24}
          height={18}
          alt="ícone para abrir o menu"
        />
      </button>
      <Dialog className="fixed inset-0" open={isOpen} onClose={closeModal}>
        <Dialog.Panel className="bg-dark-400 h-screen">
          <div className="bg-dark-700  pt-16 pb-8">
            <div className="flex container gap-4">
              <button onClick={closeModal}>
                <Image
                  src="/ui-icons/close-icon.svg"
                  width={24}
                  height={18}
                  alt="ícone para fechar o menu"
                />
              </button>
              <Dialog.Title>Menu</Dialog.Title>
            </div>
          </div>
          <div className="pt-9 grid place-content-center ">
            <div className="flex w-screen container">
              <button className="bg-dark-900 pl-4 pr-2 rounded-l-md max-w-fit">
                <Image
                  src="/ui-icons/search-icon.svg"
                  width={24}
                  height={24}
                  alt="ícone para para pesquisar"
                />
              </button>
              <input
                type="text"
                className="text-input rounded-l-none w-full"
                placeholder="Busque por pratos ou ingredientes"
              />
            </div>
            <ul className="ul-mobile-menu">
              <li>
                <button onClick={handleSignOut}>Sair</button>
              </li>
              {!!userIsAdmin && (
                <li>
                  <Link href="#">Novo prato</Link>
                </li>
              )}
            </ul>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
