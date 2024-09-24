import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import apiClient from '../api/apiClient';

const SignUp: React.FC = () => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [country, setCountry] = useState<string>("");
    const [countries, setCountries] = useState<string[]>([]);

    const role= useSelector((state: RootState) => state.user.userType);


    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const countryNames = data.map((country: any) => country.name.common);
                setCountries(countryNames);
            })
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

        console.log("env:",import.meta.env);
        const severapi = import.meta.env.VITE_SERVER_API;
        console.log("serverapi:",severapi)


    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log("Sign Up attempted with:", { firstname, lastname, email, password, country });

        
        try {
            const response = await apiClient.post("/user/register", {
                firstname,
                lastname,
                email,
                password,
                country,
                role,
            });
            console.log('response from backend:',response);
        } catch (error) {
            console.log("error:", error);
        }
    };

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCountryChange = (country: string) => {
        setCountry(country);
    };

    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center">
            {/* Right side - Sign Up form */}
            <div className="w-[32rem] h-[38rem] lg:w-12/12 flex items-center justify-center bg-white rounded-2xl">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-xl font-bold  text-gray-700">Sign up to unlock new opportunities</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm space-y-2">
                            <div>
                                <label htmlFor="firstname" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="lastname" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="placeholder:text-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {showPassword ? <Eye className="h-5 w-5 text-gray-500" /> : <EyeOff className="h-5 w-5 text-gray-500" />}
                                </button>
                            </div>
                            <div>
                                <Select onValueChange={handleCountryChange} value={country}>
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
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 text-xs block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to={"/"} className="font-normal text-xs text-orange-900 hover:text-orange-800">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-800 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-orange-900 group-hover:text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign up
                            </button>
                            <br />
                            <button
                                type="button"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-gray-300 hover:bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <FcGoogle className="text-xl" />
                                <span className="pl-3">Sign up with Google</span>
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <span className="text-sm text-gray-500 mt-10 ">
                            already have an account?{" "}
                            <Link to={"/login"} className="text-gray-800">
                                login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
