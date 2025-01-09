// import React from "react";
// import { useSelector } from "react-redux";
// import { ImageCarousal } from "../common/ImageCarousel";
// import { RootState } from "@/store/store";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";

// interface IPublishProps {
//     onPrev: () => void;
//     handleSubmit: () => void;
// }

// const PreviewPortfolio: React.FC<IPublishProps> = React.memo(({ onPrev, handleSubmit }) => {
//     const { portfolioData } = useSelector((state: RootState) => state.post);

//     return (
//         <div className="bg-gray-50 p-4 md:p-8 lg:p-12 rounded-lg">
//             <div className="max-w-4xl ">
//                 <h1 className="text-3xl font-bold mb-8">Preview</h1>

//                 <div className="overflow-hidden flex flex-col">
//                     <div className="p-0">
//                         {/* Image Carousel */}
//                         <div className="relative w-full flex items-center justify-center">
//                             <div className="aspect-[16/9]">
//                                 <ImageCarousal array={portfolioData?.images} />
//                             </div>
//                             {/* Navigation Arrows */}
//                             <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70">
//                                 <ChevronLeft className="w-6 h-6" />
//                             </Button>
//                             <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70">
//                                 <ChevronRight className="w-6 h-6" />
//                             </Button>
//                         </div>

//                         <div className="p-6 space-y-8">
//                             {/* Title and Description */}
//                             <div>
//                                 <h2 className="text-2xl font-semibold mb-2">{portfolioData?.title}</h2>
//                                 <p className="text-muted-foreground">{portfolioData.description}</p>
//                             </div>

//                             {/* Service Details */}
//                             <div className="grid md:grid-cols-3 gap-8">
//                                 <div className="md:col-span-2 space-y-6">
//                                     {/* Description */}
//                                     <div>
//                                         <h3 className="text-xl font-semibold mb-2">Description</h3>
//                                         <p className="text-muted-foreground whitespace-pre-wrap">{portfolioData.description || "No description provided"}</p>
//                                     </div>

//                                     {/* Tags */}
//                                     {portfolioData.skills?.length > 0 && (
//                                         <div>
//                                             <h3 className="text-xl font-semibold mb-2">Skills</h3>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {portfolioData.skills.map((skill, index) => (
//                                                     <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
//                                                         <Tag className="w-4 h-4" />
//                                                         {skill}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between mt-8">
//                     <Button variant="outline" onClick={onPrev}>
//                         Back
//                     </Button>
//                     <Button variant="default" className="bg-green-700 hover:bg-green-800" onClick={handleSubmit}>
//                         Save & Publish
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// });


// export default PreviewPortfolio;
