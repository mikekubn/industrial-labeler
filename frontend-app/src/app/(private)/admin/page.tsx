import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { items } from "@/components/tabs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { extractEnvVariableToString } from "@/lib/env";

const AdminPage = async ({ searchParams }: { searchParams: Promise<{ secret: string }> }) => {
  const searchParamSecret = (await searchParams).secret;
  const rootAppSecret = extractEnvVariableToString("ROOT_APP_SECRET", process.env.ROOT_APP_SECRET);
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  });

  const isAdmin = session.data?.user.role === "admin";

  if (!isAdmin) {
    if (searchParamSecret !== rootAppSecret) {
      redirect("/dashboard");
    }
  }

  return (
    <Tabs defaultValue="account" className="size-full">
      <div className="fixed w-full flex justify-start bg-white z-10 py-2">
        <TabsList variant="line" className="h-fit">
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="cursor-pointer">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {items.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className="py-4 size-full flex flex-col items-center justify-start mt-20 overflow-y-auto"
        >
          {item.children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AdminPage;
