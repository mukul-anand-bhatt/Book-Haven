import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/api/v1/signin", {
                username,
                password
            });
            console.log(response);
            // Assuming your backend returns a success message or token upon successful login
            // if (response.data.success) {
            //     // Redirect to home page
            //     history.push('/');
            // } else {
            //     setErrorMessage("Login failed"); // Handle failed login scenario
            // }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error("Error during login:", error);
                setErrorMessage("Internal server error");
            }
        }
    };

    return (
        <div className="bg-zinc-900 text-zinc-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-zinc-800 rounded-md shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
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
                    <button type="submit" className="w-full bg-zinc-500 text-zinc-100 py-3 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring focus:ring-zinc-400">Login</button>
                </form>
                <p className="mt-4 text-center text-sm">
                    New user? <a href="/signup" className="text-zinc-400 hover:text-zinc-300">Sign up here</a>
                </p>
            </div>
        </div>
    );
}
