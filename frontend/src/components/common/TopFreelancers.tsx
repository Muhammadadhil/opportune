import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function TopFreelancers() {
    const freelancers = [
        {
            name: "Sarah Johnson",
            title: "Full-Stack Developer",
            rating: 4.9,
            reviews: 127,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
            hourlyRate: "$85/hr",
        },
        {
            name: "Michael Chen",
            title: "UI/UX Designer",
            rating: 4.8,
            reviews: 93,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
            hourlyRate: "$75/hr",
        },
        {
            name: "Emily Rodriguez",
            title: "Content Strategist",
            rating: 4.9,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
            hourlyRate: "$65/hr",
        },
    ];

    return (
        <section className="mt-24">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-green-800 dark:text-white">Top Freelancers</h1>
                <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                    View All Freelancers <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {freelancers.map((freelancer, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img src={freelancer.image} alt={freelancer.name} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{freelancer.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{freelancer.title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{freelancer.rating}</span>
                            <span className="text-gray-500 dark:text-gray-400">({freelancer.reviews} reviews)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-green-600 font-semibold">{freelancer.hourlyRate}</span>
                            <Button>View Profile</Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Button variant="ghost" className="w-full mt-8 sm:hidden flex items-center justify-center gap-2">
                View All Freelancers <ArrowRight className="w-4 h-4" />
            </Button>
        </section>
    );
}
