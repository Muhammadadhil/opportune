import { Facebook, Twitter, Linkedin } from "lucide-react";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Logo column */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Opportune<span className="text-green-600">.</span>
                            </h2>
                        </Link>
                    </div>

                    {/* Products column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/product" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Product
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Log in
                                </Link>
                            </li>
                            <li>
                                <Link to="/request" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Request access
                                </Link>
                            </li>
                            <li>
                                <Link to="/partnerships" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Partnerships
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About us column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">About us</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                                    About Opportune
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/help" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Help center
                                </Link>
                            </li>
                            <li>
                                <Link to="/demo" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Book a demo
                                </Link>
                            </li>
                            <li>
                                <Link to="/status" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Server status
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 hover:text-gray-900 text-sm">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Get in touch column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Get in touch</h3>
                        <ul className="space-y-3">
                            <li>
                                <span className="text-gray-600 text-sm">Questions or feedback?</span>
                            </li>
                            <li>
                                <span className="text-gray-600 text-sm">We'd love to hear from you</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-600">
                        <span>©2024 Opportune</span>
                        <span className="mx-2">|</span>
                        <Link to="/terms" className="hover:text-gray-900">
                            Terms of Service
                        </Link>
                        <span className="mx-2">|</span>
                        <Link to="/privacy" className="hover:text-gray-900">
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Social links */}
                    <div className="flex space-x-4">
                        <Link to="https://facebook.com" className="text-gray-600 hover:text-gray-900">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link to="https://twitter.com" className="text-gray-600 hover:text-gray-900">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link to="https://linkedin.com" className="text-gray-600 hover:text-gray-900">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
