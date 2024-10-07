import React from "react";
import SignUp from "../components/login/SignUp";
import { useLocation } from "react-router-dom";

const SignUpPage: React.FC = () => {
    const location = useLocation();
    const { role } = location.state || {};

    return (
        <>
            <SignUp role={role}/>
        </>
    );
};

export default SignUpPage;
