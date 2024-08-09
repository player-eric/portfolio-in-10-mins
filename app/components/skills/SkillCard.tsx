import configs from "~/configs/configs";

type SkillCardProps = {
  name: string;
  iconFileName?: string;
};

export default function SkillCard(props: SkillCardProps) {
  return (
    <div className="w-full flex my-4">
      <div
        className={`w-5/6 md:w-1/2 my-auto mx-auto h-full bg-[${configs.colors.primary}] rounded shadow-lg flex flex-col items-center justify-center`}
      >
        {props.iconFileName && (
          <img
            src={`pictures/skills/${props.iconFileName}`}
            alt={props.name}
            className="w-1/2 mt-2 md:my-2"
          />
        )}
        <p className="text-lg font-courierPrime font-bold md:mt-2">
          {props.name}
        </p>
      </div>
    </div>
  );
}
