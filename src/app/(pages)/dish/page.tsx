"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import Image from "next/image";
import PreviousPageLink from "@/components/nav/PreviousPageLink";
import DishRegisterForm from "@/components/forms/DishRegisterForm";

const Upload = () => {


  return (
    <div className="container pt-3 pb-14">
      <PreviousPageLink href="/" />
      <DishRegisterForm />
    </div>
  );
};

export default Upload;
