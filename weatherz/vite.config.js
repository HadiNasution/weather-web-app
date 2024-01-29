import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/weather-web-app/weatherz/",
  plugins: [react()],
});
