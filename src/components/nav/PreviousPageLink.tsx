import Link from "next/link";
import Image from "next/image";

const PreviousPageLink = (href: string, customClassName: string) => {
  return <Link href={href}>Voltar</Link>;
};

export default PreviousPageLink;
