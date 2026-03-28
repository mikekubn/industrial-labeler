import "server-only";

const FAVICONS = [
  {
    rel: "apple-touch-icon",
    url: "/favicon/favicon.png",
    sizes: "180x180"
  },
  {
    url: "/favicon/favicon.png",
    rel: "icon",
    sizes: "48x48",
    type: "image/png"
  },
  {
    url: "/favicon/favicon.png",
    rel: "icon",
    sizes: "32x32",
    type: "image/png"
  },
  {
    url: "/favicon/favicon.png",
    rel: "icon",
    sizes: "16x16",
    type: "image/png"
  },
  { url: "/favicon/favicon.ico", rel: "shortcut icon" }
];

export { FAVICONS };
