import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LactoClear - Peak Recovery Protocol",
    short_name: "LactoClear",
    description:
      "Breaking the lactate barrier and restoring metabolic balance. Advanced two-step protocol for mitochondrial support and metabolic recovery.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00D036",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
    ],
  };
}
