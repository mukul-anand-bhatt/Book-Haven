import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signup", {
                username,
                email,
                password,
                address
            });
            

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error("Error during signup:", error);
                setErrorMessage("Internal server error");
            }
        }
    };

    return (
        <div className="bg-zinc-900 text-zinc-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-zinc-800 rounded-md shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <div>
                        <label htmlFor="username" className="block mb-1">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-zinc-400" 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-zinc-400" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-zinc-400" 
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1">Address</label>
                        <textarea 
                            id="address" 
                            name="address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="w-full px-3 py-2 bg-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-zinc-400"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-zinc-500 text-zinc-100 py-3 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring focus:ring-zinc-400">Sign Up</button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <a href="/login" className="text-zinc-400 hover:text-zinc-300">Login here</a>
                </p>
            </div>
        </div>
    );
}
