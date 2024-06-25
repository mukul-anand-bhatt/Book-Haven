import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

export default function App() {
    const { id } = useParams();
    const [Data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/getbookbyid/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="px-12 py-8 bg-zinc-900 flex gap-8">
            {Data && (
                <div className="bg-zinc-800 rounded p-4 h-[88vh] w-full flex items-center justify-center">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <img src={Data.url} alt="Book" className="w-60 h-auto rounded"/>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">{Data.title}</h2>
                                <p className="text-xl text-gray-400 mb-2"><strong>Author:</strong> {Data.author}</p>
                                <p className="text-xl text-gray-400 mb-2"><strong>Price:</strong> ₹{Data.price}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Description:</strong> {Data.desc}</p>
                                <p className="text-lg text-gray-400"><strong>Language:</strong> {Data.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
