import { LinksFunction } from "@remix-run/node";
import ClientOnly from "~/components/ClientOnly";
import FootPrintMap from "~/components/FootPrintMap.client";

import {
  footPrintsWithPicture,
  footPrintsWithoutPicture,
} from "~/configs/footPrints";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css",
  },
];

export default function FootPrints() {
  return (
    <>
      <ClientOnly>
        {() => (
          <FootPrintMap
            footPrintsWithPicture={footPrintsWithPicture}
            footPrintsWithoutPicture={footPrintsWithoutPicture}
          ></FootPrintMap>
        )}
      </ClientOnly>
    </>
  );
}
