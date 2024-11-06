"use client";

import React from "react";
import { useSelector } from "react-redux";
import { ImageCarousal } from "../common/ImageCarousel";
import { RootState } from "@/store/store";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";

interface IPublishProps {
    onPrev: () => void;
    handleSubmit: () => void;
}

const Description: React.FC<IPublishProps> = React.memo(({ onPrev, handleSubmit }) => {
        const { formData } = useSelector((state: RootState) => state.post);


    return (
        <div className="flex flex-col gap-8 bg-gray-50 p-12 rounded-md">
            <div className=" mx-auto md:w-[62rem] ">
                <h1 className="text-2xl font-semibold mb-6">Preview</h1>

                <div>
                    <CardContent className="p-6 space-y-8">
                        {/* Title */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{formData?.workTitle}</h2>
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <span>{formData.category}</span>
                                {formData.subCategory && (
                                    <>
                                        <span>›</span>
                                        <span>{formData.subCategory}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Image Carousel */}
                        <div className="relative w-full max-w-3xl mx-auto">
                            <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                                <ImageCarousal array={formData?.images} />
                            </div>
                            {/* Navigation Arrows */}
                            <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Service Details */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-6">
                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{formData.description || "No description provided"}</p>
                                </div>

                                {/* Requirements */}
                                {/* {formData.requirements?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                            {formData.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}

                                {/* Tags */}
                                {formData.searchTags?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.searchTags.map((keyword, index) => (
                                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                    <Tag className="w-3 h-3" />
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Price */}
                                <div className="bg-muted p-4 rounded-lg">
                                    <div className="text-sm text-muted-foreground mb-1">Starting at</div>
                                    <div className="text-2xl font-bold">₹{formData.price || "0"}</div>
                                </div>

                                {/* Delivery Time */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span>{formData.deliveryTime || "1"} day delivery</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button className="px-4 py-1 border rounded-md hover:bg-gray-50" onClick={onPrev}>
                        Back
                    </button>
                    <button className="px-4 py-1 text-white rounded-md bg-green-800 hover:bg-green-900" onClick={handleSubmit}>
                        Save & Publish
                    </button>
                </div>
            </div>
        </div>
    );
});

Description.displayName = "Description";

export default Description;
