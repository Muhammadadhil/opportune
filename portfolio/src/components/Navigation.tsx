import React from "react";
import { Link } from "lucide-react";

const Navigation: React.FC = () => {
    return (
        <nav className="flex space-x-6 text-gray-400">
            <a href="#projects" className="hover:text-white transition-colors">
                Projects
            </a>
            <a href="#talks" className="hover:text-white transition-colors">
                Talks
            </a>
            <a href="#articles" className="hover:text-white transition-colors">
                Articles
            </a>
        </nav>
    );
};

export default Navigation;
