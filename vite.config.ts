import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
	server: {
		proxy: {
			"/api": {
				changeOrigin: true,
				target: "http://localhost:3000",
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
