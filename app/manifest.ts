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
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
