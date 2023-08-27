import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import RootLayout from "@/components/Layout/RootLayout";
import ContentCardAdmin from "@/components/UI/ContentCardAdmin";
import { useGetContentsByStatusQuery } from "@/redux/features/content/contentApi";
import React from "react";

const ArchiveContentsPage = () => {
  const { data, isLoading } = useGetContentsByStatusQuery("archive");
  if (isLoading) return <div></div>;
  if (data?.data?.length < 1)
    return (
      <div className="text-center text-gray-700 text-2xl">
        No Archive Contents
      </div>
    );
  return (
    <ProtectedLayout>
      <div>
        <div className="text-center text-xl md:text-2xl text-gray-700 mb-8 md:mb-12">
          Archive Contents
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

export default ArchiveContentsPage;

ArchiveContentsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
