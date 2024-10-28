import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosClose } from "react-icons/io";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OverviewProps {
    onNext: (data: OverviewData) => void;
}

export interface OverviewData {
    workTitle: string;
    category: string;
    subCategory: string;
    searchTags: string;
    keywords: string[];
}

// Zod schema for validation
const schema = z.object({
    workTitle: z.string().min(3, "Work Title must be at least 3 characters long"),
    category: z.string().nonempty("Category is required"),
    subCategory: z.string().nonempty("Sub Category is required"),
    searchTags: z.string(),
    keywords: z.array(z.string()).min(1,'Keywords is required').max(10, "You can add a maximum of 10 keywords"),
});

export default function Overview({ onNext }: OverviewProps) {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<OverviewData>({
        resolver: zodResolver(schema),
        defaultValues: {
            workTitle: "",
            category: "",
            subCategory: "",
            searchTags: "",
            keywords: [],
        },
    });

    const onSubmit = (data: OverviewData) => {

        console.log('data:',data)
        onNext(data);


    };

    const addKeyword = () => {
        if (newKeyword && keywords.length < 10) {
            setKeywords((prev) => [...prev, newKeyword]);
            setNewKeyword("");
            setValue("keywords", [...keywords, newKeyword]); 
        }
    };

    return (
        <div className="max-w-[70rem] mx-auto mt-12">
            <h1 className="text-xl font-bold sm:text-xl md:text-2xl text-gray-800 mb-10">Overview</h1>
            <div className="flex flex-col md:flex-row gap-8 bg-gray-50 p-12 rounded-md">
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Work Title</h2>
                    <p className="text-gray-600">
                        As your Work storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.
                    </p>
                    <h2 className="text-2xl font-bold mb-4 mt-6">Category</h2>
                    <p className="text-gray-600">Select a category that best describes your work.</p>
                    <h2 className="text-2xl font-bold mb-4 mt-6">Search tags</h2>
                    <p className="text-gray-600">Add keywords related to your work to improve discoverability.</p>
                </div>

                <div className="md:w-1/2">
                    <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="workTitle" className="block text-sm font-medium text-gray-700">
                                Work Title
                            </label>
                            <Input id="workTitle" {...register("workTitle")} placeholder="I will do something really good at..."  />
                            {errors.workTitle && <p className="text-red-600 text-sm text-sm">{errors.workTitle.message}</p>}
                        </div>

                        <div className="flex space-x-4">
                            <div className="md:w-1/2">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange} required>
                                            <SelectTrigger className="w-52">
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
                                {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
                            </div>

                            <div className="md:w-1/2">
                                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                                    Sub Category
                                </label>
                                <Controller
                                    name="subCategory"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} onValueChange={field.onChange} required>
                                            <SelectTrigger className="w-52">
                                                <SelectValue placeholder="Select a Sub Category" />
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
                                {errors.subCategory && <p className="text-red-600 text-sm">{errors.subCategory.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="searchTags" className="block text-sm font-medium text-gray-700">
                                Search Tags
                            </label>
                            <div className="flex space-x-2 mb-2">
                                <Input
                                    type="text"
                                    placeholder="Add a keyword"
                                    value={newKeyword}
                                    onChange={(e) => setNewKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                                />
                                <Button type="button" onClick={addKeyword}>
                                    Add
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 text-end mr-5">{10 - keywords.length}/10 left</p>
                            <div className="flex flex-wrap gap-2">
                                {keywords.map((keyword, index) => (
                                    <span key={index} className="flex items-center bg-gray-100 text-gray-800 px-4 py-1 rounded">
                                        {keyword}
                                        <IoIosClose
                                            className="ml-2 cursor-pointer"
                                            onClick={() => {
                                                const updatedKeywords = keywords.filter((_, i) => i !== index);
                                                setKeywords(updatedKeywords);
                                                setValue("keywords", updatedKeywords);
                                            }}
                                        />
                                    </span>
                                ))}
                            </div>
                            {errors.keywords && <p className="text-red-600 text-sm">{errors.keywords.message}</p>}
                        </div>

                        <Button type="submit">Save & Continue</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
