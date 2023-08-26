import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import RootLayout from "@/components/Layout/RootLayout";
import Loading from "@/components/UI/Loading";

const AdminPage = () => {
  const session = useSession();

  if (session.status === "loading") return <Loading />;
  return (
    <div className=" w-full flex flex-col justify-center items-center space-y-5">
      {session.status === "unauthenticated" && (
        <button
          className="bg-black bg-opacity-30 backdrop-blur text-white p-2 rounded w-32"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
      {session.status === "authenticated" && (
        <>
          <div className="text-lg text-gray-700">
            Hi, {session?.data?.user?.name}
          </div>
          <button
            className="bg-red-400 text-white p-2 rounded w-32"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default AdminPage;

AdminPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
