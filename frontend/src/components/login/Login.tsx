import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "@/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/ui/passwordField";
import Loading from "../loading/Loading";
import { setAccessToken } from "@/utils/auth";
import { RootState } from "@/store/store";
import { loginGoogleUser } from "@/api/auth";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
            setIsLoading(true);
            const response = await signIn(formData);
            dispatch(setCredentials(response.data.data));
            setIsLoading(false);
            setAccessToken(response.data.accessToken);
            if (response.data.data.role == 'freelancer') {
                navigate("/fr/dashboard");
            } else {
                navigate("/cl/dashboard");
            }
        } catch (error) {
            setIsLoading(false);
            console.log('login error:', error);
            toast.error(error?.response?.data?.message);
        }
    };

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const response = await loginGoogleUser(codeResponse.access_token);
            console.log("google signin response:", response);
            dispatch(setCredentials(response.data.data));
            setAccessToken(response.data.accessToken);
            if (response.data.authType === "signup" && response.data.data.role === "client") {
                navigate("/cl/details");
            } else {
                navigate("/");
            }
        },
        onError: (errorResponse) => {
            toast.error("Error signing in with Google");
        },
    });

    return (
        <div className="flex w-full h-screen min-h-screen bg-gradient-to-b from-green-50 dark:from-green-950 to-white dark:to-black items-center justify-center transition-colors duration-300">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="w-[32rem] h-[38rem] lg:w-12/12 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 flex items-center justify-center rounded-2xl shadow-md">
                    <div className="max-w-md w-full space-y-8 p-8">
                        <h2 className="mt-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
                            Sign in to your account
                        </h2>

                        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                            <div className="rounded-md shadow-sm space-y-2">
                                <Label htmlFor="email-address" className="text-gray-700 dark:text-gray-300">
                                    Email address
                                </Label>
                                <Input 
                                    id="email-address" 
                                    name="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" 
                                    placeholder="Enter your email" 
                                />
                            </div>

                            <PasswordField value={formData.password} onChange={handleInputChange} />

                            <div className="flex items-center justify-between">
                                <Label htmlFor="remember-me" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <input 
                                        id="remember-me" 
                                        name="remember-me" 
                                        type="checkbox" 
                                        className="mr-2 rounded border-gray-300 dark:border-gray-700 text-green-600 focus:ring-green-500" 
                                    />
                                    Remember me
                                </Label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-xs text-orange-900 dark:text-orange-500 hover:text-orange-800 dark:hover:text-orange-400"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-800 text-white"
                            >
                                Sign in
                            </Button>

                            <Button 
                                type="button" 
                                className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center border border-gray-300 dark:border-gray-700" 
                                onClick={() => handleGoogleSignIn()}
                            >
                                <FcGoogle className="text-xl mr-3" />
                                Sign in with Google
                            </Button>
                        </form>

                        <div className="text-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link to="/type" className="text-green-800 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400">
                                    Signup
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
