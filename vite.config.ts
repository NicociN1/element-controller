import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineManifest, crx } from "@crxjs/vite-plugin";

const manifest = (mode: string) => defineManifest({
  manifest_version: 3,
  name: "Element-Controller",
  description: "Web Site HTML Element Controller",
  version: "1.0.0",
  permissions: ["sidePanel"],
  ...(mode === "sidepanel" && {
    side_panel: {
      default_path: "index.html",
    },
    background: {
      service_worker: "src/background.ts",
      type: "module",
    },
    action: {}
  }),
  ...(mode === "popup" && {
    action: {
      default_popup: "index.html"
    }
  }),
  ...(mode === "devtools" && {
    devtools_page: "devtools.html",
    action: {},
  }),
  content_scripts: [
    {
      js: ["src/contentScript/ContentScripts.ts"],
      matches: ["<all_urls>"],
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      crx({
        manifest: manifest(mode),
      }),
    ],
    build: {
      outDir: "dist/devtools",
    },
  };
});
