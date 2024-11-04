"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { GigCardProps } from "@/types/IGigCard";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import DescriptionDataSchema from "@/schemas/postDescriptoinSchema";
import { overViewSchema } from "@/schemas/postOverviewSchema";


export default function EditGig({
    title = "Modern Flat Design Illustration",
    description = "I will create modern flat design illustration for your project",
    price = 883,
    deliveryTime = "2 days",
    category = "Graphics & Design",
    subcategory = "Illustration",
    searchTags = [],
    requirements = [],
    theme = "light",
    imageUrls,
}: GigCardProps) {
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedPrice, setEditedPrice] = useState(price);
    const [editedDeliveryTime, setEditedDeliveryTime] = useState(deliveryTime);
    const [editedCategory, setEditedCategory] = useState(category);
    const [editedSubcategory, setEditedSubcategory] = useState(subcategory);
    const [editedSearchTags, setEditedSearchTags] = useState(searchTags);
    const [editedRequirements, setEditedRequirements] = useState(requirements);
    const [newTag, setNewTag] = useState("");
    const [newRequirement, setNewRequirement] = useState("");

    const gigSchema = overViewSchema.merge(DescriptionDataSchema);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<GigCardProps>({
        resolver: zodResolver(gigSchema),
        defaultValues: {
            title,
            description,
            price,
            deliveryTime,
            category,
            subcategory,
            searchTags,
            requirements,
            imageUrls,
        },
    });

    const handleAddTag = () => {
        if (newTag && !editedSearchTags.includes(newTag)) {
            setEditedSearchTags([...editedSearchTags, newTag]);
            setNewTag("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setEditedSearchTags(editedSearchTags.filter((t) => t !== tag));
    };

    const handleAddRequirement = () => {
        if (newRequirement && !editedRequirements.includes(newRequirement)) {
            setEditedRequirements([...editedRequirements, newRequirement]);
            setNewRequirement("");
        }
    };

    const handleRemoveRequirement = (req: string) => {
        setEditedRequirements(editedRequirements.filter((r) => r !== req));
    };

    const handleSave = () => {
        console.log("Saving changes:", {
            title: editedTitle,
            description: editedDescription,
            price: editedPrice,
            deliveryTime: editedDeliveryTime,
            category: editedCategory,
            subcategory: editedSubcategory,
            searchTags: editedSearchTags,
            requirements: editedRequirements,
        });
    };

    const handleImageUpload = (event, index) => {};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Gig</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[70rem]">
                <DialogHeader>
                    <DialogTitle>Edit Gig</DialogTitle>
                    <DialogDescription>Make changes to your gig here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className="grid grid-cols-3 gap-4">
                        {imageUrls.map((image, index) => (
                            <div key={index} className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />

                                <div className="relative w-full h-full">
                                    <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg z-10">
                                        <span className="text-white font-medium">Change image</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {errors.images && <p className="text-red-800 text-sm">{errors.images.message}</p>}
                    </div>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" {...register("title")} />
                                {errors.title && <p className="text-red-800 text-sm">{errors.title.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" {...register("price")} />
                                {errors.price && <p className="text-red-800 text-sm">{errors.price.message}</p>}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Textarea {...register("description")} id="description" placeholder="Write about your work experience" className="min-h-[75px]" />
                            {errors.description && <p className="text-red-800 text-sm">{errors.description.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    <SelectItem value="a">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="subcategory">Subcategory</Label>
                                <Controller
                                    name="subcategory"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the Sub Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    <SelectItem value="a">Apple</SelectItem>
                                                    <SelectItem value="banana">Banana</SelectItem>
                                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                                    <SelectItem value="grapes">Grapes</SelectItem>
                                                    <SelectItem value="pineapple">Pineapple</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="deliveryTime">Work Delivery time period (Day)</Label>

                            {/* <Input id="deliveryTime" value={editedDeliveryTime} onChange={(e) => setEditedDeliveryTime(e.target.value)} /> */}
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select delivery time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 day</SelectItem>
                                    <SelectItem value="2">2 days</SelectItem>
                                    <SelectItem value="3">3 days</SelectItem>
                                    <SelectItem value="7">1 week</SelectItem>
                                    <SelectItem value="14">2 weeks</SelectItem>
                                    <SelectItem value="30">1 month</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            {/* <Controller
                            name="deliveryTime"
                            // control={control}
                            rules={{ required: "Delivery time is required" }}
                            render={({ field }) => (
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select delivery time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 day</SelectItem>
                                        <SelectItem value="2">2 days</SelectItem>
                                        <SelectItem value="3">3 days</SelectItem>
                                        <SelectItem value="7">1 week</SelectItem>
                                        <SelectItem value="14">2 weeks</SelectItem>
                                        <SelectItem value="30">1 month</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        /> */}
                            {/* {errors.deliveryTime && <p className="text-red-700 text-sm">{errors.deliveryTime.message}</p>} */}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="searchTags">Search Tags</Label>

                            <div className="flex gap-2">
                                <Input id="newTag" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add new tag" />
                                <Button onClick={handleAddTag}>Add</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {editedSearchTags.map((tag) => (
                                    <div key={tag} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {tag}
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => handleRemoveTag(tag)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="requirements">Requirements</Label>

                            <div className="flex gap-2">
                                <Input id="newRequirement" value={newRequirement} onChange={(e) => setNewRequirement(e.target.value)} placeholder="Add new requirement" />
                                <Button onClick={handleAddRequirement}>Add</Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                {editedRequirements.map((req) => (
                                    <div key={req} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {req}
                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto" onClick={() => handleRemoveRequirement(req)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
