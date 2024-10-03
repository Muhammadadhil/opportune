import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/common/userSlice";
import { signUp } from "@/api/userApi";
import { getGoogleAuthTokens, getUserDetails } from "@/api/auth";
import PasswordField from "@/components/ui/passwordField";
import { getCountries } from "@/api/country";
import { useGoogleLogin } from "@react-oauth/google";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z
    .object({
        firstName: z.string().min(1, { message: "Firstname is required" }),
        lastName: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
        country: z.string().min(1, { message: "Country is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignUp: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        country: "",
        role: "",
    });
    // const [errors, setErrors] = useState({} as { [key: string]: string });
    const [countries, setCountries] = useState<string[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector((state: RootState) => state.user.userType);
    useEffect(() => {
        if (!role) {
            navigate("/type");
        }
    }, [role, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            role: role ?? "",
            [name]: value,
        });
        // setErrors({ ...errors, [name]: "" });
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

    // const validateForm = () => {
    //     const newErrors: { [key: string]: string } = {};

    //     if (!formData.firstname.trim()) {
    //         newErrors.firstname = "First name is required";
    //     }
    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required";
    //     }
    //     if (!formData.country.trim()) {
    //         newErrors.country = "Country is required";
    //     }
    //     if (!formData.password) {
    //         newErrors.password = "Password is required";
    //     } else if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/\d/.test(formData.password)) {
    //         newErrors.password = "Password must be at least 6 characters and include uppercase, lowercase, and a number";
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const handleSubmit1 = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signUp(formData);
            console.log("register response:", response.data);
            dispatch(setCredentials(response.data.data));
            navigate("/verify-email");
        } catch (error) {
            console.log("error:", error);
            toast.error(error?.response?.data?.message);
        }
    };

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

    const handleCountryChange = (country: string) => {
        setFormData({
            ...formData,
            country: country,
        });
        // setErrors({ ...errors, country: "" });
    };

    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center">
            <div className="w-[32rem] h-[38rem] lg:w-12/12 flex items-center justify-center bg-white rounded-2xl">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-xl font-bold  text-gray-700">Sign up to unlock new opportunities</h2>
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
                                    className={`placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${ errors.firstName && `border-red-500` }`}
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={handleInputChange}
                                    {...register("firstName")}
                                />
                                {errors.firstName && <p className="text-xs italic text-red-500 mt-2"> {errors.firstName?.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="lastname">
                                    Last name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-500" htmlFor="email-address">
                                    Email
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <PasswordField value={formData.password} onChange={handleInputChange} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                            <div>
                                <Select onValueChange={handleCountryChange} value={formData.country}>
                                    <SelectTrigger className="w-[28rem]">
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
                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </button>
                            <br />
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-gray-300 hover:bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={handleGoogleSignup}
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
