import React from "react";
import Header from "../components/Header";

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-full ml-80">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the world of opportunities</h1>
                </div>
                <div className="w-6/12  mt-10"></div>
            </div>
            
        </>
    );
};

export default Home;
