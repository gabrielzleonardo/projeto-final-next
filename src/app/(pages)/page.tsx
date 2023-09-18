import Image from "next/image";

import Button from "@/components/nav/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userIsAdmin = session?.user.isAdmin;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>user is admin: {String(userIsAdmin)}</div>
      <Button />
    </main>
  );
}
