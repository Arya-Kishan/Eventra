"use client";

import CustomEmpty from "@/components/ui/CustomEmpty";
import CustomLoader from "@/components/ui/CustomLoader";
import { getSinglePostApi } from "@/services/PostService";
import { PostType } from "@/types/AppTypes";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Send,
  Share2,
  Smile,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<PostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post ? post.likes.length : 0);
  const [commentText, setCommentText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);

  const getPostDetail = async () => {
    try {
      setLoader(true);
      const res = await getSinglePostApi(postId);
      console.log(res);
      setPost(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [postId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      // Handle comment submission
      setCommentText("");
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
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

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return formatDate(dateString);
  };

  return (
    <div>
      {loader ? (
        <CustomLoader />
      ) : !post ? (
        <CustomEmpty />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30">
          {/* Share Modal */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Share Post
                  </h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors">
                    Copy Link
                  </button>
                  <button className="w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                    Share via Message
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Back Button */}
            <Link
              href="/post"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Feed</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Image Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                  {/* Image */}
                  <div className="relative w-full aspect-square bg-gray-900">
                    <Image
                      src={post.file.url}
                      alt={post.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Mobile Actions */}
                  <div className="lg:hidden p-4 space-y-4">
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={handleLike}
                          className="flex items-center gap-2 transition-transform active:scale-90"
                        >
                          <Heart
                            className={`w-7 h-7 transition-all ${
                              isLiked
                                ? "fill-red-600 text-red-600"
                                : "text-gray-700 hover:text-red-600"
                            }`}
                          />
                          <span className="font-semibold text-gray-900">
                            {likesCount}
                          </span>
                        </button>

                        <button className="flex items-center gap-2 transition-transform active:scale-90">
                          <MessageCircle className="w-7 h-7 text-gray-700 hover:text-red-600 transition-colors" />
                          <span className="font-semibold text-gray-900">
                            {post.comments.length}
                          </span>
                        </button>

                        <button
                          onClick={() => setShowShareModal(true)}
                          className="transition-transform active:scale-90"
                        >
                          <Share2 className="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors" />
                        </button>
                      </div>

                      <button
                        onClick={() => setIsSaved(!isSaved)}
                        className="transition-transform active:scale-90"
                      >
                        <Bookmark
                          className={`w-6 h-6 transition-all ${
                            isSaved
                              ? "fill-red-600 text-red-600"
                              : "text-gray-700 hover:text-red-600"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.tags.map((tag, index) => (
                          <Link key={index} href={`/tags/${tag.toLowerCase()}`}>
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium hover:bg-red-100 transition-colors">
                              <Tag className="w-3.5 h-3.5" />
                              {tag}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Reference Card */}
                {post.event && (
                  <div className="mt-6 bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl shadow-lg p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-red-100 text-sm mb-1">
                          Related Event
                        </p>
                        <h3 className="text-2xl font-bold">
                          {post.event.title}
                        </h3>
                      </div>
                      <Link href={`/events/${post.event._id}`}>
                        <button className="px-4 py-2 bg-white text-red-600 rounded-full font-semibold hover:bg-red-50 transition-colors">
                          View Event
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Author Card */}
                <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <Link href={`/profile/${post.user._id}`}>
                      <div className="relative">
                        <Image
                          src={post.user.profilePic.url}
                          alt={post.user.fullName}
                          width={60}
                          height={60}
                          className="rounded-full border-3 border-red-100 hover:border-red-300 transition-colors cursor-pointer"
                        />
                      </div>
                    </Link>

                    <div className="flex-1">
                      <Link href={`/profile/${post.user._id}`}>
                        <h3 className="font-bold text-lg text-gray-900 hover:text-red-600 transition-colors cursor-pointer">
                          {post.user.fullName}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">@{post.user.name}</p>
                    </div>
                  </div>

                  <Link href={`/profile/${post.user._id}`}>
                    <button className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                      View Profile
                    </button>
                  </Link>
                </div>

                {/* Post Details */}
                <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Desktop Tags */}
                  {post.tags.length > 0 && (
                    <div className="hidden lg:flex items-center gap-2 flex-wrap mb-4">
                      {post.tags.map((tag, index) => (
                        <Link key={index} href={`/tags/${tag.toLowerCase()}`}>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium hover:bg-red-100 transition-colors">
                            <Tag className="w-3.5 h-3.5" />
                            {tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Desktop Actions */}
                  <div className="hidden lg:block space-y-4">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={handleLike}
                          className="flex items-center gap-2 transition-transform active:scale-90"
                        >
                          <Heart
                            className={`w-6 h-6 transition-all ${
                              isLiked
                                ? "fill-red-600 text-red-600"
                                : "text-gray-700 hover:text-red-600"
                            }`}
                          />
                          <span className="font-semibold text-gray-900">
                            {likesCount}
                          </span>
                        </button>

                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-6 h-6 text-gray-700" />
                          <span className="font-semibold text-gray-900">
                            {post.comments.length}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowShareModal(true)}
                          className="transition-transform active:scale-90"
                        >
                          <Share2 className="w-6 h-6 text-gray-700 hover:text-red-600 transition-colors" />
                        </button>
                        <button
                          onClick={() => setIsSaved(!isSaved)}
                          className="transition-transform active:scale-90"
                        >
                          <Bookmark
                            className={`w-6 h-6 transition-all ${
                              isSaved
                                ? "fill-red-600 text-red-600"
                                : "text-gray-700 hover:text-red-600"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-4 space-y-2 text-xs text-gray-500">
                    <p>Posted {getTimeAgo(post.createdAt)}</p>
                    {post.updatedAt !== post.createdAt && (
                      <p>Updated {getTimeAgo(post.updatedAt)}</p>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-900">
                      Comments ({post.comments.length})
                    </h3>
                  </div>

                  {/* Comment Input */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Image
                        src={post.user.profilePic.url}
                        alt="Your profile"
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                      <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleComment()
                          }
                          className="flex-1 bg-transparent outline-none text-sm"
                        />
                        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                          <Smile className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                      <button
                        onClick={handleComment}
                        disabled={!commentText.trim()}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="max-h-[600px] overflow-y-auto">
                    {post.comments.length === 0 ? (
                      <div className="p-12 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No comments yet</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Be the first to comment!
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {post.comments.map((comment) => (
                          <div
                            key={comment._id}
                            className="p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <Link href={`/profile/${comment.user._id}`}>
                                <Image
                                  src={comment.user.profilePic.url}
                                  alt={comment.user.fullName}
                                  width={36}
                                  height={36}
                                  className="rounded-full cursor-pointer hover:ring-2 hover:ring-red-200 transition-all"
                                />
                              </Link>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-2xl px-4 py-2">
                                  <Link href={`/profile/${comment.user._id}`}>
                                    <p className="font-semibold text-sm text-gray-900 hover:text-red-600 transition-colors cursor-pointer">
                                      {comment.user.fullName}
                                    </p>
                                  </Link>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {comment.text}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4 mt-2 px-4">
                                  <button className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors">
                                    Like
                                  </button>
                                  <button className="text-xs text-gray-500 hover:text-red-600 font-medium transition-colors">
                                    Reply
                                  </button>
                                  <span className="text-xs text-gray-400">
                                    {getTimeAgo(comment.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
