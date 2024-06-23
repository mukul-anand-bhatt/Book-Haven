import React from "react"
import Home from "./pages/home"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}