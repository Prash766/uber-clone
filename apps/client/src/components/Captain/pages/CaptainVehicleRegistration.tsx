import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, User } from "lucide-react";

import { Button } from "@repo/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui";
import { Input } from "@repo/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { Separator } from "@repo/ui";
import {
  vehicleRegistrationType,
  vehicleRegistrationSchema,
} from "@repo/zod-schema/captain";
import { useDispatch, useSelector } from "@repo/redux-store";
import { RootState } from "@repo/redux-store/store";
import { INDIAN_STATES } from "../../../utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { setCaptainRegistration, setVehicleDetails } from "@repo/redux-store/captain";
import { captainVehicleRegistration } from "../../../api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { setGlobalUserAuth } from "@repo/redux-store/auth";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) =>
  (currentYear - i).toString()
);

export default function CaptainVehicleRegistration() {
  const { vehicleType } = useSelector(
    (state: RootState) => state.captainRegistrationReducer
  );
  const dispatch = useDispatch();
  const  {globalUser} = useSelector((state :RootState)=> state.globalUserAuthSlice)
  console.log("global use " , globalUser)
  const form = useForm<vehicleRegistrationType>({
    resolver: zodResolver(vehicleRegistrationSchema),
    defaultValues: {
      firstName: globalUser.data.fullName.split(" ")[0],
      lastName: globalUser.data.fullName.split(" ")[1]!=="" ? globalUser.data.fullName.split(" ")[1]:null ,
      email: globalUser.data.email,
      phone: "",
      driverLicenseState: "",
      driverLicenseExpiry: "",
      vehicleType,
      vehicleNumber: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const { vehicleNumber, driverLicenseExpiry, driverLicenseState } =
    useSelector((state: RootState) => state.captainRegistrationReducer);

  const mutate = useMutation({
    mutationKey: ["captainVehicleRegistration"],
    mutationFn: (data: {
      captainId: any;
      vehicleType: string;
      vehicleNumber: string;
      driverLicenseState: string;
      driverLicenseExpiry: string;
    }) => {
      return captainVehicleRegistration(data);
    },
    onSuccess: (data:any) => {
      console.log(data)
      toast.success(`${data.message}`);
      dispatch(setCaptainRegistration(data.captain))
      dispatch(setVehicleDetails(data.vehicle))
      dispatch(setGlobalUserAuth(data.globalUser))
      navigate("/captain/home", { replace: true });
    },
    onError: (error: AxiosError) => {
      toast.error(`${(error.response?.data as { message: string }).message}`);
    },
  });

  function onSubmit(values: vehicleRegistrationType) {
    console.log("inside the on submit");
    console.log("Form Values:", values);
    console.log(vehicleNumber , driverLicenseExpiry, driverLicenseState)
    mutate.mutate({
      captainId: globalUser.data.id,
      vehicleNumber: values.vehicleNumber,
      driverLicenseExpiry : values.driverLicenseExpiry,
      vehicleType,
      driverLicenseState :values.driverLicenseState,
    });
  }

  return (
    <div className="font-uber container mx-auto py-10 max-w-3xl">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-black text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">
            Uber Driver Registration
          </CardTitle>
          <CardDescription className="text-gray-300">
            Complete the form below to register your vehicle
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="driver" className="w-full">
                <TabsList className="grid grid-cols-1 mb-6">
                  <TabsTrigger
                    value="driver"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Driver Info</span>
                  </TabsTrigger>
                  {/* TODO WILL IMPROVE IN THE FUTURE */}
                  {/* <TabsTrigger value="vehicle" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span>Vehicle</span>
                  </TabsTrigger> */}
                </TabsList>

                {/* Driver Information Tab */}
                <TabsContent value="driver" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={(field) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                            {...field }
                              placeholder="John"
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={(field) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                            {...field }
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="john.doe@example.com"
                              className="cursor-default"
                              readOnly
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91-" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium">
                    Driver's License Information
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="vehicleNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="DL12345678"
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(
                                  setVehicleDetails({
                                    vehicleNumber: e.target.value,
                                  })
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="driverLicenseState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              dispatch(
                                setVehicleDetails({
                                  driverLicenseState: value,
                                })
                              );
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-uber">
                              {INDIAN_STATES.map((state, index) => (
                                <SelectItem key={index} value={state.name}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverLicenseExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(
                                  setVehicleDetails({
                                    driverLicenseExpiry: e.target.value,
                                  })
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Vehicle Information Tab will continue later --- TODO FUTURE <IMPROVEMENTS></IMPROVEMENTS> */}
                {/* <TabsContent value="vehicle" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="vehicleMake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Make</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select make" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-uber">
                              {
                                VEHICLE_BRANDS.map((brand , index)=>{
                                  return <SelectItem key={index} value={brand.value}>{brand.label}</SelectItem>
                                })
                              }

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input placeholder="Camry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />
                  <h3 className="text-lg font-medium">Registration Information</h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-uber">
                            {
                              INDIAN_STATES.map((state , index)=>{
                               return  <SelectItem key={index} value={state.name}>{state.name}</SelectItem>
                              }
                            )
                             }
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormLabel>Vehicle Photos</FormLabel>
                    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 hover:border-black transition-colors cursor-pointer">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                        <p className="text-sm font-medium">Upload Front View</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or HEIC up to 10MB</p>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 hover:border-black transition-colors cursor-pointer">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                        <p className="text-sm font-medium">Upload Side View</p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or HEIC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </TabsContent> */}
              </Tabs>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                {mutate.isPending ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Submit Registration"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
