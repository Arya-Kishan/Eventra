"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { PostType } from "@/types/AppTypes";
import { useEffect, useState } from "react";
import PostCard from "./component/PostCard";
import { getAllPostApi } from "@/services/PostService";

const Post = () => {
  const [Posts, setPosts] = useState<PostType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getPosts = async () => {
    try {
      setLoader(true);
      const res = await getAllPostApi();
      setPosts(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("all posts : ", Posts);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">Post Page</p>
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        Posts &&
        Posts.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
            {Posts.map((item: PostType) => (
              <PostCard key={item._id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Post;
