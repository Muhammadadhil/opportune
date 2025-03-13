import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Hero() {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>();
    const handleSearch=()=>{
        navigate("/explore",{state:{search:searchValue}});
    }

    return (
        <div className="text-center max-w-3xl mx-auto mt-36">
            <div>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
                        Unlock Your Potential with
                        <span className="block text-green-800 ">Freelance Opportunities</span>
                    </h1>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8 }}>
                    <p className="max-w-2xl mx-auto text-xl my-8 text-gray-600 dark:text-gray-300 sm:text-2xl">Connect with clients and showcase your skills. Start your freelancing journey today!</p>
                </motion.div>
                <div className="w-full max-w-md mt-4 mx-auto">
                    <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Search for opportunities..."
                            type="search"
                            aria-label="Search for opportunities"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button type="submit" aria-label="Search" variant="default" onClick={() => {handleSearch()}}>
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
