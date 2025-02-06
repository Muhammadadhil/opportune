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
import  {Button}  from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginGoogleUser } from "@/api/auth";
import LoadingSpinner from "../loading/Loading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { setAccessToken } from "@/utils/auth";
import { signUpvalidationSchema } from '@/schemas/SignUpSchema'
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store/store";

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
    const { userInfo } = useSelector((state:RootState) => state.user);

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
            const response = await signUp({ 
                firstname: data.firstname, 
                lastname: data.lastname, 
                email: data.email, 
                password: data.password, 
                country: data.country, 
                role: role 
            });
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
        <div className="flex w-full h-screen bg-gradient-to-b from-green-50 dark:from-green-950 to-white dark:to-black items-center justify-center transition-colors duration-300">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="w-[32rem] lg:w-12/12 flex items-center justify-center bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md">
                    <div className="max-w-md w-full space-y-8 p-8">
                        <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
                            Sign up to unlock new opportunities
                        </h2>

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <Label htmlFor="firstname" className="text-xs text-gray-700 dark:text-gray-300">
                                        First Name
                                    </Label>
                                    <Input 
                                        id="firstname" 
                                        type="text" 
                                        {...register("firstname")} 
                                        placeholder="Enter your first name" 
                                        className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" 
                                    />
                                    {errors.firstname && <p className="text-xs text-red-500">{errors.firstname.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="lastname" className="text-xs text-gray-700 dark:text-gray-300">
                                        Last Name
                                    </Label>
                                    <Input 
                                        id="lastname" 
                                        type="text" 
                                        {...register("lastname")} 
                                        placeholder="Enter your last name" 
                                        className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" 
                                    />
                                    {errors.lastname && <p className="text-xs text-red-500">{errors.lastname.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-xs text-gray-700 dark:text-gray-300">
                                        Email
                                    </Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        {...register("email")} 
                                        placeholder="Enter your email" 
                                        className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" 
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password" className="text-xs text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                            placeholder="Password"
                                            className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={toggleVisibility} 
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                        >
                                            {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword" className="text-xs text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        placeholder="Confirm Password"
                                        className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                    />
                                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="country" className="text-xs text-gray-700 dark:text-gray-300">
                                        Country
                                    </Label>
                                    <Select onValueChange={(value) => setValue("country", value)}>
                                        <SelectTrigger className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-black border dark:border-gray-800">
                                            <SelectGroup>
                                                <SelectLabel className="text-gray-700 dark:text-gray-300">Countries</SelectLabel>
                                                {countries?.map((country:string) => (
                                                    <SelectItem 
                                                        key={country} 
                                                        value={country}
                                                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                                    >
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                            >
                                Sign up
                            </Button>

                            <Button
                                type="button"
                                onClick={() => handleGoogleSignup()}
                                className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center border border-gray-300 dark:border-gray-700"
                            >
                                <FcGoogle className="text-xl mr-3" />
                                Sign up with Google
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-green-800 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400">
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
