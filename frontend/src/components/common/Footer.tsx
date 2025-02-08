import { Youtube, Facebook, Twitter, Github  } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black py-8 sm:py-12 px-4 transition-all duration-300">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-2 justify-center sm:justify-start">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                            Opportune<span className="text-green-600">.</span>
                        </h2>
                    </div>

                    {/* Navigation */}
                    {/* <nav className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
                        <a href="#" className="text-gray-600  dark:text-white hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            Plans & Pricing
                        </a>
                        <a href="#" className="text-gray-600  dark:text-white hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            Features
                        </a>
                        <a href="#" className="text-gray-600  dark:text-white hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            News & Blogs
                        </a>
                        <a href="#" className="text-gray-600  dark:text-white hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            Careers
                        </a>
                    </nav> */}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-end">
                        <button className="bg-lime-300 text-black px-6 py-2 rounded-full hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">Try Opportune</button>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                    {[
                        { icon: Youtube, label: "YouTube" },
                        { icon: Facebook, label: "Facebook" },
                        { icon: Twitter, label: "Twitter" },
                        { icon: Github, label: "GitHub" },
                    ].map(({ icon: Icon, label }) => (
                        <a key={label} href="#" aria-label={label} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 hover:shadow-md">
                            <Icon className="w-5 h-5 text-gray-600" />
                        </a>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8" />

                {/* Copyright */}
                <div className="text-center text-gray-600 space-y-4 sm:space-y-0">
                    <p className="text-sm sm:text-base">© 2025 Opportune Inc. All rights reserved.</p>
                    <a href="#" className="inline-block ml-0 sm:ml-4 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                        Terms of Service
                    </a>
                </div>

                {/* Brand and Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <span className="text-gray-600">Opportune, 2025.</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-6 text-gray-600">
                        <a href="opportunefreelanceapp@gmail.com" className="hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            opportunefreelanceapp@gmail.com
                        </a>
                        <a href="tel:+12018953801" className="hover:text-gray-900 transition-colors duration-200 transform hover:scale-105">
                            +91 7994617934
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

// import { Facebook, Twitter, Linkedin } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//     return (
//         <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-16 transition-colors duration-300">
//             <div className="container mx-auto px-4">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//                     {/* Logo column */}
//                     <div className="md:col-span-1">
//                         <Link to="/" className="flex items-center">
//                             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                                 Opportune<span className="text-green-600">.</span>
//                             </h2>
//                         </Link>
//                     </div>

//                     {/* Products column */}
//                     <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Products</h3>
//                         <ul className="space-y-3">
//                             <li>
//                                 <Link to="/product" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Product
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Pricing
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Log in
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/request" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Request access
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/partnerships" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Partnerships
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* About us column */}
//                     <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About us</h3>
//                         <ul className="space-y-3">
//                             <li>
//                                 <Link to="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     About Opportune
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Contact us
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/features" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Features
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/careers" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Careers
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Resources column */}
//                     <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
//                         <ul className="space-y-3">
//                             <li>
//                                 <Link to="/help" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Help center
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/demo" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Book a demo
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/status" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Server status
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/blog" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm transition-colors duration-200">
//                                     Blog
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Get in touch column */}
//                     <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Get in touch</h3>
//                         <ul className="space-y-3">
//                             <li>
//                                 <span className="text-gray-600 dark:text-gray-400 text-sm">Questions or feedback?</span>
//                             </li>
//                             <li>
//                                 <span className="text-gray-600 dark:text-gray-400 text-sm">We'd love to hear from you</span>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Bottom section */}
//                 <div className="mt-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//                     <div className="text-sm text-gray-600 dark:text-gray-400">
//                         <span>©2024 Opportune</span>
//                         <span className="mx-2">|</span>
//                         <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
//                             Terms of Service
//                         </Link>
//                         <span className="mx-2">|</span>
//                         <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
//                             Privacy Policy
//                         </Link>
//                     </div>

//                     {/* Social links */}
//                     <div className="flex space-x-4">
//                         <Link
//                             to="https://facebook.com"
//                             className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             <Facebook className="h-5 w-5" />
//                             <span className="sr-only">Facebook</span>
//                         </Link>
//                         <Link
//                             to="https://twitter.com"
//                             className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             <Twitter className="h-5 w-5" />
//                             <span className="sr-only">Twitter</span>
//                         </Link>
//                         <Link
//                             to="https://linkedin.com"
//                             className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             <Linkedin className="h-5 w-5" />
//                             <span className="sr-only">LinkedIn</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// }
