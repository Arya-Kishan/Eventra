"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  Share2,
  Heart,
  Navigation,
  Tag,
  Info,
} from "lucide-react";
import { EventType } from "@/types/AppTypes";
import { getSingleEvent } from "@/services/EventService";
import CustomLoader from "@/components/ui/CustomLoader";
import CustomEmpty from "@/components/ui/CustomEmpty";

export default function EventDetail({ eventId }: { eventId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const [event, setEvent] = useState<EventType | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getEventDetail = async () => {
    try {
      setLoader(true);
      const res = await getSingleEvent(eventId);
      console.log(res);
      setEvent(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getEventDetail();
  }, [eventId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <AlertCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const participationPercentage = 10;

  return (
    <div>
      {loader ? (
        <CustomLoader />
      ) : !event ? (
        <CustomEmpty />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <Link
                href="/events"
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Events</span>
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
              <div className="relative h-96">
                <Image
                  src={event.pic.url}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold bg-red-600">
                      {event.category}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(
                        event.status,
                      )}`}
                    >
                      {getStatusIcon(event.status)}
                      {event.status}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                  <p className="text-lg text-gray-200">{event.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Event Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Event Details
                  </h2>

                  <div className="space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="p-3 bg-red-600 rounded-lg">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          Date & Time
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatDate(event.date)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-red-600" />
                          <p className="text-sm text-gray-700">
                            {formatTime(event.time.start)} -{" "}
                            {formatTime(event.time.end)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="p-3 bg-red-600 rounded-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {event.address.area}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.address.state}, {event.address.country} -{" "}
                          {event.address.postalCode}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${event.location.coordinates[1]},${event.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          <Navigation className="w-4 h-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="p-3 bg-red-600 rounded-lg">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Capacity</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {event.participants.length} / {event.headcount}{" "}
                          Attendees
                        </p>
                        <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-rose-500 h-full transition-all duration-500"
                            style={{ width: `${participationPercentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          {participationPercentage}% filled
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="p-3 bg-green-600 rounded-lg">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Entry Fee</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${event.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Venue Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Venue Information
                  </h2>

                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={event.venue.pic.url}
                        alt={event.venue.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.venue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {event.venue.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{event.venue.address.area}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span>Venue Price: ${event.venue.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Available Slots */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Available Time Slots
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {event.venue.slots.map((slot, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            slot.isBooked
                              ? "bg-red-50 border-red-200"
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock
                                className={`w-4 h-4 ${slot.isBooked ? "text-red-600" : "text-green-600"}`}
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {formatTime(slot.time.start)} -{" "}
                                {formatTime(slot.time.end)}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-semibold ${
                                slot.isBooked
                                  ? "text-red-700"
                                  : "text-green-700"
                              }`}
                            >
                              {slot.isBooked ? "Booked" : "Available"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Participants ({event.participants.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.participants.map((participant) => (
                      <div
                        key={participant._id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-200"
                      >
                        <Image
                          src={participant.profilePic.url}
                          alt={participant.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-red-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {participant.name}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {participant.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {participant.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {event.participants.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No participants yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Host Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Hosted By
                  </h3>
                  <div className="flex flex-col items-center text-center">
                    <Image
                      src={event.host.profilePic.url}
                      alt={event.host.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-red-100 mb-3"
                    />
                    <h4 className="text-xl font-bold text-gray-900">
                      {event.host.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.host.email}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                      {event.host.bio}
                    </p>
                    <Link
                      href={`/profile/${event.host._id}`}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                {/* Action Card */}
                <div className="bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Join This Event</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span>Price:</span>
                      <span className="text-2xl font-bold">${event.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Spots Left:</span>
                      <span className="font-semibold">
                        {event.headcount - event.participants.length}
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={event.isCancelled || event.status === "cancelled"}
                    className="w-full px-4 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    {event.isCancelled || event.status === "cancelled"
                      ? "Event Cancelled"
                      : "Register Now"}
                  </button>
                </div>

                {/* Event Meta */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Event Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(event.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Event ID:</span>
                      <span className="font-mono text-xs text-gray-900">
                        {event._id.slice(-8)}
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
