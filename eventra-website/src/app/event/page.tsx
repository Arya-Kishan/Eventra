"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { EventType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import EventCard from "./component/EventCard";

const Event = () => {
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getEvents = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/all`,
      );
      const data = await res.json();
      console.log("SPLOT LIHGT DAT", data);
      setEvents(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">event Page</p>
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        events &&
        events.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
            {events.map((item: EventType) => (
              <EventCard item={item} key={item._id} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Event;
