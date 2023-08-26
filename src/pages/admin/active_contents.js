import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import RootLayout from "@/components/Layout/RootLayout";
import ContentCardAdmin from "@/components/UI/ContentCardAdmin";
import { useGetContentsByStatusQuery } from "@/redux/features/content/contentApi";
import React from "react";

const ActiveContentsPage = () => {
  const { data, isLoading } = useGetContentsByStatusQuery("active");
  if (isLoading) return <div></div>;
  return (
    <ProtectedLayout>
      <div>
        <div className="text-center text-xl md:text-2xl text-gray-700 mb-8 md:mb-12">
          Active Contents
        </div>
        <div>
          {data?.data &&
            data?.data?.map((content) => (
              <ContentCardAdmin key={content._id} content={content} />
            ))}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default ActiveContentsPage;

ActiveContentsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
