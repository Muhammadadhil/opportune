import { Star, Briefcase, Search } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Input } from "../ui/input";
export default function Hero() {
    return (
        <div className="text-center max-w-3xl mx-auto mt-36">
            {/* <h1 className="text-5xl font-bold text-gray-800 leading-tight  font">
                Unlock Your Potential With Freelance
                <span className="pl-3 text-green-800">Opportunities</span>
            </h1> */}
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
                        />
                        <Button type="submit" aria-label="Search" variant="default">
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
