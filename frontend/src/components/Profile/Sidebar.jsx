import React from "react";

const Sidebar = ({ data }) => {
  console.log(data);

  return (
    <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center justify-center w-full h-auto">
      <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          class="absolute w-12 h-12 text-gray-400 -left-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>

      <p className="mt-3 text-xl text-zinc-100 font-semibold">
        {data.username}
      </p>
      <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
      <p className="mt-1 text-zinc-300">{data.address}</p>
      <p className="mt-1 text-zinc-300">{data.role}</p>
      <div className="w-full mt-4 h-[1px] bg-zinc-50 hidden lg:block"></div>
    </div>
  );
};

export default Sidebar;
