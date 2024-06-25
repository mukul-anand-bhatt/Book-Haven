import React,{useEffect,useState} from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

export default function app(){

    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/getallbooks");
            setData(response.data.data);
        };
        fetch();
    }, []);


    return (
        <div className="bg-zinc-900 h-auto px-4 py-8">
            <h4 className="text-3xl text-yellow-100">ALL Books</h4>
            {!Data &&(
                <div className="flex items-center justify-center my-8"> 
                    <Loader/>(" ")
            </div>
            )}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {Data && 
                    Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />{" "}   
                    </div>
                    ))}
        </div>
        </div>
    );
};