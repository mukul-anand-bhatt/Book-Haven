import React from "react"
import Home from "./pages/home"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"


export default function App() {

  return (
    <div>
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}