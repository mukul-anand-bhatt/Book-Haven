import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

function App() {
    const links = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "All Books",
            link: "/allbooks"
        },
        {
            title: "Cart",
            link: "/cart"
        },
        {
            title: "Profile",
            link: "/profile"
        },
    ];

    const [mobileNav, setMobileNav] = useState("hidden");

    const toggleMobileNav = () => {
        setMobileNav(mobileNav === "hidden" ? "block" : "hidden");
    };

    const hideMobileNav = () => {
        setMobileNav("hidden");
    };

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">BookHaven</h1>
                </Link>
                <div className="navlinksbookheaven md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <Link to={items.link}
                                className="hover:text-blue-500 transition-all duration-300"
                                key={i}
                            >
                                {items.title}{" "}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Link to="/LogIn" className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            Login
                        </Link>
                        <Link to="/Signup" className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            Sign Up
                        </Link>
                    </div>
                    <button className="text-white text-2xl hover:text-zinc-400 md:hidden" onClick={toggleMobileNav}>
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
                {links.map((items, i) => (
                    <Link to={items.link}
                        className="text-white text-4xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300"
                        key={i}
                        onClick={hideMobileNav}
                    >
                        {items.title}{" "}
                    </Link>
                ))}
                <Link to="/LogIn" className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300" onClick={hideMobileNav}>
                    Login
                </Link>
                <Link to="/Signup" className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" onClick={hideMobileNav}>
                    Sign Up
                </Link>
            </div>
        </>
    );
}

export default App;
