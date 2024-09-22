import React, { useState } from "react";


const SignUp:React.FC=()=>{

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [location,setLocation] = useState("");


    return (
        <div className=" w-full h-screen flex items-center justify-center ">
            <div className="w-[39rem] h-[34rem] bg-gray-900 rounded-xl">
                <form action="">
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        required
                        className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm"
                        placeholder="First name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        id="lastname"
                        name="lasttname"
                        type="text"
                        required
                        className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm"
                        placeholder="Last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded relative block w-96 px-3 py-2 border border-gray-300 placeholder-slate-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-gray-400 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}

export default SignUp;