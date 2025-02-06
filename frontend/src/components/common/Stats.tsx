import { motion } from "framer-motion";

export const StatCard = ({ number, title, bgColor = "bg-green-700", height = "h-72", width = "w-56" }: { number: string; title: string; bgColor?: string; height?: string; width?: string }) => (
    <div className={`${bgColor} text-white ${height} ${width} flex flex-col items-center justify-center text-center rounded-3xl shadow-lg`}>
        <div className="text-2xl font-bold ">{number}</div>
        <div className="text-sm mt-2 opacity-90">{title}</div>
    </div>
);

const Stats = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8 h-auto">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0 }}>
                <StatCard number="5K+" title="Freelancers Registered" bgColor="bg-green-800" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }}>
                <StatCard number="12K+" title="Projects Completed" bgColor="bg-lime-300" height={"h-52"} width={"w-56"} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.4 }}>
                <StatCard number="3+" title="Years Connecting Talent & Opportunities" bgColor="bg-lime-400" />
            </motion.div>
        </div>
    );
};


export default Stats;
