import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/getfavbooks",
        { headers }
      );
      console.log(response.data.data); // Added for debugging
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div>
      {FavouriteBooks.length > 0 ? (
        FavouriteBooks.map((item, i) => (
          <div key={i}>
            <BookCard data={item} />
          </div>
        ))
      ) : (
        <p>No favourite books found</p>
      )}
    </div>
  );
};

export default Favourites;
