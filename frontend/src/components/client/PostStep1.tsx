import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button1";
import { Input } from "@/components/ui/input";
import { IoIosClose } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TitleData } from "@/types/IProjectPost";
import { RootState } from "@/store/store";
import { updateJobData } from "@/store/slices/postSlice";
import { useSelector, useDispatch } from "react-redux";
import KeywordInput from "../common/KeywordInput";
import { getCategories } from "@/api/admin";
import { ICategory, ISubCategory } from "@/types/ICategory";

interface OverviewProps {
    onNext: () => void;
}

export const PostStep1: React.FC<OverviewProps> = React.memo(({ onNext }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
    
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordError, setKeywordError] = useState("");

    const dispatch = useDispatch();
    const { jobData } = useSelector((state: RootState) => state.post);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TitleData>({
        defaultValues: jobData,
    });

    const selectedCategoryName = watch("category");

    useEffect(() => {
        const category = categories.find((cat) => cat.name === selectedCategoryName);
        console.log('category selected',category);
        setSubCategories(category?.subCategory || []);
    }, [selectedCategoryName]);

    const removeSkills = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("skillsRequired", updatedKeywords);
    };

    const fetchCategories = async () => {
        const categories = await getCategories();
        // console.log("categories fetched:", categories.data);
        setCategories(categories.data);
    };

    useEffect(() => {
        setKeywords(jobData.skillsRequired || []);
        fetchCategories();
    }, []);

    const onSubmit = (data: TitleData) => {
        if (keywords.length === 0) {
            setKeywordError("Please add at least one keyword.");
            return;
        }
        dispatch(updateJobData(data));
        onNext();
    };

    console.log("subCategories:", subCategories);

    return (
        <div className="container flex flex-col md:flex-row gap-8 bg-gray-50 p-12 rounded-md w-[70rem]">
            <div className=" w-full">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-bold">Work Title</h2>
                    <p className="text-gray-600 mb-4">
                        As your Work storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.
                    </p>
                    <div className="">
                        <Input
                            id="workTitle"
                            {...register("jobTitle", {
                                required: "Work title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" },
                            })}
                            placeholder="Requirement for graphic designing .."
                            className="w-full"
                        />
                        {errors.jobTitle && <p className="text-red-700 text-sm mt-1">{errors.jobTitle.message}</p>}
                    </div>

                    <div className="space-y-4 ">
                        <h2 className="text-2xl font-bold">Category</h2>
                        <p className="text-gray-600 mb-4">Select a category that best describes the work.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: "Category is required" }}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
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
                                {errors.category && <p className="text-red-700 text-sm mt-1">{errors.category.message}</p>}
                            </div>

                            <div>
                                <Controller
                                    name="subCategory"
                                    control={control}
                                    rules={{ required: "Sub Category is required" }}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Sub Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
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
                                {errors.subCategory && <p className="text-red-700 text-sm mt-1">{errors.subCategory.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h2 className="text-2xl font-bold mb-4">Skills Required</h2>
                        <p className="text-gray-600 mb-4">what are the skills needed for your work.</p>

                        <KeywordInput formFieldName="skillsRequired" keywords={keywords} setKeywords={setKeywords} newKeyword={newKeyword} setNewKeyword={setNewKeyword} setValue={setValue} />

                        <p className="text-sm text-gray-500 mt-1 text-end">{10 - keywords.length}/10 left</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="flex items-center bg-gray-100 text-gray-800 px-4 py-1 rounded">
                                    {keyword}
                                    <IoIosClose className="ml-2 cursor-pointer" onClick={() => removeSkills(index)} />
                                </span>
                            ))}
                        </div>
                        {keywordError && <p className="text-red-600 text-sm mt-1">{keywordError}</p>}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button className="bg-green-800 hover:bg-green-900" type="submit">
                            Save & Continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});
