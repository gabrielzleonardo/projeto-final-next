import Link from "next/link";
import Image from "next/image";
const UserOrders = () => {
  const numberOfOrders = 0;
  return (
    <Link className="relative lg:btn-primary flex items-center gap-2" href="/">
      <div className="bg-tomato-100 h-6 w-6 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-center lg:hidden">
        <span>0</span>
      </div>
      <Image
        src="/ui-icons/receipt-icon.svg"
        width={26}
        height={22}
        alt="Meus pedidos"
      />

      <span className="hidden lg:block">Pedidos ({numberOfOrders})</span>
    </Link>
  );
};

export default UserOrders;
