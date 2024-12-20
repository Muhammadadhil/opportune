import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosClose } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OverviewData } from "@/types/IProjectPost";
import { RootState } from "@/store/store";
import { updatePostFormData } from "@/store/slices/postSlice";
import { useSelector, useDispatch } from "react-redux";
import KeywordInput from "../common/KeywordInput";
import { getCategories } from "@/api/admin";

interface OverviewProps {
    onNext: () => void;
}

export const PostTitle: React.FC<OverviewProps> = React.memo(({ onNext }) => {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordError, setKeywordError] = useState("");

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const dispatch = useDispatch();
    const { formData } = useSelector((state: RootState) => state.post);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OverviewData>({
        defaultValues: formData,
    });

    const selectedCategoryName = watch("category");

    useEffect(() => {
        const category = categories.find((cat) => cat.name === selectedCategoryName);
        setSubCategories(category?.subCategory || []);
    }, [selectedCategoryName]);

    const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("searchTags", updatedKeywords);
    };

    useEffect(() => {
        setKeywords(formData.searchTags || []);
    }, []);

    const onSubmit = (data: OverviewData) => {
        if (keywords.length === 0) {
            setKeywordError("Please add at least one keyword.");
            return;
        }
        dispatch(updatePostFormData(data));
        onNext();
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-gray-50 p-12 rounded-md">
            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Work Title</h2>
                <p className="text-gray-600">As your Work storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                <h2 className="text-2xl font-bold mb-4 mt-6">Category</h2>
                <p className="text-gray-600">Select a category that best describes your work.</p>
                <h2 className="text-2xl font-bold mb-4 mt-6">Search tags</h2>
                <p className="text-gray-600">Add keywords related to your work to improve discoverability.</p>
            </div>

            <div className="md:w-1/2">
                <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="workTitle" className="block   text-sm font-medium text-gray-700">
                            Work Title
                        </label>
                        <Input
                            id="workTitle"
                            {...register("title", {
                                required: "Work title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" },
                            })}
                            placeholder="I will do something really good at..."
                        />
                        {errors.title && <p className="text-red-700 text-sm text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="flex space-x-4">
                        <div className="md:w-1/2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-52">
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
                            {errors.category && <p className="text-red-700 text-sm">{errors.category.message}</p>}
                        </div>

                        <div className="md:w-1/2">
                            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                                Sub Category
                            </label>
                            <Controller
                                name="subCategory"
                                control={control}
                                rules={{ required: "Sub Category is required" }}
                                render={({ field }) => (
                                    <Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-52">
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
                            {errors.subCategory && <p className="text-red-700 text-sm">{errors.subCategory.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="searchTags" className="block text-sm font-medium text-gray-700">
                            Search Tags
                        </label>
                        <div>
                            <KeywordInput formFieldName="searchTags" keywords={keywords} setKeywords={setKeywords} newKeyword={newKeyword} setNewKeyword={setNewKeyword} setValue={setValue} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-end mr-5">{10 - keywords.length}/10 left</p>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="flex items-center bg-gray-100 text-gray-800 px-4 py-1 rounded">
                                    {keyword}
                                    <IoIosClose className="ml-2 cursor-pointer" onClick={() => removeKeyword(index)} />
                                </span>
                            ))}
                        </div>
                        {errors.searchTags && <p className="text-red-700 text-sm">{errors.searchTags.message}</p>}

                        {keywordError && <p className="text-red-600 text-sm">{keywordError}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button className="bg-green-800 hover:bg-green-900" type="submit">
                            Save & Continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});
