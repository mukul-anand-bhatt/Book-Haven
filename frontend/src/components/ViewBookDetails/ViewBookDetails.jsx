import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { TOKEN_KEY,ROLE } from "../../pages/constants"; // Adjust the path as needed

export default function App() {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem(TOKEN_KEY);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/getbookbyid/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);



  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/addToCart",
        { bookId: id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to cart");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Failed to add to cart");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/addToFavorites",
        { bookId: id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to favorites");
    } catch (error) {
      console.error("Error adding to favorites", error);
      alert("Failed to add to favorites");
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        Data && (
          <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-3/6">
              <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-4 md:p-12 rounded">
                <img src={Data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] mb-4 lg:mb-0" />
                {token && (
                  <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start gap-4">
                    <button
                      className="bg-white rounded-full text-red-500 text-2xl md:text-3xl p-3 flex items-center justify-center"
                      onClick={handleAddToFavorites}
                    >
                      <FaHeart className="mr-2" />
                      <span className="ms-4 block lg:hidden">Favorites</span>
                    </button>
                    <button
                      className="bg-blue-500 text-white rounded-full text-2xl md:text-3xl p-3 flex items-center justify-center  "
                      onClick={handleAddToCart}
                    >
                      <FaShoppingCart className="mr-2" />
                      <span className="ms-4 block lg:hidden">Add to Cart</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 w-full lg:w-3/6">
              <h1 className="text-3xl md:text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
              <p className="text-zinc-400 mt-1">by {Data.author}</p>
              <p className="text-zinc-500 mt-4 text-lg md:text-xl">{Data.desc}</p>
              <p className="flex mt-4 items-center justify-start text-zinc-400">
                <GrLanguage className="mr-2" />
                {Data.language}
              </p>
              <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
                Price: ₹{Data.price}
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}
