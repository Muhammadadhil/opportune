import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { setUserType } from "@/features/common/userSlice";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

const UserType: React.FC = () => {
    // const role = useSelector((state: RootState) => state.user.userType);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const handleChange = (type: string) => {
        // dispatch(setUserType(type));
        setRole(type);
        console.log("role:userType:", role);
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="mb-8">
                <h1>join as a client or freelancer</h1>
            </div>
            <div className="flex w-[40rem] h=[32rem] justify-around">
                <div
                    className="form-radio w-56 h-20  bg-green-700 hover:bg-green-800 text-white flex items-center justify-center rounded-2xl cursor-pointer select-none focus:ring-gray-400"
                    onClick={() => handleChange("client")}
                >
                    {/* <input type="radio" name="role" value="client" /> */}
                    <Radio checked={role === "client"} value="client" name="role" color="default" />
                    <span className="text-lg font-medium ">Join as Client</span>
                </div>

                <div
                    className="form-radio w-56 h-20  bg-green-700 hover:bg-green-800 text-white flex items-center justify-center rounded-2xl cursor-pointer select-none focus:ring-gray-400"
                    onClick={() => handleChange("freelancer")}
                >
                    {/* <input type="radio" name="role" value="client" /> */}
                    <Radio checked={role === "freelancer"} value="freelancer" name="role" color="default" />
                    <span className="text-lg font-medium">Join as Freelancer</span>
                </div>
            </div>
            <div
                className="mt-24 w-40 h-10 outline flex items-center justify-center rounded-2xl cursor-pointer select-none"
                onClick={() => (role ? navigate("/join", { replace: true, state: { role } }) : null)}
            >
                <span>{role ? `join as ${role}` : <span className="">create account</span>}</span>
            </div>
            <span className="text-sm text-gray-500 mt-10">
                already have an account?{" "}
                <Link to={"/login"} className="text-gray-800">
                    login
                </Link>
            </span>
        </div>
    );
};

export default UserType;
