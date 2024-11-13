import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import KeywordInput from "../common/KeywordInput";
import { getCategories } from "@/api/adminApi";
import { IJob } from "@/types/IJob";
import jobPoststepOneSchema from "@/schemas/jobPoststep1Schema";
import jobPoststepTwoSchema from "@/schemas/jobPoststep2Schema";
import toast from "react-hot-toast";
import { ReactSetState } from "@/types/ReactSetState";
import { Pencil } from "lucide-react";
import { ICategory, ISubCategory } from "@/types/ICategory";
import { useEditJob } from "@/hooks/jobs/useEditJob";

interface EditJobProps {
    job: IJob;
    isDialogOpen: boolean;
    setIsDialogOpen: ReactSetState<boolean>;
}

export default function EditJob({ job, isDialogOpen, setIsDialogOpen }: EditJobProps) {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>(job.searchTags);
    const [skillsRequired, setSkillsRequired] = useState<string[]>(job.skillsRequired);
    const [newskill, setNewSkill] = useState("");

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>(job.subCategory ? [{ _id: "", name: job.subCategory }] : []);

    const editJobMutation = useEditJob();

    const handleEditJob = async (jobData: IJob) => {
        await editJobMutation.mutateAsync(jobData);
    };

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
        defaultValues: {
            clientId: job.clientId,
            jobTitle: job.jobTitle,
            description: job.description,
            category: job.category,
            subCategory: job.subCategory,
            budget: job.budget,
            skillsRequired: job.skillsRequired,
            searchTags: job.searchTags,
        },
    });

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("searchTags", updatedKeywords);
    };

    const removeSkills = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setSkillsRequired(updatedKeywords);
        setValue("skillsRequired", updatedKeywords);
    };

    const selectedCategoryName = watch("category");

    useEffect(() => {
        const category = categories.find((cat) => cat.name === selectedCategoryName);
        if (category?.subCategory) setSubCategories(category.subCategory || job.subCategory);
    }, [selectedCategoryName]);

    const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (data: IJob) => {
        try {
            data._id = job._id;
            // console.log("job update data :", data);
            // await editJob(data);
            await handleEditJob(data);
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Error In Editing Gig");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Pencil size={16} />
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[425px] md:max-w-[70rem]`}>
                <DialogHeader>
                    <DialogTitle onClick={() => setIsDialogOpen?.(true)}>Edit Job</DialogTitle>
                    <DialogDescription>Make changes to your job here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <Input id="jobTitle" {...register("jobTitle")} />
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
                        <div className="grid gap-2 max-w-[200px]">
                            <Label htmlFor="budget">Budget</Label>
                            <Input type="number" id="budget" {...register("budget")} />
                            {errors.budget && <p className="text-red-800 text-sm">{errors.budget.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="skillsRequired">Skills Required</Label>

                            <div className="flex gap-2">
                                <KeywordInput
                                    formFieldName="skillsRequired"
                                    keywords={skillsRequired}
                                    setKeywords={setSkillsRequired}
                                    newKeyword={newskill}
                                    setNewKeyword={setNewSkill}
                                    setValue={setValue}
                                />
                            </div>
                            {errors.skillsRequired && <p className="text-red-700 text-sm">{errors.skillsRequired.message}</p>}

                            <div className="flex flex-wrap gap-2">
                                {skillsRequired.map((keyword, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {keyword}
                                        <button type="button" onClick={() => removeSkills(index)}>
                                            <X className="h-3 w-3" />
                                        </button>
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
                        <Button  disabled={editJobMutation.isPending}>
                            {editJobMutation.isPending ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
