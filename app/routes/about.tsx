import type { MetaFunction } from "@remix-run/node";

import configs from "~/configs/configs";

export const meta: MetaFunction = () => {
  return [
    { title: `${configs.navBar.name} | About` },
    { name: "description", content: `${configs.navBar.name} personal website` },
    {
      name: "keywords",
      content: `personal, website, about, profile ${configs.navBar.name}`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function About() {
  return (
    <div className="w-full h-[93vh] flex">
      <div
        className={`bg-[${configs.colors.primary}] w-full h-3/4 my-auto mx-auto`}
      ></div>
    </div>
  );
}
