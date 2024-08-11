import type { MetaFunction } from "@remix-run/node";
import { ProjectCard } from "~/components/projects/ProjectCard";
import configs from "~/configs/configs";

export const meta: MetaFunction = () => {
  return [
    { title: `${configs.navBar.name} | Projects` },
    {
      name: "description",
      content: `${configs.navBar.name} projects`,
    },
    {
      name: "keywords",
      content: `personal, website, about, profile, ${configs.navBar.name}, projects`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Projects() {
  if (!configs.projectsPage) return null;

  const projectsWithPictures = configs.projectsPage.filter(
    (project) => project.pictureFileName
  );
  const projectsWithoutPictures = configs.projectsPage.filter(
    (project) => !project.pictureFileName
  );

  return (
    <div className="mx-4 mt-10 md:mx-0 md:mt-12">
      <ProjectCard title="Animize" pictureFileName="animize.png">
        <div className="font-courierPrime text-lg md:text-2xl">
          Powered by community detection algorithms and neural style transfer
          models, Animize is an application that can repaint any image in
          Japanese Anime style.
        </div>
        <div className="mt-2 font-courierPrime text-lg md:text-2xl">
          2,000 Anime posters were collected and constructed into a network
          based on similarities. And then a few community detection algorithms
          were run on this network to determine the most representative posters
          of different genres. These posters are further used as style reference
          images in neural style transfer algorithm when stylizing input images.
        </div>
      </ProjectCard>
      <ProjectCard title="NMT-Visualizer" pictureFileName="nmtvis.png">
        <div className="font-courierPrime text-lg md:text-2xl">
          Machine translation models based on neural networks (
          <a
            className="underline underline-offset-4"
            href="https://en.wikipedia.org/wiki/Neural_machine_translation"
            target="_blank"
          >
            NMT
          </a>
          ) have become the state-of-the-art in recent years. However, they are
          often criticized for being black-box models thus hard to debug.
        </div>
        <div className="font-courierPrime text-lg md:text-2xl">
          <p className="mt-2">
            To this end, I developed an open-sourced visualization toolkit{" "}
            <a
              className="underline underline-offset-4"
              href="https://pypi.org/project/nmtvis/"
              target="_blank"
              rel="noopener noreferrer"
            >
              nmtvis
            </a>{" "}
            for visualizing three key mechanisms in NMT models: attention
            mechanism (
            <a
              className="underline underline-offset-4"
              href="https://player-eric.com/resources/nmtvis-demos/attention_demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              demo
            </a>
            ), word embedding (
            <a
              className="underline underline-offset-4"
              href="https://player-eric.com/resources/nmtvis-demos/embedding_demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              demo
            </a>
            ), and beam search decoding (
            <a
              className="underline underline-offset-4"
              href="https://player-eric.com/resources/nmtvis-demos/beam_demo"
              target="_blank"
              rel="noopener noreferrer"
            >
              demo
            </a>
            ). This tool has been helping researchers better understand their
            NMT models.
          </p>
        </div>
      </ProjectCard>
      <ProjectCard title="Cover Your Nose" pictureFileName="coveryournose.png">
        <p className="font-courierPrime text-lg md:text-2xl">
          During the{" "}
          <a
            className="underline underline-offset-4"
            href="https://en.wikipedia.org/wiki/COVID-19_pandemic"
            target="_blank"
          >
            COVID-19 pandemic
          </a>
          , this web app CoverYourNose was developed to help people check if
          they are wearing masks properly.
        </p>

        <p className="font-courierPrime text-lg md:text-2xl mt-2">
          Backed by an Single Shot MultiBox Detector (
          <a
            href="https://arxiv.org/abs/1512.02325"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            SSD
          </a>
          ) trained on ~10k annotated images and a few HAAR-feature based
          faicial landmark detectors, CoverYourNose achieves satisfactory
          performance on detecting inappropriately worn masks. For more details,
          please refer to this{" "}
          <a
            href="https://player-eric.com/resources/CoverYourNoseReport.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            report
          </a>{" "}
          and the{" "}
          <a
            href="https://github.com/player-eric/CoverYourNose"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            code
          </a>
          .
        </p>
      </ProjectCard>
    </div>
  );
}
