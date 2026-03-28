import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Navigation } from "@/components/navigatoin";
import { authClient } from "@/lib/auth-client";

const PrivateLayout = async ({ children }: LayoutProps<"/">) => {
  const session = await authClient.getSession({
    fetchOptions: {
      credentials: "include",
      headers: await headers()
    }
  });

  if (!session.data?.user) {
    return redirect("/");
  }

  const user = session.data.user;

  return (
    <div className="flex flex-col">
      <Navigation name={user?.email ?? ""} />
      <div className="p-6 h-[calc(100vh-64px)] mt-10">{children}</div>
    </div>
  );
};

export default PrivateLayout;
