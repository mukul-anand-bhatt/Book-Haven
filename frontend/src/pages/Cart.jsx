import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
// import { AiFileDelete } from 'react-icons/ai'; // Assuming you're using react-icons for delete icon

const Cart = () => {
    const [Cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Fetch Cart data or initialize it here if needed
        // Example fetch or initialization code
        // fetchCartData();
    }, []);

    const deleteItem = (itemId) => {
        // Implement delete item functionality
        // Example:
        // const updatedCart = Cart.filter(item => item._id !== itemId);
        // setCart(updatedCart);
    };

    const headers = {
        id: localStorage.getItem('ID'),
        authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')}`,
    };

    return (
        <>
            {!Cart && <Loader />} {/* Show loader if Cart is not yet loaded */}
            {Cart && Cart.length === 0 && (
                <div className="h-screen">
                    <div className="h-[100%] flex items-center justify-center flex-col">
                        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                            Empty Cart
                        </h1>
                        <img
                            src="/cart.png"
                            alt="empty cart"
                            className="lg:h-[50vh]"
                        />
                    </div>
                </div>
            )}
            {Cart && Cart.length > 0 && (
                <>
                    <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                        Your Cart
                    </h1>
                    {Cart.map((item, index) => (
                        <div
                            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                            key={index}
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                className="h-[20vh] md:h-[10vh] object-cover"
                            />
                            <div className="w-full md:w-auto">
                                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                                    {item.title}
                                </h1>
                                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                                    {item.desc.slice(0, 100)}...
                                </p>
                                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                                    {item.desc.slice(0, 65)}...
                                </p>
                                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                                    {item.desc.slice(0, 100)}...
                                </p>
                            </div>
                            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                                <h2>₹{item.price}</h2>
                                <button
                                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-2"
                                    onClick={() => deleteItem(item._id)}
                                >
                                    <AiFileDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default Cart;
