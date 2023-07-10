import Image from "next/image";
import Link from "next/link";
const Logo = ({ userIsAdmin }: { userIsAdmin?: boolean }) => {
  return (
    <Link
      href="/"
      className="text-light-100 text-xl font-bold gap-2 flex lg:flex-col items-center lg:justify-center lg:gap-0 max-w-fit whitespace-nowrap"
    >
      <div className="flex gap-2">
        <Image
          src="/logo.svg"
          alt="logo food explorer"
          width={24}
          height={24}
        />
        <span>food explorer</span>
      </div>
      {!!userIsAdmin && (
        <span className="text-cake-200 text-sm lg:self-end lg:text-xs font-normal">
          admin
        </span>
      )}
    </Link>
  );
};

export default Logo;
