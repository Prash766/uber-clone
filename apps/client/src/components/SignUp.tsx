import { Label, Input, Button } from "@repo/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../api-client";
import { toast } from "sonner";
import { Loader } from "lucide-react";

type SignUpUser = {
  firstName: string;
  lastName : string
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUser>();
  const navigate= useNavigate()

  const {
    mutate,
    isPending,

  } = useMutation({
    mutationFn: (data: SignUpUser) => signUpUser(data),
    onSuccess: () => {
      toast.success("Signed Up Successffully");
      navigate('/ride-booking')
      
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<SignUpUser> = (data) => {
    console.log("Submitting data:", data); 

    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up for UberClone</CardTitle>
          <CardDescription>
            Create your account to start riding or driving
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  className="mt-2"
                  placeholder="Enter your full name"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  className="mt-2"
                  placeholder="Enter your full name"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-2"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="mt-2"
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button disabled={isPending} type="submit" className="w-full mt-6">
              {isPending ? <span><Loader className="animate-spin" /></span> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
