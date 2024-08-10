import configs from "~/configs/configs";

type ExperienceCardProps = {
  title: string;
  date?: string;
  location?: string;
  children: React.ReactNode;
};

export default function ExperienceCard(props: ExperienceCardProps) {
  return (
    <div
      className={`w-full mx-auto my-2 bg-[${configs.colors.primary}] rounded-2xl`}
    >
      <div className="px-4 py-4">
        <h2 className="text-2xl font-blackOpsOne mt-2 md:mt-0 md:mb-1">
          {props.title}
        </h2>
        <p className="font-blackOpsOne text-lg italic font-normal">
          {props.date}
        </p>
        <p className="font-blackOpsOne text-lg italic font-normal">
          {props.location}
        </p>
        {props.children}
      </div>
    </div>
  );
}
