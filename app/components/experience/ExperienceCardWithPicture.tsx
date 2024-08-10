import configs from "~/configs/configs";

type ExperienceCardWithPictureProps = {
  title: string;
  date?: string;
  location?: string;
  children: React.ReactNode;
  pictureFileName?: string;
  link?: string;
};

export default function ExperienceCardWithPicture(
  props: ExperienceCardWithPictureProps
) {
  return (
    <div className="w-full flex flex-col md:flex-row mb-4">
      <div
        className={`bg-[${configs.colors.primary}] w-full rounded-xl h-full lg:h-5/6 my-auto mx-auto flex justify-center align-middle`}
      >
        <div className="py-4 w-full h-full md:grid md:grid-cols-8">
          <div className="col-span-2 md:h-full md:w-full h-full flex">
            {props.link ? (
              <a href={props.link} target="_blank" rel="noreferrer">
                <img
                  src={`pictures/experience/${props.pictureFileName}`}
                  alt={props.title}
                  className="w-1/2 md:w-3/4 mt-12 mx-auto md:my-auto rounded-lg"
                />
              </a>
            ) : (
              <img
                src={`pictures/experience/${props.pictureFileName}`}
                alt={props.title}
                className="h-36 mx-auto md:my-auto rounded-lg"
              />
            )}
          </div>
          <div className="col-span-6 flex flex-col px-4 md:px-0 w-full h-full">
            <div className="w-7/8 h-7/8 my-auto flex flex-col">
              {props.link ? (
                <a href={props.link} target="_blank" rel="noreferrer">
                  <h1 className="text-3xl underline underline-offset-4 font-blackOpsOne my-6 md:my-1 lg:mb-2">
                    {props.title}
                  </h1>
                </a>
              ) : (
                <h1 className="text-3xl font-blackOpsOne my-6 md:my-1 lg:mb-2">
                  {props.title}
                </h1>
              )}
              <p className="font-courierPrime text-lg">{props.date}</p>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
