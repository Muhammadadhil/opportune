import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button1";
import { ExternalLink } from "lucide-react";
import { ImageCarousal } from "@/components/common/ImageCarousel";


interface PortfolioData {
    freelancerId?: string;
    title: string;
    description: string;
    skills: string[];
    images: File[];
    imageUrls?: string[];
    link: string;
}

interface PortfolioCardProps {
    portfolio: PortfolioData;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDialog = () => setIsOpen(true);
    const handleCloseDialog = () => setIsOpen(false);

    return (
        <>
            <div className="overflow-hidden p-2 border rounded-xl group cursor-pointer" onClick={handleOpenDialog}>
                <img
                    src={portfolio.imageUrls?.[0] || "/placeholder.svg?height=160&width=240"}
                    alt={portfolio.title}
                    className="w-full h-40 object-cover rounded-xl transform group-hover:scale-105 transition ease-in-out duration-300"
                />
                <p className="text-sm truncate px-2 pt-2 font-semibold">{portfolio.title.charAt(0).toUpperCase() + portfolio.title.slice(1)}</p>
            </div>

            <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>{portfolio.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <ImageCarousal array={portfolio.imageUrls || []} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md text-zinc-700 font-semibold mb-2">Description</h3>
                        <p className="text-sm text-gray-600">{portfolio.description}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md text-zinc-700 font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {portfolio.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    {portfolio.link && (
                        <div className="my-4">
                            <Button variant="outline" className="w-full" onClick={() => window.open(portfolio.link, "_blank")}>
                                View Project Live<ExternalLink className="ml-2 h-4 w-4 " />
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PortfolioCard;
