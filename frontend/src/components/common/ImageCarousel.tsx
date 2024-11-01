// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// export function ImageCarousal({array}) {

//     // console.log('array L',array)

//     return (
//         <Carousel className="w-full max-w-[50rem]">
//             <CarouselContent >
//                 {array.map((_, index) => (
//                     <CarouselItem key={index}>
//                         <div className="p-1">
//                             <Card>
//                                 {/* <CardContent className="flex aspect-square items-center justify-center p-6">
//                                     <span className="text-4xl font-semibold">{index + 1}</span>
//                                 </CardContent> */}
//                                 <img src={array[index]} className="w-full h-full object-cover rounded-lg" />
//                             </Card>
//                         </div>
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//         </Carousel>
//     );
// }

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function ImageCarousal({ array }) {
    return (
        <Carousel className="w-full max-w-[50rem]">
            <CarouselContent>
                {array.map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <img src={array[index]} className="w-full h-full object-cover rounded-lg" />
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