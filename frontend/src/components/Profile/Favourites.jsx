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
  }, [FavouriteBooks]);

  return (
    <>
    {FavouriteBooks.length === 0 && (
      <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full"> 
      No Favouite Books 
      <img src="./favourite.png" alt="" className="h-[20vh] my-8"/>
      </div>
    )}
    <div className="grid grid-cols-3 gap-4">
      {FavouriteBooks && 
        FavouriteBooks.map((items,i)=>(
          <div key={i}>
              <BookCard data={items} Favourites={true}/>
          </div>
        ))}
    </div>
    </>
    // <div className="grid grid-cols-4 gap-4">
    //   {FavouriteBooks.length > 0 ? (
    //     FavouriteBooks.map((book, i) => (
    //       <div key={i}>
    //         <BookCard data={book} Favourites={true} />
    //       </div>
    //     ))
    //   ) : (
    //     <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full">
    //       No favourite books found</div>
    //   )}
    // </div>
  );
};

export default Favourites;
