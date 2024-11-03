import { Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageCarousal } from "@/components/common/ImageCarousel";

interface GigCardProps {
    title: string;
    description: string;
    deliveryTime: string;
    price: number;
    category: string;
    subcategory: string;
    rating?: number;
    reviews?: number;
    theme?: string;
    imageUrls:string[];
}

const GigCard: React.FC<GigCardProps> = ({
    title = "Modern Flat Design Illustration",
    description = "I will create modern flat design illustration for your project",
    deliveryTime = "2 days delivery",
    price = 883,
    category = "Graphics & Design",
    subcategory = "Illustration",
    rating,
    reviews,
    theme,
    imageUrls,
}) => {

    console.log('imageUrls:',imageUrls);

    return (
        <Card className={`max-w-64 overflow-hidden group ${theme == "dark" ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
            <div className="relative aspect-[2/1] overflow-hidden">
                {/* <Image src={imageUrl} alt={title} className="object-cover transition-transform group-hover:scale-105" fill /> */}
                <ImageCarousal array={imageUrls} />
                <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full hover:bg-gray-100">
                    <Heart className="w-4 h-4" />
                </button>
            </div>
            <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">{title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                </div>

                {rating && reviews && (
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{rating}</span>
                        <span className="text-muted-foreground">({reviews}+)</span>
                    </div>
                )}

                <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                        <Badge variant="secondary">{category}</Badge>
                        <Badge variant="outline">{subcategory}</Badge>
                    </div>
                    <p className="text-muted-foreground">{deliveryTime}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Starting at</span>
                    <span className="font-semibold">₹{price}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default GigCard;