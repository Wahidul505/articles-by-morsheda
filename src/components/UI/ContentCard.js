import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ContentCard = ({ content }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/content/${content?._id}`)}
      style={{ fontFamily: `'Ubuntu', 'sans-serif'` }}
      className="cursor-pointer rounded mb-10 md:mb-0"
    >
      <div className="overflow-hidden rounded">
        <Image
          alt=""
          src="https://i.ibb.co/d201SmL/aaron-burden-y02j-EX-B0-O0-unsplas.jpg"
          height={300}
          width={300}
          className="w-full h-60 hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-1">
        <div className="text-gray-100 text-sm md:text-base font-sans">
          {content?.category?.toUpperCase()}
        </div>
        <div className="text-gray-700 text-2xl md:text-3xl">
          {content?.title}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
