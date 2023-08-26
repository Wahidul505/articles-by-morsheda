import RootLayout from "@/components/Layout/RootLayout";
import ContentCard from "@/components/UI/ContentCard";
import ContentContainer from "@/components/UI/ContentContainer";
import { useRouter } from "next/router";
import React from "react";

const ContentPage = ({ contents }) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <ContentContainer>
        {contents?.data &&
          contents?.data?.map((content) => (
            <ContentCard key={content._id} content={content} />
          ))}
      </ContentContainer>
    </div>
  );
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(
    "http://https://articles-by-morsheda-server.vercel.app/api/v1/content/"
  );
  const data = await res.json();
  return {
    props: {
      contents: data,
    },
    revalidate: 30,
    // will make changes of the server updates in every 30 seconds
  };
};
