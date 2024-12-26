import DynamicHeader from "@/components/shared/dynamicHeader";
import Image from "next/image";
import Link from "next/link";
import { COLLECTION_ID_SERVICES } from "@/lib/utils";
import CustomImage from "@/components/shared/customImage";
import { getData } from "@/lib/server/appwrite";

const Service = async ({ params }) => {
  const { id } = await params;
  const { documents: services } = await getData(COLLECTION_ID_SERVICES);
  const serviceData = services.find((service) => service.$id === id);
  return (
    <div>
      <DynamicHeader
        src={serviceData?.Image || "/images/reviewHome.webp"}
        title={serviceData?.Name}
        text={serviceData?.Description}
      />
      <div className="container flex flex-col mx-auto px-4">
        <div className="grid grid-cols-3 gap-5 py-12">
          <div className="relative w-full h-[226px] lg:h-[413px] object-cover object-center col-span-2">
            <CustomImage
              src={serviceData?.Image || "/images/reviewHome.webp"}
              alt="dafasf"
              width={500}
              height={100}
              className="object-cover object-center"
            />
          </div>
          <div className="relative w-full h-[226px] lg:h-[413px]">
            <CustomImage
              src={serviceData?.Image || "/images/reviewHome.webp"}
              alt="dsafsadf"
              width={500}
              height={100}
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-col py-12">
          <article className="flex flex-col lg:w-1/2">
            <h1 className="font-Abril font-normal text-3xl lg:text-4xl lg:leading-[56px] text-accent-foreground">
              {serviceData?.Name}
            </h1>
            <p className="font-Inter font-normal text-base leading-7">
              {serviceData?.Description}
            </p>
            <p className="font-Inter font-normal text-base leading-7 pt-14">
              {serviceData?.Details}
            </p>
          </article>
          <div className="flex justify-end pt-[200px]">
            <Link
              href="https://t.me/callcenterkeykomania"
              className="bg-secondary p-1 lg:p-3 rounded-[12px] text-background text-Abril text-xl font-normal h-16 flex items-center"
            >
              Xizmatga buyurtma bering{" "}
              <span className="hidden lg:flex font-Abril text-4xl ml-2">
                {serviceData?.Price}$
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
