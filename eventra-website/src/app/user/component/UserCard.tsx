import { userType } from "@/types/AppTypes";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  item: userType;
}

const UserCard: FC<Props> = ({ item }) => {
  return (
    <Link
      href={"user/" + item._id}
      key={item._id}
      className="w-full min-h-[200px] flex flex-col gap-2 relative bg-[#FFFFFF] rounded-2xl p-5 cursor-pointer hover:bg-red-600"
    >
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[100px] h-[100px] md:h-[100px] rounded-[100px] overflow-hidden">
        <Image
          src={item.profilePic!.url}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="pt-[40px] h-full px-2 flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col gap-0">
          <p className="font-bold text- w-full text-center">{item.name}</p>
          <p>{item.email}</p>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <button className="w-full h-[40px] rounded-2xl bg-red-500 text-white">
            Send Notification
          </button>
          <button className="w-full h-[40px] rounded-2xl bg-red-500 text-white">
            Send Email
          </button>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
