import ReactJson from "react-json-view";

const JsonViewer = <T,>({ data, error }: { data: T | null; error: T | null }) => {
  return (
    <div className="flex flex-col w-120 overflow-y-auto border border-border rounded-md min-h-30">
      {data && <ReactJson src={typeof data === "object" ? data : { value: data }} theme="monokai" />}
      {error && (
        <ReactJson
          src={(() => {
            if (error instanceof Error) {
              return { message: error.message, name: error.name, stack: error.stack };
            }
            if (typeof error === "object" && error !== null) {
              return error as object;
            }
            return { value: String(error) };
          })()}
          theme="monokai"
        />
      )}
    </div>
  );
};

export { JsonViewer };
