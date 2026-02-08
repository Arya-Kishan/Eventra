"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, DollarSign, Clock, User, Calendar, Star } from "lucide-react";

export default function VenueCard({ item }) {
  const venue = item;
  const availableSlots = venue.slots.filter((slot) => !slot.isBooked).length;
  const totalSlots = venue.slots.length;
  const averageRating =
    venue.reviews.length > 0
      ? (
          venue.reviews.reduce((acc, review) => acc + review.rating, 0) /
          venue.reviews.length
        ).toFixed(1)
      : "New";

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Link href={`/venues/${venue._id}`}>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 cursor-pointer">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={venue.pic.url}
            alt={venue.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-bold text-lg">{venue.price}</span>
                <span className="text-xs">/hour</span>
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full shadow-lg flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-sm">{averageRating}</span>
              {venue.reviews.length > 0 && (
                <span className="text-xs text-gray-600">
                  ({venue.reviews.length})
                </span>
              )}
            </div>
          </div>

          {/* Availability Badge */}
          <div className="absolute bottom-4 right-4">
            <div
              className={`px-3 py-2 rounded-full text-xs font-semibold shadow-lg ${
                availableSlots > 0
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {availableSlots > 0
                ? `${availableSlots} slot${availableSlots > 1 ? "s" : ""} available`
                : "Fully Booked"}
            </div>
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-900">
                {venue.address.state}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
              {venue.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {venue.description}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 line-clamp-1">
                {venue.address.area}
              </p>
              <p className="text-xs text-gray-500">
                {venue.address.city}, {venue.address.postalCode}
              </p>
            </div>
          </div>

          {/* Slots Info */}
          {venue.slots.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-gray-700 font-medium">
                {formatTime(venue.slots[0].time.start)} -{" "}
                {formatTime(venue.slots[0].time.end)}
              </span>
              {venue.slots.length > 1 && (
                <span className="text-xs text-gray-500">
                  +{venue.slots.length - 1} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {/* Host */}
            <div className="flex items-center gap-2">
              <Image
                src={venue.host.profilePic.url}
                alt={venue.host.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-red-100"
              />
              <div>
                <p className="text-xs text-gray-500">Hosted by</p>
                <p className="text-sm font-semibold text-gray-900">
                  {venue.host.name}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3">
              {/* Booked Events */}
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold">
                  {venue.bookedEvents.length}
                </span>
              </div>

              {/* Availability Indicator */}
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    availableSlots > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
