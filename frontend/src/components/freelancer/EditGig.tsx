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
import KeywordInput from "../common/KeywordInput";

export default function EditGig({
    _id,
    title,
    description,
    price,
    deliveryTime,
    category,
    subCategory,
    searchTags,
    images,
    imageUrls,
    requirements,
    theme = "light",
    handleSave,
    isDialogOpen,
    setIsDialogOpen,    
}: GigCardProps) {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>(searchTags);

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
            _id,
            title,
            description,
            price,
            deliveryTime,
            category,
            subCategory,
            searchTags,
            requirements,
            images,
        },
    });

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("searchTags", updatedKeywords);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0];

        if (file) {
            images[index] = file;
            setValue("images", images);
        }
        console.log("images Array:", images);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Gig</Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[425px] md:max-w-[70rem] ${theme === "dark" ? " text-white" : " text-gray-900"}`}>
                <DialogHeader>
                    <DialogTitle onClick={() => setIsDialogOpen?.(true)}>Edit Gig</DialogTitle>
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
                            <Label htmlFor="description">Description</Label>
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
                                <Label htmlFor="subcategory">Sub Category</Label>
                                <Controller
                                    name="subCategory"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the Sub Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Sub categories</SelectLabel>
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
                            <Controller
                                name="deliveryTime"
                                control={control}
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
                            />
                            {errors.deliveryTime && <p className="text-red-700 text-sm">{errors.deliveryTime.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="searchTags">Search Tags</Label>

                            <div className="flex gap-2">
                                <KeywordInput formFieldName="searchTags" keywords={keywords} setKeywords={setKeywords} newKeyword={newKeyword} setNewKeyword={setNewKeyword} setValue={setValue} />
                            </div>
                            {errors.searchTags && <p className="text-red-700 text-sm">{errors.searchTags.message}</p>}

                            <div className="flex flex-wrap gap-2">
                                {keywords.map((keyword, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {keyword}
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => removeKeyword(index)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="grid gap-2">
                            <Label htmlFor="requirements">Requirements</Label>

                            <div className="flex gap-2">
                                <Input id="newRequirement" placeholder="Add new requirement" {...register("requirements")} />
                                <Button onClick={handleAddRequirement}>Add</Button>
                            </div>
                            {errors.requirements && <p className="text-red-700 text-sm">{errors.requirements.message}</p>}

                            <div className="flex flex-col gap-2">
                                {requirements.map((req) => (
                                    <div key={req} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {req}
                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto" onClick={() => handleRemoveRequirement(req)}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div> */}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
