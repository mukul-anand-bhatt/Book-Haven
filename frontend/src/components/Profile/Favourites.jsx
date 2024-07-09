import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard/BookCard";
import { ID, TOKEN_KEY } from "../../pages/constants";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem(ID),
    authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        // Fetch favorite book IDs
        const response = await axios.get(
          "http://localhost:3000/api/v1/getfavbooks",
          { headers }
        );
        const bookIds = response.data.data;

        // Fetch detailed book data for each book ID
        const bookDetailsPromises = bookIds.map(id =>
          axios.get(`http://localhost:3000/api/v1/getbookbyid/${id}`, { headers })
        );

        const bookDetailsResponses = await Promise.all(bookDetailsPromises);
        const bookDetails = bookDetailsResponses.map(res => res.data.data);

        setFavouriteBooks(bookDetails);
      } catch (error) {
        console.error("Error fetching favorite books", error);
      }
    };

    fetch();
  }, []);

  return (
    <div>
      {FavouriteBooks.length > 0 ? (
        FavouriteBooks.map((book, i) => (
          <div key={i}>
            <BookCard data={book} />
          </div>
        ))
      ) : (
        <p>No favourite books found</p>
      )}
    </div>
  );
};

export default Favourites;
