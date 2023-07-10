import Image from "next/image";

import Button from "@/components/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export default async function Home() {
  const session = await getServerSession(authOptions);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>is admin{String(session?.user.isAdmin)}</div>
      <Button />
    </main>
  );
}
