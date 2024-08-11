import configs from "~/configs/configs";

type ProjectCardProps = {
  title: string;
  pictureFileName?: string;
  skills?: string;
  children?: React.ReactNode;
};

export function ProjectCard(props: ProjectCardProps) {
  return (
    <div
      className="mb-8 py-4 w-full flex flex-col items-center rounded-lg"
      style={{ backgroundColor: configs.colors.primary }}
    >
      <h1 className="text-2xl my-2 md:text-5xl font-blackOpsOne font-bold text-center w-full">
        {props.title}
      </h1>
      <img
        src={`pictures/projects/${props.pictureFileName}`}
        alt={props.title}
        className="w-11/12 md:w-3/4 mt-2 md:mt-6 mx-auto md:my-auto rounded-lg"
      />
      <div className="mt-4 mx-8">{props.children}</div>
    </div>
  );
}
