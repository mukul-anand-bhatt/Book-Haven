import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <>
      <Link to={`/getbookbyid/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4">
          <div className="bg-zinc-900 rounded flex items-centr justify-center">
            <img src={data.url} alt={data.title} className="h-[25vh]"/>
          </div>
          <h2 className="mt-4 text-xl text-zinc-200 font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹{data.price}
          </p>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
