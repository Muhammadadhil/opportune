import React from "react";
import { ExternalLink, Star } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex justify-between items-start">
                <h3 className="text-white text-lg font-medium">{project.title}</h3>
                {project.stars && (
                    <div className="flex items-center space-x-1 text-gray-400">
                        <Star size={16} />
                        <span>{project.stars}</span>
                    </div>
                )}
            </div>
            <p className="text-gray-400 mt-2">{project.description}</p>
            {project.link && (
                <a href={project.link} className="mt-4 inline-flex items-center text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" />
                    View Project
                </a>
            )}
        </div>
    );
};

export default ProjectCard;
