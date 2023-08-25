import RootLayout from "@/components/Layout/RootLayout";
import { useCreateContentMutation } from "@/redux/features/content/contentApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const WriteContentPage = () => {
  // saving the image handling code for future work
  const [contentInputs, setContentInputs] = useState([0]);
  const [currentImage, setCurrentImage] = useState(null);
  const [imgError, setImgError] = useState(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [createContent, { isError, isSuccess, isLoading }] =
    useCreateContentMutation();

  const onSubmit = async (data) => {
    let imgUrl = "";
    if (imgError) return;
    if (currentImage) {
      const formData = new FormData();
      formData.append("image", currentImage);
      const imgResult = await fetch(
        "https://api.imgbb.com/1/upload?key=bc069d2d932f220983e28cf3794a6fcd",
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await imgResult.json();
      if (!imgData?.success) {
        toast.error("Try creating without image");
        return;
      } else {
        imgUrl = imgData?.data?.url;
        console.log(imgData);
      }
    }
    data.image = imgUrl || "";
    data.status = "archive";

    await createContent(data);
  };

  const handleUploadImage = (img) => {
    if (img) {
      if (!img?.type?.includes("image")) {
        setImgError("Upload an actual image");
      } else if (img.size > 2105352) {
        setImgError("Image should be less than 2mb");
      } else {
        setImgError(null);
        setCurrentImage(img);
      }
    }
  };

  useEffect(() => {
    isError && toast.error("Try again later");
    if (isSuccess) {
      router.push("/admin/archive_contents");
      toast.success("Created!");
    }
  }, [isError, isSuccess, router]);

  return (
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

        {/* title and image container  */}
        <div className="mt-6 mb-10">
          {/* title  */}
          <div className="form-control mb-6">
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
          {/* image  */}
          <div className="form-control relative h-12 w-full">
            <label
              htmlFor="image"
              className="absolute top-0 right-0 left-0 w-full h-full border border-gray-500 rounded flex justify-center items-center text-gray-200 bg-black bg-opacity-20 cursor-pointer"
            >
              {currentImage ? (
                <span>{currentImage?.name}</span>
              ) : (
                <>
                  {" "}
                  <span>Upload an Image</span>
                  <span className="text-sm ml-1">(Optional)</span>
                </>
              )}
            </label>

            <input
              type="file"
              placeholder="Image"
              id="image"
              className="input input-bordered bg-transparent input-sm md:input-md hidden"
              {...register("image", {
                onChange: (e) => {
                  handleUploadImage(e.target.files[0]);
                },
              })}
            />
          </div>
          {imgError && (
            <p className="text-red-500 text-base mt-2 pl-2">{imgError}</p>
          )}

          {currentImage && (
            <div className="flex justify-end w-full mt-2">
              <button
                onClick={() => setCurrentImage(null)}
                className="btn btn-xs bg-red-400 text-white  hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          )}
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
                className="textarea textarea-bordered bg-transparent input-sm md:input-md"
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
                className="textarea h-56 textarea-bordered bg-transparent input-sm md:input-md"
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
  );
};

export default WriteContentPage;

WriteContentPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
