import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer'
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
