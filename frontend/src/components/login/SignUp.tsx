import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "@/features/common/userSlice";
import { signUp } from "@/api/userApi";
import { getUserDetails } from "@/api/auth";
// import PasswordField from "@/components/ui/passwordField";
import { getCountries } from "@/api/country";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
    .object({
        firstname: z.string().min(1, { message: "Firstname is required" }),
        lastname: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
        country: z.string().min(1, { message: "Country is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
    });

type ValidationSchema = z.infer<typeof validationSchema>;
interface SignUpProps {
    role: string;
}

const SignUp: React.FC<SignUpProps> = ({role}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const [countries, setCountries] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!role) {
            navigate("/type");
        }
    }, [role, navigate]);

    const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
        console.log("data from SubmitHandler:", data);

        try {
            const response = await signUp({ ...data, role: role ?? "" });
            console.log("register response:", response.data);
            dispatch(setCredentials(response.data.data));
            navigate("/verify-email");
        } catch (error) {
            console.log("error:", error);
            toast.error(error?.response?.data?.message);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await getCountries();
            const data = response.data;
            const countryNames = data.map((country: any) => country.name.common);
            setCountries(countryNames);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);
            try {
                const authType = "signup";
                const response = await getUserDetails(codeResponse.access_token, role ?? "", authType);
                console.log("response:", response);
                dispatch(setCredentials(response.data.userInfo));
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
            <div className="w-[32rem] h-[46rem] lg:w-12/12 flex items-center justify-center bg-white rounded-2xl">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-xl font-bold text-gray-700">Sign up to unlock new opportunities</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm space-y-2">
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    type="text"
                                    className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                                        errors.firstname && `border-red-500`
                                    }`}
                                    placeholder="First Name"
                                    {...register("firstname")}
                                />
                                {errors.firstname && <p className="text-xs  text-red-500 mt-2">{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="lastName">
                                    Last name
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                                        errors.lastName && `border-red-500`
                                    }`}
                                    placeholder="Last Name"
                                    {...register("lastname")}
                                />
                                {errors.lastName && <p className="text-xs italic text-red-500 mt-2">{errors.lastName.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                                        errors.email && `border-red-500`
                                    }`}
                                    placeholder="Email address"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-xs  text-red-500 mt-2">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm ${
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
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                                        errors.confirmPassword && `border-red-500`
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
                                            {countries.map((country) => (
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

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </button>
                            <br />
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-gray-300 hover:bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={() => handleGoogleSignup()}
                            >
                                <FcGoogle className="text-xl" />
                                <span className="pl-3">Sign up with Google</span>
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <span className="text-sm text-gray-500 mt-10 ">
                            Already have an account?{" "}
                            <Link to={"/login"} className="text-gray-800">
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
