
import * as React from "react";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ImageCarousal({ array }) {
    return (
        <Carousel className="w-full max-w-[50rem]">
            <CarouselContent>
                {array.map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <img src={URL.createObjectURL(array[index])} className="w-full h-full object-cover rounded-lg" />
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}