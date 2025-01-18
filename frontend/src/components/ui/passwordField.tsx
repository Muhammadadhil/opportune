import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label"; 


const PasswordField: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="rounded-md shadow-sm space-y-2">
            <Label htmlFor="email-address" className="text-gray-700">Password</Label>

            <div className="relative ">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="placeholder:text-xs appearance-none dark:bg-black dark:border-gray-700 dark:text-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                    placeholder="Password"
                    value={value}
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={onChange}
                />
                <button type="button" onClick={toggleVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword ? <Eye className="h-5 w-5 text-gray-500" /> : <EyeOff className="h-5 w-5 text-gray-500" />}
                </button>
            </div>
        </div>
    );
};

export default PasswordField;
