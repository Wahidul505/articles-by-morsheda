import React from "react";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/7C63hMF/6904435.jpg')`,
        }}
        className="min-h-screen bg-cover bg-center w-full"
      >
        <div className="pt-32 md:pt-36 px-7 md:px-16 pb-12 bg-stone-400 backdrop-blur-lg bg-opacity-40 min-h-screen w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
