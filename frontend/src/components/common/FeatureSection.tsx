import { motion } from "framer-motion";
import { Briefcase, Star, Shield } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: "Find Work Easily",
            description: "Access thousands of projects across various categories and skill levels",
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Quality Talent",
            description: "Connect with pre-vetted professionals ready to start immediately",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure Payments",
            description: "Your payments are protected until you're 100% satisfied with the work",
        },
    ];

    return (
        <div className="py-24 bg-lime-200 dark:bg-gray-800 rounded-3xl mt-20 px-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center tracking-tight mb-16 text-gray-900 dark:text-white">Why Choose Our Platform</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} className="text-center">
                            <div className="flex justify-center mb-4 text-green-600 dark:text-green-400">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
