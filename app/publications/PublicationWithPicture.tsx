import { useState } from "react";
import configs from "~/configs/configs";

type PublicationWithoutPictureProps = {
  title: string;
  abstract?: string;
  pictureFileName?: string;
  webLink?: string;
  pdfLink?: string;
  skills?: string;
};

export default function PublicationWithPicture(
  props: PublicationWithoutPictureProps
) {
  const [openAbstract, setOpenAbstract] = useState(false);
  return (
    <div className="w-full flex flex-col md:flex-row mb-4">
      <div
        className={`bg-[${configs.colors.primary}] w-full rounded-xl h-full lg:h-5/6 my-auto mx-auto flex justify-center align-middle`}
      >
        <div className="py-4 w-full h-full md:grid md:grid-cols-8">
          <div className="col-span-2 md:h-full md:w-full h-full flex">
            {props.webLink ? (
              <a
                href={props.webLink}
                className="mx-auto"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`pictures/publications/${props.pictureFileName}`}
                  alt={props.title}
                  className="h-36 mt-12 mx-auto md:my-auto rounded-lg"
                />
              </a>
            ) : (
              <img
                src={`pictures/publications/${props.pictureFileName}`}
                alt={props.title}
                className="h-36 mx-auto md:my-auto rounded-lg"
              />
            )}
          </div>
          <div className="col-span-6 flex flex-col px-4 md:px-0 w-full h-full">
            <div className="w-7/8 h-7/8 my-auto flex flex-col">
              {props.webLink ? (
                <a href={props.webLink} target="_blank" rel="noreferrer">
                  <h1 className="text-3xl underline underline-offset-4 font-blackOpsOne my-6 md:my-1 lg:mb-2">
                    {props.title}
                  </h1>
                </a>
              ) : (
                <h1 className="text-3xl font-blackOpsOne my-6 md:my-1 lg:mb-2">
                  {props.title}
                </h1>
              )}
              <div className="flex flex-row">
                <span
                  onClick={() => setOpenAbstract(!openAbstract)}
                  className="text-xl underline underline-offset-4 font-courierPrime cursor-pointer"
                >
                  Abstract
                </span>
                {props.webLink && (
                  <a
                    className="ml-2 text-xl underline underline-offset-4 font-courierPrime"
                    href={props.webLink}
                    target="_blank"
                  >
                    Web
                  </a>
                )}
                {props.pdfLink && (
                  <a
                    className="ml-2 text-xl underline underline-offset-4 font-courierPrime"
                    href={props.pdfLink}
                    target="_blank"
                  >
                    PDF
                  </a>
                )}
              </div>
              {openAbstract && (
                <div className="mt-2 mr-4">{props.abstract}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
