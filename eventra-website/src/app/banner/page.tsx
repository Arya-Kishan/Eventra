"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { BannerType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import BannerCard from "./component/BannerCard";
import { getAllBannerApi } from "@/services/BannerService";

const Banner = () => {
  const [Banners, setBanners] = useState<BannerType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getBanners = async () => {
    try {
      setLoader(true);
      const res = await getAllBannerApi();
      setBanners(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">Banner Page</p>
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        Banners &&
        Banners.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Banners.map((item: BannerType) => (
              <BannerCard key={item._id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Banner;
