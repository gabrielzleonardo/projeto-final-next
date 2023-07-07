"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  return (
    <>
      <button onClick={openModal}>
        <Image
          src="/ui-icons/menu-icon.svg"
          width={24}
          height={18}
          alt="ícone para abrir o menu"
        />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default MobileMenu;
