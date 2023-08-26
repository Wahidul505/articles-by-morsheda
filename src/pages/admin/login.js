import RootLayout from "@/components/Layout/RootLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
    });
    if (response.ok && response.status === 200) {
      router.push("/");
      toast.success("Logged in!");
    } else {
      toast.error("Wrong credentials");
    }
  };

  return (
    <form
      className=" md:w-2/5 w-full md:mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="email"
          className="input input-bordered"
          {...register("email", { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          {...register("password", { required: true })}
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
