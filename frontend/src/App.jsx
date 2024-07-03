import React from "react";
import Home from "./pages/home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/getbookbyid/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
