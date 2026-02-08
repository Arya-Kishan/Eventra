"use client";

import Link from "next/link";
import {
  Users,
  Calendar,
  Building2,
  Image as ImageIcon,
  Sparkles,
  LayoutGrid,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";

const Home = () => {
  const lists = [
    {
      title: "Users",
      link: "/user",
      icon: Users,
      description: "Manage user accounts and profiles",
      color: "from-red-500 to-rose-600",
      stats: "2.5K+ Active",
    },
    {
      title: "Events",
      link: "/event",
      icon: Calendar,
      description: "Create and manage events",
      color: "from-orange-500 to-red-600",
      stats: "150+ Upcoming",
    },
    {
      title: "Venues",
      link: "/venue",
      icon: Building2,
      description: "Browse and book venues",
      color: "from-pink-500 to-red-600",
      stats: "80+ Locations",
    },
    {
      title: "Posts",
      link: "/post",
      icon: ImageIcon,
      description: "View community posts and media",
      color: "from-rose-500 to-pink-600",
      stats: "1.2K+ Posts",
    },
    {
      title: "Spotlight",
      link: "/spotlight",
      icon: Sparkles,
      description: "Featured content and highlights",
      color: "from-red-600 to-rose-700",
      stats: "12 Featured",
    },
    {
      title: "Banners",
      link: "/banner",
      icon: LayoutGrid,
      description: "Manage promotional banners",
      color: "from-red-500 to-orange-600",
      stats: "8 Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-rose-50/30">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Eventra
              </h1>
              <p className="text-gray-600 mt-1">Event Management Dashboard</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-full border border-red-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-xs text-gray-600">System Status</p>
                    <p className="text-sm font-bold text-gray-900">
                      All Active
                    </p>
                  </div>
                </div>
                <div className="w-px h-8 bg-red-200" />
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Growth</p>
                    <p className="text-sm font-bold text-green-600">+12.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Choose a section to manage your event platform
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.link}
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card */}
                <div className="relative h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Decorative Element */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-full blur-3xl`}
                  />

                  {/* Content */}
                  <div className="relative p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Stats & Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-gray-700">
                          {item.stats}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-red-600 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>View</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-300 rounded-2xl transition-colors duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Need Help Getting Started?
                </h3>
                <p className="text-red-100 max-w-2xl">
                  Explore our comprehensive guides and tutorials to make the
                  most of Eventra powerful features.
                </p>
              </div>
              <button className="px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Platform Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="font-bold text-gray-900">Total Users</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">2,547</p>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-semibold">+12%</span> from
              last month
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-gray-900">Active Events</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">156</p>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-semibold">+8%</span> from
              last month
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-pink-600" />
              </div>
              <h4 className="font-bold text-gray-900">Total Venues</h4>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">82</p>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-semibold">+5%</span> from
              last month
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2026 Eventra. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
