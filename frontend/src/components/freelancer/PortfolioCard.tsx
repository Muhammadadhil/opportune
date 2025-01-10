import React from "react";

interface PortfolioCardProps {
    imageUrl: string;
    title: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ imageUrl, title }) => {
    return (
        <div className="overflow-hidden p-2 border rounded-xl">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-xl" />
            <p className="text-sm truncate px-2 pt-2">{title}</p>
        </div>
    );
};

export default PortfolioCard;
