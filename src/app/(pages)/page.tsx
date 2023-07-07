import Image from "next/image";

import Button from "@/components/Button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>is admin{session}</div>
      <Button />
    </main>
  );
}
