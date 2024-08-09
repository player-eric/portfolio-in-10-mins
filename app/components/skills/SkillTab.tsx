import configs from "~/configs/configs";

type SkillTabProps = {
  name: string;
};

export default function SkillTab(props: SkillTabProps) {
  return (
    <div className="w-full flex">
      <div
        className={`w-5/6 my-auto mx-auto h-full bg-[${configs.colors.primary}] rounded shadow-lg flex flex-col items-center justify-center py-2`}
      >
        <p className="text-lg font-courierPrime font-bold">{props.name}</p>
      </div>
    </div>
  );
}
