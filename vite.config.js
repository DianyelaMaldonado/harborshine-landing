import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: '/harborshine-landing/',
  plugins: [
    tailwindcss({
      // OBLIGAMOS a Tailwind v4 a escanear de forma estricta tus componentes HTML dentro de src
      content: ["./index.html", "./src/components/**/*.html", "./src/**/*.js"],
    }),
  ],
});
