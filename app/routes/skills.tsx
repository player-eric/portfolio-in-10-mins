import type { MetaFunction } from "@remix-run/node";
import SkillCard from "~/components/skills/SkillCard";
import SkillTab from "~/components/skills/SkillTab";
import configs from "~/configs/configs";

export const meta: MetaFunction = () => {
  return [
    { title: `${configs.navBar.name} | Experience` },
    {
      name: "description",
      content: `${configs.navBar.name}skills`,
    },
    {
      name: "keywords",
      content: `personal, website, about, profile, ${configs.navBar.name}, skills`,
    },
    { name: "author", content: configs.navBar.name },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export default function Skills() {
  if (!configs.skillsPage) return null;

  const skillsWithIcons = configs.skillsPage.filter(
    (skill) => skill.iconFileName
  );
  const skillsWithoutIcons = configs.skillsPage.filter(
    (skill) => !skill.iconFileName
  );

  return (
    <div className="mx-4 mt-10 md:mx-0 md:mt-12">
      <div className="grid grid-cols-3 md:grid-cols-4">
        {skillsWithIcons.map((skill) => (
          <SkillCard
            name={skill.name}
            iconFileName={skill.iconFileName}
          ></SkillCard>
        ))}
      </div>
      <div className="mt-6 md:mt-12 grid grid-cols-2">
        {skillsWithoutIcons.map((skill) => (
          <div className="w-full flex justify-center my-4">
            <SkillTab name={skill.name}></SkillTab>
          </div>
        ))}
      </div>
    </div>
  );
}
