import { useState, useEffect } from "react";
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
import KeywordInput from "../common/KeywordInput";
import { getCategories } from "@/api/adminApi";
import { IJob } from "@/types/IJob";
import jobPoststepOneSchema from "@/schemas/jobPoststep1Schema";
import jobPoststepTwoSchema from "@/schemas/jobPoststep2Schema";
import toast from "react-hot-toast";

interface EditJobProps {
    job: IJob;
}

export default function EditJob({ job }: EditJobProps) {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>(job.searchTags);

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const schema = jobPoststepOneSchema.merge(jobPoststepTwoSchema);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IJob>({
        resolver: zodResolver(schema),
    });

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("searchTags", updatedKeywords);
    };

    const selectedCategoryName = watch("category");

    useEffect(() => {
        const category = categories.find((cat) => cat.name === selectedCategoryName);
        console.log("category selected", category);
        setSubCategories(category?.subCategory || []);
    }, [selectedCategoryName]);

    const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (data: IJob) => {
        console.log("job update data :", data);
        try {
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Error In Editing Gig");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Job</Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[425px] md:max-w-[70rem]`}>
                <DialogHeader>
                    <DialogTitle onClick={() => setIsDialogOpen?.(true)}>Edit Job</DialogTitle>
                    <DialogDescription>Make changes to your gig here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" {...register("jobTitle")} />
                                {errors.jobTitle && <p className="text-red-800 text-sm">{errors.jobTitle.message}</p>}
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
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat._id} value={cat?.name}>
                                                            {cat?.name}
                                                        </SelectItem>
                                                    ))}
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
                                                    {subCategories.map((cat) => (
                                                        <SelectItem key={cat._id} value={cat?.name}>
                                                            {cat?.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Budget</Label>
                            <Textarea {...register("budget")} id="budget" placeholder="Write about your work experience" className="min-h-[75px]" />
                            {errors.description && <p className="text-red-800 text-sm">{errors.description.message}</p>}
                        </div>
                        {errors.budget && <p className="text-red-700 text-sm">{errors.budget.message}</p>}

                        <div className="grid gap-2">
                            <Label htmlFor="skillsRequired">Skills Required</Label>

                            <div className="flex gap-2">
                                <KeywordInput formFieldName="skillsRequired" keywords={keywords} setKeywords={setKeywords} newKeyword={newKeyword} setNewKeyword={setNewKeyword} setValue={setValue} />
                            </div>
                            {errors.skillsRequired && <p className="text-red-700 text-sm">{errors.skillsRequired.message}</p>}

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
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
