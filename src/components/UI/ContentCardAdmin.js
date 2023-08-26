import { useUpdateContentStatusMutation } from "@/redux/features/content/contentApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Loading from "@/components/UI/Loading";

const ContentCardAdmin = ({ content }) => {
  const [updateContentStatus, { isError }] = useUpdateContentStatusMutation();
  const session = useSession();

  useEffect(() => {
    isError && toast.error("Inform your Developer mate!");
  }, [isError]);

  if (session.status === "loading") return <Loading />;

  return (
    <div className="mb-4 bg-red-300 bg-opacity-40 p-2 md:p-4 rounded">
      <h2 className="text-gray-700 text-lg md:text-xl">{content?.title}</h2>
      <p className="text-white text-sm md:text-base">
        Writer: {content?.writer}
      </p>
      <div className="flex justify-end items-center mt-3">
        {content.status === "active" && (
          <button
            onClick={() => {
              session.status === "authenticated" &&
                updateContentStatus({ id: content?._id, status: "archive" });
            }}
            className="bg-black bg-opacity-30 backdrop-blur text-gray-300 p-2 rounded"
          >
            Archive
          </button>
        )}
        {content.status === "archive" && (
          <button
            onClick={() =>
              updateContentStatus({ id: content?._id, status: "active" })
            }
            className="bg-black bg-opacity-30 backdrop-blur text-gray-300 p-2 rounded"
          >
            Active
          </button>
        )}
        <Link
          href={`/admin/edit_content/${content._id}`}
          className="bg-black bg-opacity-30 backdrop-blur text-gray-300 p-2 rounded ml-2 md:ml-3"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ContentCardAdmin;
