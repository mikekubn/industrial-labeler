import type { QuantityRequestSchema } from "@/services/quantity/schemes/quantity";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { getQuantityService } from "@/services/quantity/service";

import { toast } from "sonner";

const EditableQuantityCell = ({
  initialValue,
  quantityId,
  recordId,
  quantityField,
  quantity
}: {
  initialValue: number;
  quantityId: string;
  recordId: string;
  quantityField: "input" | "output";
  quantity: QuantityRequestSchema;
}) => {
  const [value, setValue] = useState<number | string>(initialValue);
  const queryClient = useQueryClient();
  const quantityService = getQuantityService();
  const hasQuantityId = !!quantityId;

  const update = useMutation({
    mutationFn: (newValue: number) => {
      return quantityService.updateQuantity({
        id: quantityId,
        data: {
          isMarked: quantity?.isMarked ?? false,
          input: quantityField === "input" ? newValue : (quantity?.input ?? 0),
          output: quantityField === "output" ? newValue : (quantity?.output ?? 0)
        }
      });
    },
    onSuccess: async () => {
      toast.success("Množství bylo úspěšně aktualizováno");
      await queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Chyba při aktualizaci množství");
    }
  });

  const create = useMutation({
    mutationFn: (newValue: number) => {
      return quantityService.createQuantity({
        recordId,
        input: quantityField === "input" ? newValue : (quantity?.input ?? 0)
      });
    },
    onSuccess: async () => {
      toast.success("Množství bylo úspěšně vytvořeno");
      await queryClient.invalidateQueries({ queryKey: ["records"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Chyba při vytváření množství");
    }
  });

  const onBlur = () => {
    if (value === "") return;

    const numValue = Number(value);

    if (!isNaN(numValue)) {
      if (!hasQuantityId) {
        create.mutate(numValue);
      } else {
        update.mutate(numValue);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const isQuantityInputZeroOrUndefined = quantity?.input <= 0 || quantity?.input === undefined;
  const isDisabled = update.isPending || create.isPending;
  const isDisabledWithoutQuantityId = isQuantityInputZeroOrUndefined && quantityField === "output";

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className="w-full min-w-[80px] text-center"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      onClick={() => console.log("input", quantity?.input)}
      onKeyDown={onKeyDown}
      type="number"
      disabled={isDisabled || isDisabledWithoutQuantityId}
    />
  );
};

export { EditableQuantityCell };
