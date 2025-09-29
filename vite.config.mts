// To load env variables in build script
import swc from "unplugin-swc"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import "dotenv/config"

/**
 * Using bun for development and vite for production
 * 1.	@Tramsform decorator doesn't work in vite dev.
 * 2. Bun build could not handle external packages.
 */

const mainFile = "./src/main.ts"

export default () => {
	return defineConfig({
		esbuild: false,
		plugins: [
			tsconfigPaths(),
			swc.vite(),
		],
		build: {
			sourcemap: true,
			ssr: mainFile,
			rollupOptions: { input: mainFile },
		},
		optimizeDeps: { noDiscovery: true },
	})
}
