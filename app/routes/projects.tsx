import type { MetaFunction } from "@remix-run/node";
import ProjectWithoutPicture from "~/components/projects/ProjectWithoutPicture";
import ProjectWithPicture from "~/components/projects/ProjectWithPicture";
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
      {projectsWithPictures.map((project) => (
        <ProjectWithPicture
          title={project.title}
          description={project.description}
          pictureFileName={project.pictureFileName}
          link={project.link}
          skills={project.skills}
        ></ProjectWithPicture>
      ))}
      {projectsWithoutPictures.map((project) => (
        <ProjectWithoutPicture
          title={project.title}
          description={project.description}
          link={project.link}
          skills={project.skills}
        ></ProjectWithoutPicture>
      ))}
    </div>
  );
}
