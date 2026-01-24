import { BannerType } from "@/types/AppTypes";
import Image from "next/image";
import { FC } from "react";

interface Props {
  item: BannerType;
}

const BannerCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-[400px] flex flex-col gap-2 relative">
      <div className="relative w-full h-[220px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div className="absolute top-2 right-2 shadow-amber-400 p-1 bg-[#ffffff64] rounded-xl flex justify-center items-center"></div>
      <div className="absolute top-2 left-2 shadow-amber-400 p-1 bg-[#00000064] rounded-2xl"></div>
    </div>
  );
};

export default BannerCard;
