import { LinksFunction, MetaFunction } from "@remix-run/node";
import ClientOnly from "~/components/ClientOnly";
import FootPrintMap from "~/components/FootPrintMap.client";
import configs from "~/configs/configs";

import {
  footPrintsWithPicture,
  footPrintsWithoutPicture,
} from "~/configs/footPrints";

export const meta: MetaFunction = () => {
  return [
    { title: `${configs.navBar.name} | Footprints` },
    {
      name: "description",
      content: `${configs.navBar.name} footprints`,
    },
    {
      name: "keywords",
      content: `personal, website, about, profile, ${configs.navBar.name}, footprints`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

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
