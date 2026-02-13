"use client";

import CustomEmpty from "@/components/ui/CustomEmpty";
import CustomLoader from "@/components/ui/CustomLoader";
import { AppConstants } from "@/constants";
import { getSingleVenueApi } from "@/services/venueService";
import { VenueType } from "@/types/AppTypes";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Heart,
  Info,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Share2,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VenueDetail({ venueId }: { venueId: string }) {
  const [venue, setVenue] = useState<VenueType | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getVenueDetail = async () => {
    try {
      setLoader(true);
      const res = await getSingleVenueApi(venueId);
      console.log(res);
      setVenue(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getVenueDetail();
  }, [venueId]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const availableSlots = venue
    ? venue.slots.filter((slot) => !slot.isBooked).length
    : 0;
  const bookedSlots = venue
    ? venue.slots.filter((slot) => slot.isBooked).length
    : 0;
  const totalSlots = venue ? venue.slots.length : 0;
  const occupancyRate =
    venue && totalSlots > 0
      ? ((bookedSlots / totalSlots) * 100).toFixed(0)
      : "0";

  const averageRating =
    venue && venue.reviews.length > 0
      ? (
          venue.reviews.reduce(
            (acc: any, review: any) => acc + review.rating,
            0,
          ) / venue.reviews.length
        ).toFixed(1)
      : 0;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {loader ? (
        <CustomLoader />
      ) : !venue ? (
        <CustomEmpty />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <Link
                href="/venues"
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Venues</span>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg transition-all ${
                    isFavorite
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-600"
                  } border border-gray-200`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-3 rounded-lg bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-[500px]">
                <Image
                  src={venue.pic.url}
                  alt={venue.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {/* Rating */}
                    {venue.reviews.length > 0 && (
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-lg">
                          {averageRating}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({venue.reviews.length} reviews)
                        </span>
                      </div>
                    )}

                    {/* Availability */}
                    <div
                      className={`px-4 py-2 rounded-full font-semibold ${
                        availableSlots > 0
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {availableSlots > 0
                        ? `${availableSlots} Slots Available`
                        : "Fully Booked"}
                    </div>

                    {/* Price */}
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-lg">{venue.price}</span>
                      <span className="text-sm">/hour</span>
                    </div>
                  </div>

                  <h1 className="text-5xl font-bold mb-3">{venue.title}</h1>
                  <p className="text-xl text-gray-200 mb-4">
                    {venue.description}
                  </p>

                  <div className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5" />
                    <span>
                      {venue.address!.area}, {venue.address!.state}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Calendar className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Slots</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalSlots}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Available</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {availableSlots}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Booked Events</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {venue.bookedEvents.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Location
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="p-3 bg-red-600 rounded-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          Full Address
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mb-1">
                          {venue.address!.area}
                        </p>
                        <p className="text-sm text-gray-600">
                          {venue.address!.state}, {venue.address!.country} -{" "}
                          {venue.address!.postalCode}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${venue.location!.coordinates[1]},${venue.location!.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          <Navigation className="w-4 h-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Time Slots
                    </h2>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">{occupancyRate}%</span>{" "}
                      occupancy
                    </div>
                  </div>

                  {totalSlots === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        No time slots available
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {venue.slots.map((slot: any) => (
                        <div
                          key={slot._id}
                          onClick={() => {
                            if (!slot.isBooked) {
                              setSelectedSlot(slot ? slot._id : "");
                            }
                          }}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            slot.isBooked
                              ? "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                              : selectedSlot === slot._id
                                ? "bg-red-50 border-red-600 shadow-md"
                                : "bg-white border-gray-200 hover:border-red-300 hover:bg-red-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-3 rounded-lg ${
                                  slot.isBooked ? "bg-gray-200" : "bg-red-100"
                                }`}
                              >
                                <Clock
                                  className={`w-6 h-6 ${
                                    slot.isBooked
                                      ? "text-gray-500"
                                      : "text-red-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  {formatDateTime(slot.time.start)}
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {formatTime(slot.time.start)} -{" "}
                                  {formatTime(slot.time.end)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {slot.isBooked ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                                  <XCircle className="w-4 h-4" />
                                  <span className="font-semibold text-sm">
                                    Booked
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="font-semibold text-sm">
                                    Available
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Reviews ({venue.reviews.length})
                    </h2>
                    {venue.reviews.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <span className="text-2xl font-bold text-gray-900">
                          {averageRating}
                        </span>
                      </div>
                    )}
                  </div>

                  {venue.reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No reviews yet</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Be the first to review this venue
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {venue.reviews.map((review: any) => (
                        <div
                          key={review._id}
                          className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-start gap-4">
                            <Image
                              src={review.user.profilePic.url}
                              alt={review.user.name}
                              width={48}
                              height={48}
                              className="rounded-full border-2 border-red-100"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {review.user.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatDate(review.createdAt)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Card */}
                <div className="bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">Book This Venue</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Price per hour:</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-3xl font-bold">
                          {venue.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Available Slots:</span>
                      <span className="font-bold text-lg">
                        {availableSlots}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Total Capacity:</span>
                      <span className="font-semibold">{totalSlots} slots</span>
                    </div>
                  </div>
                  <button
                    disabled={availableSlots === 0}
                    className="w-full px-4 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {availableSlots === 0 ? "No Slots Available" : "Book Now"}
                  </button>
                </div>

                {/* Host Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Venue Host
                  </h3>
                  {typeof venue.host !== "string" && venue.host && (
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src={
                          venue.host.profilePic!.url ??
                          AppConstants.fallbackProfilePic
                        }
                        alt={venue.host.fullName}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-red-100 mb-3"
                      />
                      <h4 className="text-xl font-bold text-gray-900">
                        {venue.host.fullName}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {venue.host.bio}
                      </p>

                      <div className="w-full space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-red-600" />
                          <span className="truncate">{venue.host.email}</span>
                        </div>
                        {venue.host.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-red-600" />
                            <span>{venue.host.phone}</span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/profile/${venue.host._id}`}
                        className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        View Host Profile
                      </Link>
                    </div>
                  )}
                </div>

                {/* Venue Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-red-600" />
                    Venue Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed on:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(venue.createdAt as string)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(venue.updatedAt as string)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue ID:</span>
                      <span className="font-mono text-xs text-gray-900">
                        {venue._id.slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-semibold text-gray-900">
                        {venue.bookedEvents.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
