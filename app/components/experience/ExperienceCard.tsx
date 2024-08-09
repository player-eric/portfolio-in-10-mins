import configs from "~/configs/configs";

type ExperienceCardProps = {
  title: string;
  date?: string;
  location?: string;
  content: string;
};

export default function ExperienceCard(props: ExperienceCardProps) {
  return (
    <div
      className={`w-full md:w-11/12 mx-auto my-4 bg-[${configs.colors.primary}] rounded-2xl`}
    >
      <div className="px-10 py-4">
        <h2 className="text-2xl font-blackOpsOne mt-2 md:mt-0 md:mb-1">
          {props.title}
        </h2>
        <p className="font-blackOpsOne text-lg italic font-normal">
          {props.location} {props.date}
        </p>
        <p className="font-courierPrime text-lg mx-3 md:my-2">
          {props.content}
        </p>
      </div>
    </div>
  );
}
