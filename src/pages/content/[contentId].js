import RootLayout from "@/components/Layout/RootLayout";
import ContentCard from "@/components/UI/ContentCard";
import ContentContainer from "@/components/UI/ContentContainer";
import { useGetLatestContentsQuery } from "@/redux/features/content/contentApi";
import Image from "next/image";
import React from "react";

const ContentDetails = ({ content }) => {
  const { title, category, writer, contents } = content?.data;
  const { data, isLoading } = useGetLatestContentsQuery(undefined);
  if (isLoading) return <div></div>;
  return (
    <div style={{ fontFamily: `'Ubuntu', 'sans-serif'` }} className="-mt-8">
      <div className="text-gray-500 text-center mb-3 text-lg md:text-xl">
        {category.toUpperCase()}
      </div>
      <div className="text-gray-700 text-3xl md:text-5xl text-center mb-4">
        {title}
      </div>
      <div className="text-center">
        <span className="text-gray-500">Written by</span>{" "}
        <span className="text-gray-100 text-lg md:text-xl">{writer}</span>
      </div>
      <div className="mt-16 flex justify-center">
        <Image
          alt=""
          src="https://i.ibb.co/d201SmL/aaron-burden-y02j-EX-B0-O0-unsplas.jpg"
          height={300}
          width={300}
          className="w-full md:w-2/5 h-60 md:h-full rounded"
        />
      </div>
      <div className="mt-10 md:mt-20">
        {contents &&
          contents?.map((contentBody, index) => (
            <div key={contentBody._id || index} className="mb-10">
              {contentBody?.heading && (
                <h2 className="text-gray-700 text-2xl md:text-3xl mb-3">
                  {contentBody?.heading}
                </h2>
              )}
              {contentBody?.text && (
                <h2 className="text-gray-700 leading-7 text-lg md:text-xl">
                  {contentBody?.text}
                </h2>
              )}
            </div>
          ))}
      </div>

      {/* read more  */}
      <div className="mt-24 md:mt-32">
        <h2 className="text-gray-600 text-xl md:text-2xl mb-8 underline">
          Read more like this
        </h2>
        <ContentContainer>
          {data?.data &&
            data?.data?.map((content) => (
              <ContentCard key={content._id} content={content} />
            ))}
        </ContentContainer>
      </div>
    </div>
  );
};

export default ContentDetails;

ContentDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch(
    "http://https://articles-by-morsheda-server.vercel.app/api/v1/content"
  );
  const contents = await res.json();
  const paths = contents?.data?.map((content) => ({
    params: { contentId: content._id.toString() },
  }));
  return { paths, fallback: true };
};
export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `http://https://articles-by-morsheda-server.vercel.app/api/v1/content/${params.contentId}`
  );
  const data = await res.json();
  return {
    props: {
      content: data,
    },
  };
};
