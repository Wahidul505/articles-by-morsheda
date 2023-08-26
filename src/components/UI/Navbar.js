import React from "react";
import { PiStarFourDuotone } from "react-icons/pi";
import { CgMenuRightAlt } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <div className="navbar px-6 md:px-16 py-2 fixed top-0 w-full z-10 bg-white bg-opacity-30 backdrop-blur-lg">
      <div className="navbar-start text-3xl md:text-4xl text-gray-700">
        <Link href={"/"}>
          <PiStarFourDuotone />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle text-3xl text-gray-700"
          >
            <CgMenuRightAlt />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white bg-opacity-50 backdrop-blur-lg rounded-box w-52"
          >
            <li>
              <Link href={"/blog"}>Blogs</Link>
            </li>
            <li>
              <Link href={"/article"}>Article</Link>
            </li>
            {session.status === "authenticated" && (
              <>
                <li>
                  <Link href={"/admin/write_content"}>Write new</Link>
                </li>
                <li>
                  <Link href={"/admin/active_contents"}>Active</Link>
                </li>
                <li>
                  <Link href={"/admin/archive_contents"}>Archive</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
