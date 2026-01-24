import { VenueType } from "@/types/AppTypes";
import Image from "next/image";
import { FC } from "react";

interface Props {
  item: VenueType;
}

const VenueCard: FC<Props> = ({ item }) => {
  return (
    <div key={item._id} className="w-[300px] flex flex-col gap-2 relative">
      <div className="relative w-full h-[200px] md:h-[200px]">
        <Image
          src={item.pic.url}
          alt={item.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <div className="absolute top-2 right-2 shadow-amber-400 p-1 bg-[#00000064] rounded-2xl"></div>
    </div>
  );
};

export default VenueCard;
