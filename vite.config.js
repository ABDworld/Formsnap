import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                     // autorise l’accès extérieur
    allowedHosts: [
      "belle-wb-fired-camps.trycloudflare.com" // ← ton sous-domaine Cloudflare
    ]
    // Astuce MVP : tu peux aussi mettre `allowedHosts: "all"` pour ne plus te soucier de la liste
  },
});


