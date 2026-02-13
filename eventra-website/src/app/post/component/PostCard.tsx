"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ item }: { item: any }) {
  const post = item;

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link
          href={`/profile/${post.user._id}`}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <Image
              src={post.user.profilePic.url}
              alt={post.user.fullName}
              width={44}
              height={44}
              className="rounded-full border-2 border-red-100 group-hover:border-red-300 transition-colors"
            />
            {post.user.isEmailVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors truncate">
              {post.user.fullName}
            </p>
            <p className="text-sm text-gray-500">
              {getTimeAgo(post.createdAt)}
            </p>
          </div>
        </Link>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Image */}
      <Link href={`/post/${post._id}`}>
        <div className="relative w-[300px] aspect-square bg-gray-50 cursor-pointer group">
          <Image
            src={post.file.url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Actions */}
      <div className="p-4 space-y-3">
        {/* Caption */}
        <div className="space-y-1">
          <Link href={`/posts/${post._id}`}>
            <p className="text-gray-900">
              <span className="text-gray-700 line-clamp-2">
                {post.description}
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
