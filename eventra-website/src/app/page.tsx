import Link from "next/link";

const page = () => {
  const lists = [
    { title: "spotlight", link: "/spotlight" },
    { title: "events", link: "/event" },
    { title: "venues", link: "/venue" },
    { title: "users", link: "/user" },
    { title: "posts", link: "/post" },
    { title: "banners", link: "/banner" },
  ];

  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 p-10">
      {lists.map((list) => (
        <Link
          key={list.title}
          href={list.link}
          className="flex items-center justify-center bg-red-500 rounded-lg min-h-[200px] capitalize font-bold text-4xl"
        >
          {list.title}
        </Link>
      ))}
    </div>
  );
};

export default page;
