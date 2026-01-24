import CustomLoader from "@/components/ui/CustomLoader";
import { Switch } from "@/components/ui/switch";
import { SpotLightType } from "@/types/AppTypes";
import Image from "next/image";
import React, { FC, useState } from "react";

interface Props {
  item: SpotLightType;
}

const Card: FC<Props> = ({ item }) => {
  const [isApproved, setisApproved] = useState(item.isApproved);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSwitch = async (val: SpotLightType) => {
    console.log(val);
    setisApproved(!isApproved);

    try {
      setLoader(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/spotLight/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //  Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isApproved: !val.isApproved,
          }),
        },
      );
      const data = await response.json();
      console.log("SPLOT LIHGT DAT", data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div key={item._id} className="w-[200px] flex flex-col gap-2 relative">
      <div className="relative w-full h-[300px] md:h-[300px]">
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
      <div className="absolute top-2 right-2 shadow-amber-400 p-1 bg-[#ffffff64] rounded-xl flex justify-center items-center">
        <Switch
          id="airplane-mode"
          checked={isApproved}
          onClick={() => handleSwitch(item)}
        />
      </div>
      <div className="absolute top-2 left-2 shadow-amber-400 p-1 bg-[#00000064] rounded-2xl">
        {loader && <CustomLoader size={10} />}
      </div>
    </div>
  );
};

export default Card;
