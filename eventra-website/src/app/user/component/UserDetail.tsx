"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Shield,
  Bell,
  MessageSquare,
  Users,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
} from "lucide-react";
import { userType } from "@/types/AppTypes";
import { getSingleuserApi } from "@/services/UserService";
import CustomLoader from "@/components/ui/CustomLoader";
import CustomEmpty from "@/components/ui/CustomEmpty";
import Image from "next/image";

interface UserDetailProps {
  userId: string;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}

export default function UserDetail({ userId }: UserDetailProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showCopyNotification, setShowCopyNotification] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<userType | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getuserDetail = async () => {
    try {
      setLoader(true);
      const res = await getSingleuserApi(userId);
      console.log(res);
      setUserData(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getuserDetail();
  }, [userId]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      {loader ? (
        <CustomLoader />
      ) : !userData ? (
        <CustomEmpty />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
          {/* Copy Notification */}
          {showCopyNotification && (
            <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-[slideIn_0.3s_ease-out]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Copied to clipboard!</span>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600"></div>

              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                    <div className="relative group">
                      <Image
                        src={userData.profilePic!.url}
                        alt={userData.fullName}
                        className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                        width={128}
                        height={128}
                      />
                    </div>

                    <div className="text-center md:text-left mb-4">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <h1 className="text-3xl font-bold text-gray-900">
                          {userData.fullName}
                        </h1>
                        {userData.isEmailVerified && (
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mt-1">@{userData.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 justify-center md:justify-start">
                        <Shield className="w-4 h-4" />
                        <span className="capitalize bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                          {userData.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
                  <p className="text-gray-700">{userData.bio}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={MessageSquare}
                    label="Active Chats"
                    value={userData.chats!.length}
                    color="bg-red-500"
                  />
                  <StatCard
                    icon={Users}
                    label="Events Joined"
                    value={userData.joinedEvents!.length}
                    color="bg-rose-500"
                  />
                  <StatCard
                    icon={Clock}
                    label="Last Active"
                    value={getTimeSince(userData.active!)}
                    color="bg-pink-500"
                  />
                  <StatCard
                    icon={Calendar}
                    label="Member Since"
                    value={new Date(userData.createdAt).getFullYear()}
                    color="bg-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {["overview", "contact", "security"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Personal Information
                        </h3>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-200">
                          <Mail className="w-5 h-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-gray-900 font-medium">
                              {userData.email}
                            </p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(userData.email)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-600 hover:text-red-600" />
                          </button>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <Phone className="w-5 h-5 text-rose-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-gray-500 italic">Not provided</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-200">
                          <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="text-gray-900 font-medium">
                              {userData.address!.state},{" "}
                              {userData.address!.country}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {userData.address!.area}
                            </p>
                            <p className="text-sm text-gray-500">
                              PIN: {userData.address!.postalCode}
                            </p>
                          </div>
                          <a
                            href={`https://www.google.com/maps?q=${userData.location!.coordinates[1]},${userData.location!.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600 hover:text-red-600" />
                          </a>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Account Details
                        </h3>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-gray-600 mb-1">User ID</p>
                          <p className="text-gray-900 font-mono text-sm break-all">
                            {userData._id}
                          </p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Authentication Type
                          </p>
                          <p className="text-gray-900 capitalize">
                            {userData.authType}
                          </p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Account Created
                          </p>
                          <p className="text-gray-900">
                            {formatDate(userData.createdAt)}
                          </p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-gray-600 mb-1">
                            Last Updated
                          </p>
                          <p className="text-gray-900">
                            {formatDate(userData.updatedAt!)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>

                    <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-6 h-6 text-red-600" />
                        <h4 className="font-semibold text-gray-900">
                          Email Address
                        </h4>
                      </div>
                      <p className="text-gray-900 text-lg mb-2">
                        {userData.email}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-red-600" />
                        <h4 className="font-semibold text-gray-900">
                          Full Address
                        </h4>
                      </div>
                      <p className="text-gray-900 mb-2">
                        {userData.address!.area}
                      </p>
                      <p className="text-gray-600">
                        {userData.address!.state}, {userData.address!.country} -{" "}
                        {userData.address!.postalCode}
                      </p>
                      <div className="mt-4">
                        <a
                          href={`https://www.google.com/maps?q=${userData.location!.coordinates[1]},${userData.location!.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                          View on Map
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-6 h-6 text-rose-600" />
                        <h4 className="font-semibold text-gray-900">
                          Push Notifications
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        FCM Token configured for push notifications
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Security & Privacy
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <h4 className="font-semibold text-gray-900">
                            Email Verified
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Your email address has been verified
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="w-6 h-6 text-red-600" />
                          <h4 className="font-semibold text-gray-900">Role</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Account type:{" "}
                          <span className="font-semibold text-red-700 uppercase">
                            {userData.role}
                          </span>
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Bell className="w-6 h-6 text-rose-600" />
                          <h4 className="font-semibold text-gray-900">
                            Notifications
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Push notifications are enabled
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="w-6 h-6 text-red-600" />
                          <h4 className="font-semibold text-gray-900">
                            Authentication
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Method:{" "}
                          <span className="font-semibold capitalize">
                            {userData.authType}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Security Recommendations
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span>
                            Consider adding a phone number for account recovery
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span>
                            Enable two-factor authentication for enhanced
                            security
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span>Review your active sessions regularly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
