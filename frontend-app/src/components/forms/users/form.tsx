"use client";

import { Suspense, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { JsonViewer } from "@/components/json-viewer";
import { Button } from "@/components/ui/button";
import { fetchAllUsers } from "@/components/users/utils/fetch-all-users";

import { toast } from "sonner";

const GetAllUsersFormInner = () => {
  const { data, error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["users", "all"],
    queryFn: () => fetchAllUsers()
  });

  useEffect(() => {
    if (error) {
      toast.error("Chyba při načítání uživatelů");
    }
  }, [error]);

  return (
    <div className="grid grid-cols-2 gap-10 items-start">
      <div className="flex flex-col items-center justify-center w-80">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer disabled:cursor-not-allowed"
          size="lg"
          onClick={() => refetch()}
        >
          {isLoading ? "Načítám..." : "Načíst uživatele"}
        </Button>
      </div>
      <JsonViewer data={data as typeof data | null} error={error as typeof data | null} />
    </div>
  );
};

const GetAllUsersForm = () => {
  return (
    <Suspense fallback={null}>
      <GetAllUsersFormInner />
    </Suspense>
  );
};

export { GetAllUsersForm };
