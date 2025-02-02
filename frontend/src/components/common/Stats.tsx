import { motion } from "framer-motion";

export const StatCard = ({ number, title, bgColor = "bg-green-700", height = 72, width = 56 }: { number: string; title: string; bgColor?: string; height?: number; width?: number }) => (
    <div className={`${bgColor} text-white h-${height} w-${width} flex flex-col items-center justify-center text-center rounded-xl`}>
        <div className="text-2xl font-bold ">{number}</div>
        <div className="text-sm mt-2 opacity-90">{title}</div>
    </div>
);


const Stats = () => {
    return (
        <div className="flex gap-4 mt-8">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0 }}>
                <StatCard number="5K+" title="Freelancers Registered" bgColor="bg-green-800" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
                <StatCard number="12K+" title="Projects Completed" bgColor="bg-lime-200" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4 }}>
                <StatCard number="3+" title="Years Connecting Talent & Opportunities" bgColor="bg-lime-300" />
            </motion.div>
        </div>
    );
};

export default Stats;
