import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <section>
      <Header />

      {JSON.stringify(session, null, 2)}
      {children}
      <Footer />
    </section>
  );
}
