import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0으로 바인딩 (LAN에서 접근 가능)
    port: 5173,
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, "certs/localhost+3-key.pem")
      ),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost+3.pem")),
    },
  },
});
