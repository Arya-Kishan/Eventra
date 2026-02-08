"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { useEffect, useState } from "react";
import { userType } from "@/types/AppTypes";
import UserCard from "./component/UserCard";
import { getAlluserApi } from "@/services/UserService";
import { IoSearch } from "react-icons/io5";

const User = () => {
  const [users, setusers] = useState<userType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getusers = async () => {
    try {
      setLoader(true);
      const res = await getAlluserApi();
      console.log(res);
      setusers(res.data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="px-10 bg-[#ffe8e8] flex flex-col gap-12">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">Users</p>
        <IoSearch size={25} />
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        users &&
        users.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[60px]">
            {users.map((item: userType) => (
              <UserCard item={item} key={item._id} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default User;
