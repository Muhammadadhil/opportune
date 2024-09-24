import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserType } from "@/features/common/userSlice";

const UserType: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (type: string) => {
        setSelectedValue(type);
        dispatch(setUserType(type));
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="mb-8">
                <h1>join as a client or freelancer</h1>
            </div>
            <div className="flex w-[40rem] h=[32rem] justify-around">
                <div className="form-radio w-56 h-20 bg-amber-400 flex items-center justify-center rounded-2xl cursor-pointer select-none focus:ring-gray-400" onClick={() => handleChange("client")}>
                    {/* <input type="radio" name="role" value="client" /> */}
                    <Radio checked={selectedValue === "client"} value="client" name="role" color="default" />
                    <span className="text-lg font-medium">Join as Client</span>
                </div>

                <div
                    className="form-radio w-56 h-20 bg-amber-400 flex items-center justify-center rounded-2xl cursor-pointer select-none focus:ring-gray-400"
                    onClick={() => handleChange("freelancer")}
                >
                    {/* <input type="radio" name="role" value="client" /> */}
                    <Radio checked={selectedValue === "freelancer"} value="freelancer" name="role" color="default" />
                    <span className="text-lg font-medium">Join as Freelancer</span>
                </div>
            </div>
            <div className="mt-24 w-40 h-10 outline flex items-center justify-center rounded-2xl cursor-pointer select-none" onClick={() => (selectedValue ? navigate("/join") : null)}>
                <span>{selectedValue ? `join as ${selectedValue}` : <span className="">create account</span>}</span>
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
