import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineManifest, crx } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Element-Controller",
  description: "Web Site HTML Element Controlling",
  version: "1.0.0",
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      js: ["src/contentScript/ContentScripts.ts"],
      matches: ["<all_urls>"],
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});