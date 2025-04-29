import type React from "react";
import { Check, Box, Shield } from "lucide-react";
import productMgt from  '../../assets/product-screenshot-board-gantt-views.avif'
// import freelancerTools from "../../assets/freelancerTools.jpg";


const FeatureSection: React.FC = () => {
    return (
        <div className="space-y-24 py-16 px-44">
            {/* Managed Projects Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Managed Projects</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Streamline your freelance workflow and achieve your goals efficiently with our tools.</p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Automated project management workflow</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Track progress with detailed analytics</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Seamless client collaboration</span>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-0 bg-yellow-400 rounded-full scale-125 translate-x-4 -z-10"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                </div>
                                <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded"></div>
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <span className="text-gray-400">⌕</span>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-center">
                                <img src={productMgt} width={250} height={250} alt="Project management illustration" className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-28">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-md">
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-300 rounded-full -z-10"></div>
                        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-green-400 rounded-full -z-10"></div>
                        {/* <img src={freelancerTools} width={300} height={300} alt="Freelancer illustration" className="relative z-10" /> */}
                    </div>
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold dark:text-white">All the Tools You Need for Freelance Success!</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Take your freelance career to the next level with these features:</p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-pink-500 flex items-center justify-center">
                                <span className="text-white text-sm">⚙️</span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Effortless project tracking</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center">
                                <Box className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Time and expense management</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-200">Secure client communications</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
