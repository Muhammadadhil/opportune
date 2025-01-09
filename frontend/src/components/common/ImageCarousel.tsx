
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type ImageCarousal = {
    array: string[] | File[];
};

export function ImageCarousal({ array }: ImageCarousal) {

    return (
        <Carousel className="w-full max-w-[50rem]">
            <CarouselContent>
                {array.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <img
                                    src={typeof image == "string" ? image : image instanceof File ? URL.createObjectURL(image) : ""}
                                    className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                                />
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious /> */}
            {/* <CarouselNext /> */}
        </Carousel>
    );
}
