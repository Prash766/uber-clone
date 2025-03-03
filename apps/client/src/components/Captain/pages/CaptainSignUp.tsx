import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@repo/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


type FormValues = {
    fullName: string
    password: string
    email: string
  }
  
  
const CaptainSignUp = () => {
  const {
    register,
    handleSubmit
  } = useForm<FormValues>();
  const navigate = useNavigate()
const onSubmit :SubmitHandler<FormValues> = (data)=>{ 
    navigate('/vehicle')
    console.log(data)
}

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="font-uber w-full max-w-md ">
        <CardHeader>
          <CardTitle>Sign Up For Captain</CardTitle>
          <CardDescription>Create Your Account to drive</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label className="mt-1" htmlFor="fullname">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter Your Full Name"
                  {...register("fullName", {
                    required: true,
                  })}
                />
                <Label className="mt-1" htmlFor="email">
                  Email
                </Label>
                <Input 
                id="email" 
                type="email" 
                placeholder="Enter Your Email"
                {...register("email", {
                    required:true,                             
                })}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required:true,                             
                })}

                />
                <Button>Sign up</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaptainSignUp;
