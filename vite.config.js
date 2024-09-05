import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/connect": {
				target: import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8888/api/v1",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/connect/, ""),
			},
		},
	},
});
