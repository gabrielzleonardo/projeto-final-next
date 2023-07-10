import MobileMenu from "../nav/MobileMenu";
import SignOutButton from "../SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserOrders from "../nav/UserOrders";
import Logo from "../ui/Logo";
import Link from "next/link";
import Image from "next/image";
const Header = async () => {
  const session = await getServerSession(authOptions);
  const userIsAdmin = session?.user.isAdmin;
  return (
    <header className="bg-dark-700 pt-14 pb-6">
      <div className="flex container lg:px-24 justify-between gap-8">
        <MobileMenu userIsAdmin={userIsAdmin} />
        <Logo userIsAdmin={userIsAdmin} />
        
          <div className="hidden lg:flex flex-1 ">
            <button className="bg-dark-900 pl-4 pr-2 rounded-l-md">
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
     
        {userIsAdmin && (
          <Link className="btn btn-primary hidden lg:block max-w-[200px]" href="/">
            Novo prato
          </Link>
        )}

        {!userIsAdmin ? <UserOrders /> : <div className="lg:hidden" />}
        <SignOutButton />
      </div>
    </header>
  );
};

export default Header;
