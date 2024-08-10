import type { MetaFunction } from "@remix-run/node";
import ExperienceCard from "~/components/experience/ExperienceCard";
import ExperienceCardWithPicture from "~/components/experience/ExperienceCardWithPicture";

import configs from "~/configs/configs";

export const meta: MetaFunction = () => {
  return [
    { title: `${configs.navBar.name} | About` },
    { name: "description", content: `about ${configs.navBar.name}` },
    {
      name: "keywords",
      content: `personal, website, about, profile, ${configs.navBar.name}`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function About() {
  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={`bg-[${configs.colors.primary}] w-full sm:mt-4 py-5 rounded-xl h-full lg:h-5/6 my-auto mx-auto flex justify-center align-middle`}
      >
        <div className="w-full h-full md:grid md:grid-cols-5">
          <div className="col-span-2 md:h-full md:w-full h-full flex">
            <img
              src="pictures/avatar.jpg"
              alt={configs.navBar.name}
              className="w-2/3 md:w-3/4 mt-4 mx-auto md:my-auto rounded-lg mb-4 md:mt-12"
            />
          </div>
          <div className="col-span-3 flex flex-col items-center w-full h-full">
            <div className="w-7/8 h-7/8 mx-auto my-auto flex flex-col items-center">
              <h1 className="text-5xl font-blackOpsOne md:my-1 lg:mb-2">
                Shiqn Yan
              </h1>
              <img
                src="pictures/signature.png"
                className="mb-4"
                alt="signature"
              />
              <div>
                <p className="font-courierPrime text-xl mx-6">
                  I am a software engineer at{" "}
                  <a
                    href="https://www.bloomberg.com/company/stories/meet-the-team-data-technologies-engineering/"
                    target="_blank"
                    className=" underline underline-offset-4"
                  >
                    Bloomberg
                  </a>
                  , based in Princeton, New Jersey, USA.
                </p>
                <p className="font-courierPrime text-xl mx-6">
                  I'm passionate about solving real-world problems with my
                  Computer Science skills.🤔️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-blackOpsOne text-4xl mt-6 mb-2">Experience</h1>
      <ExperienceCard
        title="Bloomberg L.P."
        date="July 2022 - Present"
        location="Princeton, NJ"
      >
        <p className="font-courierPrime text-xl mt-2">
          Full-stack developer supporting{" "}
          <a
            href="https://www.openfigi.com/"
            target="_blank"
            className="underline underline-offset-4"
          >
            openfigi.com
          </a>
          .
        </p>
        .
      </ExperienceCard>
      <ExperienceCard
        title="Brown Visual Computing"
        date="July 2021 - April 2022"
        location="Providence, RI"
      >
        <p className="font-courierPrime text-xl mt-2">
          Contributor to{" "}
          <a
            href="https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.14505"
            target="_blank"
            className="underline underline-offset-4 italic"
          >
            Neural fields in visual computing and beyond
          </a>
          .
        </p>
      </ExperienceCard>
      <ExperienceCard
        title="InterSystems Corporation"
        date="May 2021 - August 2021"
        location="Cambridge, MA"
      >
        <p className="font-courierPrime text-xl mt-2">
          Software development intern working on{" "}
          <a
            href="https://www.intersystems.com/products/trakcare/"
            target="_blank"
            className="underline underline-offset-4"
          >
            TrakCare.
          </a>
        </p>
      </ExperienceCard>
      <h1 className="font-blackOpsOne text-4xl mt-6 mb-2">Education</h1>
      <ExperienceCardWithPicture
        title="Brown University"
        date="2020 - 2022"
        pictureFileName="brown.png"
      >
        <p className="font-courierPrime text-xl mt-2">
          Master of Science in Computer Science
        </p>
      </ExperienceCardWithPicture>
      <ExperienceCardWithPicture
        title="National University of Singapore"
        date="2019"
        pictureFileName="nus.png"
      >
        <p className="font-courierPrime text-xl mt-2">
          Summer Research at NUS School of Computing
        </p>
      </ExperienceCardWithPicture>
      <ExperienceCardWithPicture
        title="University of Pennsylvania"
        date="2018"
        pictureFileName="upenn.png"
      >
        <p className="font-courierPrime text-xl mt-2">Exchange Undergraduate</p>
      </ExperienceCardWithPicture>
      <ExperienceCardWithPicture
        title="Northeastern University (China)"
        date="2016 - 2020"
        pictureFileName="neu.png"
      >
        <p className="font-courierPrime text-xl mt-2">
          Bachelor of Engineering in Computer Science
        </p>
      </ExperienceCardWithPicture>
    </div>
  );
}
