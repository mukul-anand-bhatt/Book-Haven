import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { TOKEN_KEY, ID } from "./constants";

export default function App(){
    const isLoggedIn = localStorage.getItem(TOKEN_KEY);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem(ID);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    id: userId
                };
                const response = await axios.get(
                    "http://localhost:3000/api/v1/userinfo",
                    { headers }
                );
                setProfile(response.data); // Store the fetched data in state
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        if (isLoggedIn) {
            fetchProfile();
        } else {
            setLoading(false); // Update loading state if user is not logged in
        }
    }, [isLoggedIn, userId]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-4 text-white">
            <div className="w-1/6">
                <Sidebar data={profile} />
            </div>
            <div className="w-5/6">
                {profile ? (
                    <Outlet context={{ profile }} />
                ) : (
                    <p className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full">No profile data available.</p>
                )}
            </div>
        </div>
    );
}
