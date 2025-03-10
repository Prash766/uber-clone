import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Button,
} from "@repo/ui";
import { Link, replace, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api-client";
import { Loader } from "lucide-react";

type UserLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: (data: UserLogin) => loginUser(data),
    onSuccess: (response) => {
      console.log("Login Successful:", response);
      navigate('/request-ride', {replace: true})
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-uber">Login to Uber</CardTitle>
          <CardDescription className="font-uber">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500 ">*</span>
              </label>
              <Input
                className="mt-2 font-uber "
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "This is field is required",
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              {errors.email?.message && (
                <small className="text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block  text-sm font-medium text-gray-700 pt-2"
              >
                Password <span className="text-red-500 ">*</span>
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="mt-2 font-uber"
                {...register("password", {
                  required: "This is field is required",
                  validate: {
                    minLength: (v) =>
                      v.length >= 6 || "Min Length of Password should be 6",
                  },
                })}
              />
              {errors.password?.message && (
                <small className="text-red-500 font-uber">
                  {errors.password.message}
                </small>
              )}
            </div>
            <Button disabled={mutation.isPending} type="submit" className=" font-uber w-full mt-6">
              {mutation.isPending ? (
                <Loader className="animate-spin"/>
              ) : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="font-uber flex justify-center">
          <p>
            <span>Don't have an account?</span>{" "}
            <Link to="/signup" className="font-uber text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
