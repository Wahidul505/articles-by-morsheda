import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import RootLayout from "@/components/Layout/RootLayout";
import Loading from "@/components/UI/Loading";
import { useCreateContentMutation } from "@/redux/features/content/contentApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const WriteContentPage = () => {
  const [contentInputs, setContentInputs] = useState([0]);
  const router = useRouter();
  const session = useSession();
  const { register, handleSubmit } = useForm();
  const [createContent, { isError, isSuccess, isLoading }] =
    useCreateContentMutation();

  const onSubmit = async (data) => {
    if (session.status === "unauthenticated") return;
    data.status = "archive";
    await createContent(data);
  };

  useEffect(() => {
    isError && toast.error("Inform your Developer mate!");
    if (isSuccess) {
      router.push("/admin/archive_contents");
      toast.success("Created!");
    }
  }, [isError, isSuccess, router]);

  if (session.status === "loading") return <Loading />;

  return (
    <ProtectedLayout>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            {/* writer  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base text-gray-700">
                  Writer name
                </span>
              </label>
              <input
                type="text"
                placeholder="Required"
                className="input input-bordered bg-transparent input-sm md:input-md"
                defaultValue={"Morsheda Fariha"}
                {...register("writer", { required: true })}
              />
            </div>
            {/* category  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm md:text-base text-gray-700">
                  Category
                </span>
              </label>
              <select
                name=""
                id=""
                className="bg-transparent border border-gray-500 p-1 rounded text-sm md:text-base"
                {...register("category", { required: true })}
              >
                <option value="blog">Blog</option>
                <option value="article">Article</option>
              </select>
            </div>
          </div>

          {/* title  */}
          <div className="form-control mt-6 mb-10">
            <label className="label">
              <span className="label-text text-sm md:text-base text-gray-700">
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Required"
              className="input input-bordered bg-transparent input-sm md:input-md"
              {...register("title", { required: true })}
            />
          </div>

          {/* content fields  */}
          {contentInputs.map((order) => (
            <div key={order}>
              {/* heading  */}
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text text-sm md:text-base text-gray-700">
                    Heading
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Heading"
                  className="textarea textarea-bordered bg-transparent input-sm "
                  {...register(`contents.${order}.heading`)}
                />
              </div>
              {/* text  */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-sm md:text-base text-gray-700">
                    Text
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Text"
                  className="textarea h-56 textarea-bordered bg-transparent input-sm"
                  {...register(`contents.${order}.text`)}
                />
              </div>
            </div>
          ))}

          {/* buttons  */}

          <div className="flex justify-between items-center w-full mt-8 md:mt-4">
            <button
              onClick={() =>
                setContentInputs([
                  ...contentInputs,
                  contentInputs[contentInputs.length - 1] + 1,
                ])
              }
              className=" text-gray-700 p-2 rounded text-sm md:text-base underline"
            >
              + Add section
            </button>
            <button
              type="submit"
              className="md:px-4 md:py-2 p-2 text-xs md:text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 border-gray-700 text-gray-700 hover:text-white bg-rose-300 bg-opacity-40 w-32 md:w-40"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <span>Create as Archive</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </ProtectedLayout>
  );
};

export default WriteContentPage;

WriteContentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
