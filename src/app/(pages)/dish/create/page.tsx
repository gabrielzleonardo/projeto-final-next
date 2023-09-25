import PreviousPageLink from "@/components/nav/PreviousPageLink";
 import DishRegisterForm from "@/components/forms/DishRegisterForm";

const page = () => {
  return (
    <div className="container pt-3 pb-14">
      <PreviousPageLink href="/" />
      <DishRegisterForm />
    </div>
  );
}

export default page;