import type React from "react";
import { useState } from "react";
import { Shield, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../../components/ui/button1";
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
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-950  rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
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
            icon: <Users className="w-6 h-6 text-white" />,
            title: "Seamless Chat",
            description: "Connect instantly with clients through our real-time messaging system designed for clear communication.",
            color: "bg-green-600",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
            title: "Video Calls",
            description: "Conduct face-to-face meetings with clients through high-quality, secure video conferencing.",
            color: "bg-blue-500",
        },
        {
            icon: <Shield className="w-6 h-6 text-white" />,
            title: "Escrow Protection",
            description: "Secure payment system with escrow ensures both clients and freelancers are protected throughout the project.",
            color: "bg-green-500",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            title: "Client Matching",
            description: "Our smart matching system connects you with the perfect clients for your skills and expertise.",
            color: "bg-purple-500",
        },
    ];

    const testimonials = [
        {
            quote: "The video call feature made it so easy to discuss project details with my clients. The clarity of communication has significantly improved my project outcomes.",
            author: "Alex Morgan",
            role: "UI/UX Designer",
            company: "Freelance",
            rating: 5,
        },
        {
            quote: "The escrow payment system gives me peace of mind. I know my payment is secure, and I can focus on delivering quality work without worrying about payment issues.",
            author: "David Chen",
            role: "Web Developer",
            company: "DevSolutions",
            rating: 5,
        },
        {
            quote: "Finding the right clients used to be my biggest challenge. This platform's matching system has connected me with clients who truly value my skills and expertise.",
            author: "Sophia Martinez",
            role: "Content Strategist",
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
                        Connect and Collaborate <span className="text-green-600">Securely</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Our platform brings freelancers and clients together with powerful communication tools and secure payment protection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="bg-gradient-to-r from-green-60 to-orange-50 dark:border-zinc-800 dark:bg-zinc-950 rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Building Successful Connections</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Join our growing community of freelancers and clients creating successful partnerships.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">15k+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Active Users</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">30k+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Successful Projects</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">$8M+</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Secure Transactions</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl md:text-5xl font-bold text-green-600">4.9/5</p>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Client Satisfaction</p>
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Success Stories</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Hear from freelancers who have transformed their business using our communication and payment tools.</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Connect with Perfect Clients?</h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">Join our platform today and experience secure payments, seamless communication, and perfect client matches.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="default" className="text-white border-white hover:bg-green-600">
                                See How It Works
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeatureSection;
