import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { copyFileSync } from "node:fs";
import { join } from "node:path";

import configs from "./app/configs/configs";

export default defineConfig({
  base: "/portfolio-in-10-mins/",
  plugins: [
    remix({
      basename: "/portfolio-in-10-mins/",
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index.tsx", { index: true });
          configs.routes.forEach((routeName) => {
            route(routeName, `routes/${routeName}.tsx`);
          });
        });
      },
      buildEnd(args) {
        if (!args.viteConfig.isProduction) return;
        // When deploying to GitHub Pages, if you navigate from / to another
        // route and refresh the tab, it will show the default GH Pages 404
        // page. This happens because GH Pages is not configured to send all
        // traffic to the index.html where we can load our client-side JS.
        // To fix this, we can create a 404.html file that contains the same
        // content as index.html. This way, when the user refreshes the page,
        // GH Pages will serve our 404.html and everything will work as
        //expected.
        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(
          join(buildPath, "index.html"),
          join(buildPath, "404.html")
        );
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
