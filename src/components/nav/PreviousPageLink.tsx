import Link from "next/link";
import Image from "next/image";

interface IPreviousPageLink {
  href: string;
  customClassName?: string;
}

const PreviousPageLink = ({ href, customClassName }: IPreviousPageLink) => {
  return (
    <Link
      href={href}
      className={`${customClassName} text-link text-base flex items-center w-fit gap-2 text-light-300 hover:text-light-200 duration-300 lg:text-2xl lg:font-bold`}
    >
      <Image
        src="/ui-icons/leftArrow-icon.svg"
        width={12}
        height={22}
        alt="return icon"
        className=""
      />
      <span>Voltar</span>
    </Link>
  );
};

export default PreviousPageLink;
