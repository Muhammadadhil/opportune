import type React from "react";
import { useState } from "react";
import { Check, Shield, Clock, Briefcase, Users, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

interface TestimonialProps {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => (
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>{icon}</div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
);

const Testimonial = ({ quote, author, role, company, rating }: TestimonialProps) => (
    <Card className="h-full">
        <CardContent className="pt-6">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < rating ? "text-green-600 fill-green-600" : "text-gray-300"}`} />
                ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{quote}"</p>
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-orange-500 flex items-center justify-center text-white font-bold">{author.charAt(0)}</div>
                <div className="ml-3">
                    <p className="font-medium dark:text-white">{author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {role}, {company}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const FeatureSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState("projects");

    const features = [
        {
            icon: <Briefcase className="w-6 h-6 text-white" />,
            title: "Project Management",
            description: "Organize and track all your projects in one place with intuitive tools designed for freelancers.",
            color: "bg-green-600",
        },
        {
            icon: <Clock className="w-6 h-6 text-white" />,
            title: "Time Tracking",
            description: "Track billable hours accurately and create detailed reports for your clients.",
            color: "bg-blue-500",
        },
        {
            icon: <Shield className="w-6 h-6 text-white" />,
            title: "Secure Contracts",
            description: "Create, send, and sign legally binding contracts that protect your work and payments.",
            color: "bg-green-500",
        },
        {
            icon: <Users className="w-6 h-6 text-white" />,
            title: "Client Portal",
            description: "Give clients a dedicated space to view progress, provide feedback, and approve deliverables.",
            color: "bg-purple-500",
        },
    ];

    const testimonials = [
        {
            quote: "This platform transformed how I manage my freelance design business. The project tracking and client management tools are simply outstanding.",
            author: "Sarah Johnson",
            role: "Graphic Designer",
            company: "Freelance",
            rating: 5,
        },
        {
            quote: "I've tried many freelance tools, but this one stands out for its intuitive interface and comprehensive features. Worth every penny!",
            author: "Michael Chen",
            role: "Web Developer",
            company: "CodeCraft",
            rating: 5,
        },
        {
            quote: "The invoicing and payment tracking features have saved me countless hours and helped me maintain a professional image with clients.",
            author: "Emma Rodriguez",
            role: "Content Writer",
            company: "Self-employed",
            rating: 4,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-16 space-y-24">
            {/* Main Feature Section */}
            <section>
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-3 py-1 border-green-600 text-green-600 dark:text-green-600">
                        Features
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                        Everything You Need to <span className="text-green-600">Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Powerful tools designed specifically for freelancers to manage projects, track time, and grow their business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </section>

            {/* Managed Projects Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
                    <Badge variant="outline" className="px-3 py-1 border-green-600 text-green-600 dark:text-green-600">
                        Project Management
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Managed Projects</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Take control of your freelance workflow with our comprehensive project management tools designed to help you deliver exceptional results.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="text-gray-700 dark:text-gray-200 font-medium">Automated workflows</span>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Set up custom workflows that automate repetitive tasks</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="text-gray-700 dark:text-gray-200 font-medium">Advanced analytics</span>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Track progress with detailed analytics and customizable reports</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="text-gray-700 dark:text-gray-200 font-medium">Client collaboration</span>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Share progress, gather feedback, and approve deliverables in one place</p>
                            </div>
                        </li>
                    </ul>
                    <Button className="bg-green-600 hover:bg-green-600 text-white">
                        Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-0 bg-green-600 rounded-2xl scale-105 translate-x-4 -z-10 opacity-70 blur-sm"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                            </div>
                            <div className="p-4 flex items-center justify-center">
                                <img src="/placeholder.svg?height=300&width=400" width={400} height={300} alt="Project management dashboard" className="object-contain rounded-lg shadow-sm" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Tools Section with Tabs */}
            <section className="pt-16">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-3 py-1 border-green-600 text-green-600 dark:text-green-600">
                        Freelance Toolkit
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                        All the Tools You Need for <span className="text-green-600">Freelance Success</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Our comprehensive toolkit helps you manage every aspect of your freelance business.</p>
                </div>

                <Tabs defaultValue="projects" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full max-w-2xl">
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
                            <TabsTrigger value="clients">Clients</TabsTrigger>
                            <TabsTrigger value="contracts">Contracts</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="projects" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <h3 className="text-2xl font-bold dark:text-white">Project Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Organize your projects with customizable boards, Gantt charts, and task lists. Track progress, set milestones, and never miss a deadline.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-600 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Multiple project views (Kanban, List, Gantt)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-600 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Task dependencies and critical path</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-600 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Resource allocation and workload management</span>
                                </li>
                            </ul>
                            <Button className="bg-green-600 hover:bg-green-600 text-white">Explore Project Tools</Button>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img src="/placeholder.svg?height=400&width=500" width={500} height={400} alt="Project management dashboard" className="rounded-lg shadow-lg" />
                        </div>
                    </TabsContent>

                    <TabsContent value="invoicing" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <h3 className="text-2xl font-bold dark:text-white">Invoicing & Payments</h3>
                            <p className="text-gray-600 dark:text-gray-300">Create professional invoices, track payments, and get paid faster with our integrated payment processing.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Customizable invoice templates</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Automatic payment reminders</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Multiple currency support</span>
                                </li>
                            </ul>
                            <Button className="bg-green-500 hover:bg-green-600 text-white">Explore Invoicing Tools</Button>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img src="/placeholder.svg?height=400&width=500" width={500} height={400} alt="Invoicing dashboard" className="rounded-lg shadow-lg" />
                        </div>
                    </TabsContent>

                    <TabsContent value="clients" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <h3 className="text-2xl font-bold dark:text-white">Client Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">Manage client relationships, track communications, and provide a professional client experience.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Client portals with custom branding</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Feedback and approval workflows</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Communication history and file sharing</span>
                                </li>
                            </ul>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Explore Client Tools</Button>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img src="/placeholder.svg?height=400&width=500" width={500} height={400} alt="Client management dashboard" className="rounded-lg shadow-lg" />
                        </div>
                    </TabsContent>

                    <TabsContent value="contracts" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <h3 className="text-2xl font-bold dark:text-white">Contracts & Proposals</h3>
                            <p className="text-gray-600 dark:text-gray-300">Create, send, and sign legally binding contracts and professional proposals that win clients.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Contract templates for different industries</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Electronic signatures and legal compliance</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200">Proposal tracking and analytics</span>
                                </li>
                            </ul>
                            <Button className="bg-purple-500 hover:bg-purple-600 text-white">Explore Contract Tools</Button>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img src="/placeholder.svg?height=400&width=500" width={500} height={400} alt="Contract dashboard" className="rounded-lg shadow-lg" />
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="bg-gradient-to-r from-green-60 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Trusted by Freelancers Worldwide</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Join thousands of freelancers who are growing their business with our platform.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">10k+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Active Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">45k+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Projects Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">$12M+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Payments Processed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">4.8/5</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section>
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-3 py-1 border-green-600 text-green-600 dark:text-green-600">
                        Testimonials
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">What Freelancers Are Saying</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Don't just take our word for it. Here's what freelancers like you have to say.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="bg-green-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Supercharge Your Freelance Business?</h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Join thousands of successful freelancers who are growing their business with our platform.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                                Get Started Free
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-600">
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeatureSection;

// import type React from "react";
// import { Check, Box, Shield } from "lucide-react";
// import productMgt from  '../../assets/product-screenshot-board-gantt-views.avif'
// // import freelancerTools from "../../assets/freelancerTools.jpg";

// const FeatureSection: React.FC = () => {
//     return (
//         <div className="space-y-24 py-16 px-44">
//             {/* Managed Projects Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                 <div className="space-y-6">
//                     <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Managed Projects</h2>
//                     <p className="text-lg text-gray-600 dark:text-gray-300">Streamline your freelance workflow and achieve your goals efficiently with our tools.</p>
//                     <ul className="space-y-4">
//                         <li className="flex items-start gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
//                                 <Check className="w-4 h-4 text-white" />
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Automated project management workflow</span>
//                         </li>
//                         <li className="flex items-start gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
//                                 <Check className="w-4 h-4 text-white" />
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Track progress with detailed analytics</span>
//                         </li>
//                         <li className="flex items-start gap-3">
//                             <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
//                                 <Check className="w-4 h-4 text-white" />
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Seamless client collaboration</span>
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="flex justify-center">
//                     <div className="relative w-full max-w-md">
//                         <div className="absolute inset-0 bg-yellow-400 rounded-full scale-125 translate-x-4 -z-10"></div>
//                         <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
//                             <div className="border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
//                                 <div className="flex gap-1">
//                                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
//                                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
//                                     <div className="w-3 h-3 rounded-full bg-gray-300"></div>
//                                 </div>
//                                 <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
//                                 <div className="w-6 h-6 flex items-center justify-center">
//                                     <span className="text-gray-400">⌕</span>
//                                 </div>
//                             </div>
//                             <div className="p-4 flex items-center justify-center">
//                                 <img src={productMgt} width={250} height={250} alt="Project management illustration" className="object-contain" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Tools Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-28">
//                 <div className="flex justify-center">
//                     <div className="relative w-full max-w-md">
//                         <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-300 rounded-full -z-10"></div>
//                         <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-green-400 rounded-full -z-10"></div>
//                         {/* <img src={freelancerTools} width={300} height={300} alt="Freelancer illustration" className="relative z-10" /> */}
//                     </div>
//                 </div>
//                 <div className="space-y-6">
//                     <h2 className="text-3xl md:text-4xl font-bold dark:text-white">All the Tools You Need for Freelance Success!</h2>
//                     <p className="text-lg text-gray-600 dark:text-gray-300">Take your freelance career to the next level with these features:</p>
//                     <ul className="space-y-4">
//                         <li className="flex items-center gap-3">
//                             <div className="flex-shrink-0 w-8 h-8 rounded-md bg-pink-500 flex items-center justify-center">
//                                 <span className="text-white text-sm">⚙️</span>
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Effortless project tracking</span>
//                         </li>
//                         <li className="flex items-center gap-3">
//                             <div className="flex-shrink-0 w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
//                                 <Box className="w-4 h-4 text-white" />
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Time and expense management</span>
//                         </li>
//                         <li className="flex items-center gap-3">
//                             <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
//                                 <Shield className="w-4 h-4 text-white" />
//                             </div>
//                             <span className="text-gray-700 dark:text-gray-200">Secure client communications</span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FeatureSection;
