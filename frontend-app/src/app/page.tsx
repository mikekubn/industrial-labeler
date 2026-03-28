import { LoginForm } from "@/components/forms/login-form";

const HomePage = () => {
  return (
    <main className="flex min-h-screen h-full flex-col overflow-y-auto">
      <div className="w-full h-25 bg-white z-50 shrink-0">
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <LoginForm />
      </div>
    </main>
  );
};

export default HomePage;
