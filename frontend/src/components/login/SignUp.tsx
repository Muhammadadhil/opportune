import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/slices/userSlice";
import { signUp } from "@/api/auth";
import { getCountries } from "@/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginGoogleUser } from "@/api/auth";
import LoadingSpinner from "../loading/Loading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { setAccessToken } from "@/services/authService";
import { signUpvalidationSchema } from '@/schemas/SignUpSchema'
import { useQuery } from "@tanstack/react-query";

type ValidationSchema = z.infer<typeof signUpvalidationSchema>;

interface SignUpProps {
    role: string;
}
const SignUp: React.FC<SignUpProps> = ({ role }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(signUpvalidationSchema),
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role == "client") {
                navigate("/cl/dashboard");
            } else {
                navigate("/fr/dashboard");
            }
        }
    }, []);

    useEffect(() => {
        if (!role) {
            navigate("/type");
        }
    }, [role, navigate]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
        try {
            setIsLoading(true);
            const response = await signUp({ ...data, role: role ?? "" });
            // dispatch(setCredentials(response.data.data));
            navigate("/verify-email", { state: { newUserInfo: response.data } });
        } catch (error) {
            console.log("error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const { data: countries } = useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
    });

    console.log('countries:',countries)

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            try {
                const response = await loginGoogleUser(codeResponse.access_token, role ?? "");
                console.log("response:", response);
                dispatch(setCredentials(response.data.data));
                setAccessToken(response.data.accessToken);
                navigate("/");
            } catch (error) {
                console.log("error in creating new user:", error);
                toast.error(error?.response?.data?.message);
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="w-[32rem] h-[46rem] lg:w-12/12 flex items-center justify-center bg-white rounded-2xl shadow-md">
                    <div className="max-w-md w-full space-y-8">
                        <h2 className="mt-6 text-center text-2xl font-semibold text-gray-700">Sign up to unlock new opportunities</h2>

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm space-y-2">
                                <Label htmlFor="firstname" className="text-gray-700">
                                    First Name
                                </Label>
                                <Input id="firstname" type="text" {...register("firstname")} placeholder="Enter your first name" className="w-full placeholder:text-xs" />
                                {errors.firstname && <p className="text-xs text-red-500">{errors.firstname.message}</p>}

                                <Label htmlFor="lastname" className="text-gray-700 ">
                                    Last Name
                                </Label>
                                <Input id="lastname" type="text" {...register("lastname")} placeholder="Enter your last name" className=" w-full placeholder:text-xs" />
                                {errors.lastname && <p className="text-xs text-red-500">{errors.lastname.message}</p>}

                                <Label htmlFor="email" className="text-gray-700">
                                    Email
                                </Label>
                                <Input id="email" type="email" {...register("email")} placeholder="Enter your email" className="w-full placeholder:text-xs" />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className={`rounded-md border border-zinc-200 bg-transparent placeholder:text-xs appearance-none  relative block w-full px-3 py-2   placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200  sm:text-sm ${
                                                errors.password && `border-red-500`
                                            }`}
                                            placeholder="Password"
                                            {...register("password")}
                                        />
                                        <button type="button" onClick={toggleVisibility} className="mr-2 absolute right-2 top-1/2 transform -translate-y-1/2">
                                            {showPassword ? <Eye className="h-5 w-5 text-gray-500" /> : <EyeOff className="h-5 w-5 text-gray-500" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs  text-red-500 mt-2">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        className={`rounded-md border border-zinc-200 bg-transparent placeholder:text-xs appearance-none  relative block w-full px-3 py-2   placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-200 focus:border-gray-200  sm:text-sm ${
                                            errors.password && `border-red-500`
                                        }`}
                                        placeholder="Confirm Password"
                                        {...register("confirmPassword")}
                                    />
                                    {errors.confirmPassword && <p className="text-xs  text-red-500 mt-2">{errors.confirmPassword.message}</p>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="Country">
                                        Country
                                    </label>
                                    <Select onValueChange={(value) => setValue("country", value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Countries</SelectLabel>
                                                {countries?.map((country:string) => (
                                                    <SelectItem key={country} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.country && <p className="text-xs  text-red-500 mt-2">{errors.country.message}</p>}
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-green-800 hover:bg-green-900">
                                Sign up
                            </Button>

                            <Button type="button" className="w-full bg-gray-300 hover:bg-slate-300 flex items-center justify-center" onClick={() => handleGoogleSignup()}>
                                <FcGoogle className="text-xl mr-3" />
                                Sign up with Google
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link to="/login" className="text-gray-800">
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
