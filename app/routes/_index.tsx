import type { MetaFunction } from "@remix-run/node";
import ExperienceCard from "~/components/experience/ExperienceCard";
import ExperienceCardWithPicture from "~/components/experience/ExperienceCardWithPicture";
import BackToTopButton from "~/components/layout/BackToTop";
import ProjectWithPicture from "~/components/projects/ProjectWithPicture";

import configs from "~/configs/configs";
import PublicationWithPicture from "~/publications/PublicationWithPicture";

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
                <p className="font-courierPrime text-xl mx-6">
                  Outside of work, I enjoy photography📷, cycling🚴️, and
                  watching movies🎬.
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
          </a>{" "}
          and{" "}
          <a
            href="https://www.openfigi.com/api"
            target="_blank"
            className="underline underline-offset-4"
          >
            OpenFIGI API
          </a>
          .
        </p>
      </ExperienceCard>
      <ExperienceCard
        title="Brown Visual Computing Lab"
        date="July 2021 - April 2022"
        location="Providence, RI"
      >
        <p className="font-courierPrime text-xl mt-2">Research Assistant.</p>
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
            TrakCare
          </a>
          .
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

      <h1 className="font-blackOpsOne text-4xl mt-6 mb-2">Publications</h1>
      <PublicationWithPicture
        title="Neural Fields in Visual Computing and Beyond"
        pictureFileName="neuralFields.png"
        webLink="https://neuralfields.cs.brown.edu/eg22.html"
        pdfLink="https://arxiv.org/pdf/2111.11426"
        abstract="Recent advances in machine learning have created increasing interest in solving visual computing problems using a class of coordinate-based neural networks that parametrize physical properties of scenes or objects across space and time. These methods, which we call neural fields, have seen successful application in the synthesis of 3D shapes and image, animation of human bodies, 3D reconstruction, and pose estimation. However, due to rapid progress in a short time, many papers exist but a comprehensive review and formulation of the problem has not yet emerged. In this report, we address this limitation by providing context, mathematical grounding, and an extensive review of literature on neural fields. This report covers research along two dimensions. In Part I, we focus on techniques in neural fields by identifying common components of neural field methods, including different representations, architectures, forward mapping, and generalization methods. In Part II, we focus on applications of neural fields to different problems in visual computing, and beyond (e.g., robotics, audio). Our review shows the breadth of topics already covered in visual computing, both historically and in current incarnations, demonstrating the improved quality, flexibility, and capability brought by neural fields methods. Finally, we present a companion website that contributes a living version of this review that can be continually updated by the community."
      ></PublicationWithPicture>
      <PublicationWithPicture
        title="The NiuTrans System for the WMT20 Quality Estimation Shared Task"
        pictureFileName="mtqe.png"
        webLink="https://aclanthology.org/2020.wmt-1.117/"
        pdfLink="https://www.statmt.org/wmt20/pdf/2020.wmt-1.117.pdf"
        abstract="This paper describes the submissions of the NiuTrans Team to the WMT 2020 Quality Estimation Shared Task. We participated in all tasks and all language pairs. We explored the combination of transfer learning, multi-task learning and model ensemble. Results on multiple tasks show that deep transformer machine translation models and multilingual pretraining methods significantly improve translation quality estimation performance. Our system achieved remarkable results in multiple level tasks, e.g., our submissions obtained the best results on all tracks in the sentence-level Direct Assessment task."
      ></PublicationWithPicture>

      <BackToTopButton></BackToTopButton>
    </div>
  );
}
