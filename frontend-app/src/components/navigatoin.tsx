"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const items = [
  {
    href: "/dashboard",
    label: "Přehled"
  },
  {
    href: "/admin",
    label: "Administrace"
  }
];

const Navigation = ({ name }: { name: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        }
      }
    });
  };

  return (
    <nav className="z-50 fixed top-0 left-0 flex flex-row h-16 w-full items-center bg-white justify-between px-6 border-b border-gray-200">
      <ul className="flex flex-row gap-4">
        {items.map((item) => (
          <li
            key={item.href}
            className={cn("hover:underline cursor-pointer underline-offset-4", pathname === item.href && "font-bold")}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-4 items-center">
        <p>{name}</p>
        <Button onClick={handleLogout} size="sm" className="cursor-pointer" title="Odhlásit se">
          Odhlásit se
        </Button>
      </div>
    </nav>
  );
};

export { Navigation };
