import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_RSVP_WEBAPP_URL?.trim();

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/rsvp": {
          target: target || "https://script.google.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/rsvp/, ""),
        },
      },
    },
  });
};
