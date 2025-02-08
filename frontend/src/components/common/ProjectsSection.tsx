import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function ProjectsSection() {
    const projects = [
        {
            title: "Full-Stack Web Developer Needed",
            budget: "$5,000",
            description: "Looking for an experienced developer to build a complete e-commerce platform",
            skills: ["React", "Node.js", "PostgreSQL"],
            proposals: 12,
        },
        {
            title: "Mobile App UI/UX Designer",
            budget: "$3,000",
            description: "Design a modern mobile app interface for a fitness tracking application",
            skills: ["Figma", "UI/UX", "Mobile Design"],
            proposals: 8,
        },
        {
            title: "Content Writer for Tech Blog",
            budget: "$1,500",
            description: "Create engaging technical content for our software development blog",
            skills: ["Technical Writing", "SEO", "Content Strategy"],
            proposals: 15,
        },
    ];

    return (
        <section className="mt-24">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight text-green-800 dark:text-white">Featured Projects</h1>

                <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                    View All Projects <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                            <span className="text-green-600 font-semibold">{project.budget}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{project.proposals} proposals</span>
                            <Button>Apply Now</Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Button variant="ghost" className="w-full mt-8 sm:hidden flex items-center justify-center gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
        </section>
    );
}
