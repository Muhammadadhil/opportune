import { type LucideIcon, FolderSearch2 } from "lucide-react";
import { Button } from "./button1";
import { Link } from "react-router-dom";

interface NoItemsProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    Icon?: LucideIcon;
}

export default function NoItems({
    title = "No items to list right now",
    description = "Check back later for new items or try adjusting your search criteria.",
    buttonText = "Add New Item",
    buttonLink,
    Icon = FolderSearch2,
}: NoItemsProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 bg-muted/40 rounded-lg">
            <Icon className="w-20 h-20 text-muted-foreground mb-4 text-gray-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
            <p className="text-muted-foreground text-center max-w-sm mb-10">{description}</p>
            {buttonLink && (
                <Link to={buttonLink}>
                    <Button>{buttonText}</Button>
                </Link>
            )}
        </div>
    );
}

