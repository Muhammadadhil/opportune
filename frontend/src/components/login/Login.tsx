import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "@/api/userApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/common/userSlice";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import PasswordField from "@/components/ui/passwordField";

// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"; 
// import { z } from "zod";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // dynamic key (ES6 syntax)
        });
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error("Please enter your email");
            return;
        }
        if (!formData.password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const response = await signIn(formData);
            dispatch(setCredentials(response.data.data));
            navigate("/");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const response = await getUserDetails(codeResponse.access_token);
            dispatch(setCredentials(response.data.userInfo));
            navigate("/");
        },
        onError: (errorResponse) => {
            toast.error("Error signing in with Google");
        },
    });

    return (
        <div className="flex w-full h-screen bg-gray-100 items-center justify-center">
            <div className="w-[32rem] h-[38rem] lg:w-12/12 flex items-center justify-center bg-white rounded-2xl shadow-md">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="mt-6 text-center text-2xl font-semibold text-gray-700">Sign in to your account</h2>

                    <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                        <div className="rounded-md shadow-sm space-y-2">
                            <Label htmlFor="email-address" className="text-gray-700">Email address</Label>
                            <Input id="email-address" name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full" placeholder="Enter your email" required />
                        </div>

                        <PasswordField value={formData.password} onChange={handleInputChange} />

                        <div className="flex items-center justify-between">
                            <Label htmlFor="remember-me" className="text-sm text-gray-700">
                                <input id="remember-me" name="remember-me" type="checkbox" className="mr-2 rounded text-indigo-600" />
                                Remember me
                            </Label>
                            <Link to="/" className="text-xs text-orange-900 hover:text-orange-800">
                                Forgot your password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full bg-green-800 hover:bg-green-900">
                            Sign in
                        </Button>

                        <Button type="button" className="w-full bg-gray-300 hover:bg-slate-300 flex items-center justify-center" onClick={handleGoogleSignIn}>
                            <FcGoogle className="text-xl mr-3" />
                            Sign in with Google
                        </Button>
                    </form>

                    <div className="text-center">
                        <span className="text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/type" className="text-gray-800">
                                Signup
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
