import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

export default function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/userinfo", { headers }
                );
                setProfile(response.data); // Store the fetched data in state
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false); // Update loading state
            }
        };
        fetchProfile();
    }, []);

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
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white">
            <div className="w-1/6">
                <Sidebar />
            </div>
            <div className="w-5/6">
                {profile ? (
                    <Outlet context={{ profile }} />
                ) : (
                    <p>No profile data available.</p>
                )}
            </div>
        </div>
    );
}
