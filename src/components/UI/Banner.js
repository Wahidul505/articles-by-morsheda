import React from "react";

const Banner = () => {
  return (
    <div className="mb-96">
      <div
        className="h-64 md:h-80 bg-cover bg-center flex items-end absolute right-0 left-0 top-16"
        style={{
          backgroundImage: `url('https://i.ibb.co/QNbvVmM/sixteen-miles-out-Q1-N5g-E8-Kxf-M-un.jpg')`,
          fontFamily: "'Handlee', 'cursive'",
        }}
      >
        <div className="h-full w-full text-red-300">
          <div className="absolute bottom-2 md:bottom-20 left-4">
            <p className="text-6xl md:text-9xl font-bold">Happy</p>
          </div>
          <div className="absolute -bottom-14 md:-bottom-12 left-4">
            <p className="text-6xl md:text-9xl font-bold">Reading</p>
          </div>
        </div>
        <div
          style={{ fontFamily: `'Ubuntu', 'sans-serif'` }}
          className=" text-2xl md:text-4xl absolute -bottom-32 md:-bottom-24 left-4 text-gray-100"
        >
          Read articles and blogs and experience the best
        </div>
      </div>
    </div>
  );
};

export default Banner;
