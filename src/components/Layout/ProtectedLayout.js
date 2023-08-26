import { useSession } from "next-auth/react";
import React from "react";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";

const ProtectedLayout = ({ children }) => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  } else if (session.status === "authenticated") {
    return children;
  }

  return <Loading />;
};

export default ProtectedLayout;
