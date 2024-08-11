import { MetaFunction } from "@remix-run/react";
import BackToTopButton from "~/components/layout/BackToTop";
import configs from "~/configs/configs";

export const meta: MetaFunction = () => {
  return [
    { title: `Ramen the maine coon` },
    {
      name: "description",
      content: `Ramen the Maine coon, ${configs.navBar.name}'s pet`,
    },
    {
      name: "keywords",
      content: `${configs.navBar.name}, pet, ramen`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Ramen() {
  return (
    <div className="mx-4 mt-8 md:mx-0 md:mt-12">
      <h1 className="text-3xl my-2 md:text-5xl font-blackOpsOne font-bold text-center w-full">
        Meet my cat <span className="italic">Ramen 🍜</span>
      </h1>
      <img
        src="pictures/cat/ramen.jpg"
        alt="Ramen"
        className="w-72 mt-2 md:mt-6 mx-auto md:my-auto rounded-lg"
      />
      <div className="mt-6 mx-auto w-fit flex flex-col items-center justify-center font-courierPrime text-2xl">
        <div>
          <p>
            <span className="font-bold">Name:</span> Ramen 🍜
          </p>
          <p>
            <span className="font-bold">DOB:</span> 2023/10/15 🎂
          </p>
          <p>
            <span className="font-bold">Gender:</span> Other 🫣
          </p>
          <p>
            <span className="font-bold">Breed:</span> Maine Coon 🐯
          </p>
          <p>
            <span className="font-bold">Favorite Food:</span> Beef 🐂
          </p>
        </div>
      </div>
      <div className="text-2xl font-courierPrime my-4">
        While not enjoying food or snacks, Ramen loves birding and making bread:
      </div>
      <div className="flex flex-col md:flex-row w-full items-center justify-between">
        <img
          className="w-full md:w-1/2"
          src="pictures/cat/birding.jpg"
          alt="ramen-birding"
        ></img>
        <img
          className="w-full md:w-5/12 mt-8 md:mt-0"
          src="pictures/cat/biscuits.gif"
          alt="ramen-making-bread"
        ></img>
      </div>
      <div className="text-2xl font-courierPrime my-4">
        Ramen is a great example of how cats can act doggy:
      </div>
      <div className="flex flex-col w-full items-center justify-between">
        <img
          className="w-full md:w-1/2"
          src="pictures/cat/walk.jpg"
          alt="ramen-walking"
        ></img>
        <img
          className="w-full md:w-5/12 mt-8"
          src="pictures/cat/dog.gif"
          alt="ramen-dogging"
        ></img>
      </div>

      <BackToTopButton></BackToTopButton>
    </div>
  );
}
