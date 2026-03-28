import type { ExportRequestSchema } from "@/services/export/schemes/export";

import { useQuery } from "@tanstack/react-query";
import { getExportService } from "@/services/export/service";

import { Button } from "./ui/button";

const ExportButton = ({ from, to, isMarked, limit }: ExportRequestSchema) => {
  const exportService = getExportService();

  const query = useQuery({
    queryKey: ["export", from, to, isMarked],
    queryFn: () => exportService.exportXlsx({ from, to, isMarked, limit }),
    enabled: false
  });

  const handleClick = async () => {
    const blob = await query.refetch();

    if (blob.data) {
      const url = URL.createObjectURL(blob.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.xlsx";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  return (
    <Button onClick={handleClick} variant="secondary" className="cursor-pointer">
      Exportovat data
    </Button>
  );
};

export default ExportButton;
