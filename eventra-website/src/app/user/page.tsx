"use client";

import CustomLoader from "@/components/ui/CustomLoader";
import { useEffect, useState } from "react";
import { userType } from "@/types/AppTypes";
import UserCard from "./component/UserCard";

const User = () => {
  const [users, setusers] = useState<userType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getusers = async () => {
    try {
      setLoader(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`);
      const data = await res.json();
      console.log("SPLOT LIHGT DAT", data);
      setusers(data.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);

  return (
    <div className="px-10">
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-4xl font-bold">user Page</p>
      </div>

      {loader ? (
        <CustomLoader fullScreen />
      ) : (
        users &&
        users.length > 0 && (
          <div className="w-full flex flex-row flex-wrap gap-2">
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
