import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const IsLogged = async ({ children }: any) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  // console.log(session);
  return (
    <div>
      <pre className="text-white">{JSON.stringify(session, null, 2)}</pre>
      {children}
    </div>
  );
};

export default IsLogged;
