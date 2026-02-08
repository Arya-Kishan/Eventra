"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { EventType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import EventCard from "./component/EventCard";
import { getAllEventApi } from "@/services/EventService";
import { Search } from "lucide-react";

const Event = () => {
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getEvents = async () => {
    try {
      setLoader(true);
      const res = await getAllEventApi();
      setEvents(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("all events : ", events);

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="px-10">
      <div className="w-full flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">All Events</p>
        <div className="flex flex-row gap-2 justify-between items-center shadow-lg rounded-xl p-3 border-red-400 border-2">
          <input className="w-full" type="text" placeholder="Search Event" />
          <Search className="w-5 h-5 text-gray-400" />
        </div>
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
