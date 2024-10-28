import React from "react";
import Navbar from "../../components/ui/Navbar";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Search } from "lucide-react";



const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Navbar />
            <main className="container mx-auto px-4 py-48">
                <div className="flex flex-col items-center justify-center space-y-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Unlock Your Potential with
                        <span className="block text-green-800">Freelance Opportunities</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-gray-600 sm:text-2xl">Connect with clients and showcase your skills. Start your freelancing journey today!</p>
                    <div className="w-full max-w-md space-y-4">
                        <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                            <Input className="flex-grow" placeholder="Search for opportunities..." type="search" aria-label="Search for opportunities" />
                            <Button type="submit" aria-label="Search">
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
