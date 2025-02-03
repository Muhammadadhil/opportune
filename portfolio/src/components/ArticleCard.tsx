import React from "react";
import { ExternalLink } from "lucide-react";
import { Article } from "../types";

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-sm text-gray-500">{article.category}</span>
                    <h3 className="text-white text-lg font-medium mt-1">{article.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{article.date}</p>
                </div>
                <div className="flex items-center space-x-4 text-gray-400">
                    {article.views && <span>{article.views} views</span>}
                    {article.slides && <span>{article.slides} slides</span>}
                </div>
            </div>
            {article.link && (
                <a href={article.link} className="mt-4 inline-flex items-center text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" />
                    Read More
                </a>
            )}
        </div>
    );
};

export default ArticleCard;
