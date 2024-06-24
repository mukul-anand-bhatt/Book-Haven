import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/getrecentbooks");
            setData(response.data.data);
        };
        fetch();
    }, []);

    return (
        <div className="mt-8 px-4">
            <h4 className="text-3xl text-yellow-100">Recently Added</h4>
            <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Data && Data.map((item, i) => (
                    <div key={i}>
                        <BookCard data={item} />{" "}
                    </div>
                ))}
            </div>
        </div>
    );
};
