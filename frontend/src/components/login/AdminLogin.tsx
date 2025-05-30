import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LockIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { setAdminAuthStatus } from "@/store/slices/userSlice"; 
import { loginAdmin } from "@/api/admin";
import {setAccessToken} from '@/utils/auth'
import { RootState } from "@/store/store";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { isAdminAuthenticated } = useSelector((state: RootState) => state.user);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await loginAdmin(email, password);
            console.log("Login successful", response);
            dispatch(setAdminAuthStatus());
            setAccessToken(response.data.accessToken);
            navigate('/admin/dashboard');
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        if(isAdminAuthenticated){
             navigate('/admin/dashboard')
        }else{
             navigate("/admin");
        };
    },[])

    return (
        <div className="flex w-full h-screen bg-gray-100 dark:bg-black items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <LockIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
