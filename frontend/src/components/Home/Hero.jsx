import React from "react";
import { Link } from "react-router-dom";

export default function app(){
    return (
        <div className="h-screen h-[75vh] flex flex-col md:flex-row items-center justify-center">
            <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
            <h1 className="text-4xl lg:text-6xl  font-semibold text-yellow-100 text-center lg:text-left">
                Discover Your Next Great Read
            </h1>
            <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
                Uncover Captivation stories,enrich knowledge, and endless
                inspiration in our curated collection of books.
            </p>
                <div className="mt-8" >
                    <Link 
                    to={"/allbooks"} 
                    className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
                    Discover Books
                    </Link>
                    </div>
                </div>
                <div>
                <div className="w-full lg:w-6/6 h-auto h-full lg:h-[100%] flex items-center justify-center">
                    <img src="./hero.png" alt="hero" />
                </div>

    
            </div>
        </div>
    )
}