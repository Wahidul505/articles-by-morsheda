import RootLayout from "@/components/Layout/RootLayout";
import Banner from "@/components/UI/Banner";
import ContentCard from "@/components/UI/ContentCard";
import ContentContainer from "@/components/UI/ContentContainer";
import Loading from "@/components/UI/Loading";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const HomePage = ({ contents }) => {
  const router = useRouter();
  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <Loading />,
    ssr: false,
  });
  return (
    <div className="w-full">
      {/* banner section  */}
      <DynamicBanner />
      {/* contents section  */}

      {contents?.data?.length < 1 ? (
        <div className="text-2xl text-gray-700 text-center">Stay tuned</div>
      ) : (
        <>
          {" "}
          <ContentContainer>
            {contents?.data &&
              contents?.data?.map((content) => (
                <ContentCard key={content._id} content={content} />
              ))}
          </ContentContainer>
          <div className="text-center md:mt-12">
            <button
              onClick={() => router.push("/content")}
              className="bg-black bg-opacity-30 backdrop-blur text-gray-300 p-2 rounded"
            >
              Load more
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://articles-by-morsheda-server.vercel.app/api/v1/content/latest"
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
