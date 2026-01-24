"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import SwitchTab from "@/components/ui/SwitchTab";
import { SpotLightType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const Spotlight = () => {
  const [spotlights, setSpotlights] = useState<SpotLightType[] | null>(null);
  const [copySpotlights, setCopySpotlights] = useState<SpotLightType[] | null>(
    null,
  );
  const [loader, setLoader] = useState<boolean>(false);

  const getSpotLights = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/spotLight/all`,
      );
      const data = await res.json();
      console.log("SPLOT LIHGT DAT", data);
      setSpotlights(data.data);
      setCopySpotlights(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTab = (val: string) => {
    console.log(val);
    const filteredSpotlights = copySpotlights?.filter((item) => {
      if (val === "approved" && item.isApproved) {
        return item;
      }

      if (val === "request" && !item.isApproved) {
        return item;
      }

      if (val === "all") {
        return item;
      }
    });
    setSpotlights(filteredSpotlights!);
  };

  useEffect(() => {
    getSpotLights();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">Spotlight Page</p>
        <SwitchTab
          onChange={onChangeTab}
          tabs={[
            { label: "All", value: "all" },
            { label: "Approved", value: "approved" },
            { label: "Request", value: "request" },
          ]}
        />
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        spotlights &&
        spotlights.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
            {spotlights.map((item: SpotLightType) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Spotlight;
