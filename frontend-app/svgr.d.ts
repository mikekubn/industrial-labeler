declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  // biome-ignore lint/suspicious/noExplicitAny: <disabled for svg declaration>
  const content: any;
  export default content;
}
