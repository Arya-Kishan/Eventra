"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { VenueType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import VenueCard from "./component/VenueCard";
import { getAllVenueApi } from "@/services/venueService";

const Venue = () => {
  const [venues, setvenues] = useState<VenueType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getvenues = async () => {
    try {
      setLoader(true);
      const res = await getAllVenueApi({ type: "all" });
      setvenues(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(venues);

  useEffect(() => {
    getvenues();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">venue Page</p>
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        venues &&
        venues.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
            {venues.map((item: VenueType) => (
              <VenueCard key={item._id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Venue;
