"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ item }: { item: any }) {
  const event = item;
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Link href={`/event/${event._id}`}>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer w-80">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.pic.url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                event.status,
              )}`}
            >
              {event.status}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-600 text-white">
              {event.category}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-900">
                {formatDate(event.date)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
            {event.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
