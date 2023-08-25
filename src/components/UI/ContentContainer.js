import React from "react";

const ContentContainer = ({ children }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center md:items-start md:gap-7 justify-center w-full">
      {children}
    </div>
  );
};

export default ContentContainer;
