import { redirect } from "next/navigation";

import { RegistrationForm } from "@/components/forms/registration-form";
import { extractEnvVariableToString } from "@/lib/env";

const RegistrationPage = async ({ searchParams }: { searchParams: Promise<{ secret: string }> }) => {
  const searchParamSecret = (await searchParams).secret;
  const rootAppSecret = extractEnvVariableToString("ROOT_APP_SECRET", process.env.ROOT_APP_SECRET);

  if (searchParamSecret !== rootAppSecret) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen h-full flex-col overflow-y-auto">
      <div className="flex flex-1 items-center justify-center p-4">
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
