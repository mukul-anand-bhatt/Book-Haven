import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ID, TOKEN_KEY } from "../../pages/constants";

const BookCard = ({ data, Favourites }) => {
  const headers = {
    id: localStorage.getItem(ID),
    authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    bookid:data._id,
  };
  const handleRemoveFavourites = async () => {
    
      const response = await axios.put(
        "http://localhost:3000/api/v1/removefromfav",
        {},
        { headers }
      );
    alert(response.data.message)
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/getbookbyid/${data._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={data.url} alt={data.title} className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl text-zinc-200 font-semibold">
          {data.title}
        </h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">
          ₹{data.price}
        </p>
      </Link>
      {Favourites && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveFavourites}
        >
          Remove from favorites
        </button>
      )}
    </div>
  );
};

export default BookCard;
