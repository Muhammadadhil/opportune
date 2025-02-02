import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button1";
import { IoIosClose } from "react-icons/io";
import { BudgetData } from "@/types/IProjectPost";
import { RootState } from "@/store/store";
import { updateJobData } from "@/store/slices/postSlice";
import { useSelector, useDispatch } from "react-redux";
import KeywordInput from "../common/KeywordInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import jobPoststepTwoSchema from "@/schemas/jobPoststep2Schema";

interface OverviewProps {
    handleSubmitForm: () => void;
    onPrev: () => void;
}

export const PostStep2: React.FC<OverviewProps> = React.memo(({ onPrev, handleSubmitForm }) => {
    const [newSearchTag, setNewSearchTag] = useState("");
    const [searchTags, setSearchTags] = useState<string[]>([]);
    const [keywordError, setKeywordError] = useState("");

    const dispatch = useDispatch();
    const { jobData } = useSelector((state: RootState) => state.post);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BudgetData>({
        resolver: zodResolver(jobPoststepTwoSchema),
        defaultValues: jobData,
    });

    const removeKeyword = (index: number) => {
        const updatedSearchTags = searchTags.filter((_, i) => i !== index);
        setSearchTags(updatedSearchTags);
        setValue("searchTags", updatedSearchTags);
    };

    useEffect(() => {
        setSearchTags(jobData.searchTags || []);
    }, []);

    const onSubmit = (data: BudgetData) => {
        if (searchTags.length === 0) {
            setKeywordError("Please add at least one keyword.");
            return;
        }
        dispatch(updateJobData({...jobData,...data}));
        handleSubmitForm();
    };

    return (
        <div className="container flex flex-col md:flex-row gap-8 bg-gray-50 p-12 rounded-md w-[70rem]">
            <div className=" w-full">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-8">
                        <Label htmlFor="description">Description</Label>
                        <Textarea {...register("description")} id="description" placeholder="Write about the work , what will be the roles" className="min-h-[150px]" />
                        {errors.description && <p className="text-red-700 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="mb-8">
                        <Label htmlFor="price">Budget</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input {...register("budget", { valueAsNumber: true })} id="price" type="number" min="0" step="0.01" className="pl-8" placeholder="Your budget " />
                        </div>
                        {errors.budget && <p className="text-red-700 text-sm">{errors.budget.message}</p>}
                    </div>

                    <div className="">
                        <label htmlFor="searchTags" className="block text-sm font-medium text-gray-700">
                            Search Tags
                        </label>
                        <div>
                            <KeywordInput formFieldName="searchTags" keywords={searchTags} setKeywords={setSearchTags} newKeyword={newSearchTag} setNewKeyword={setNewSearchTag} setValue={setValue} />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-end mr-5">{10 - searchTags.length}/10 left</p>
                        <div className="flex flex-wrap gap-2">
                            {searchTags.map((keyword, index) => (
                                <span key={index} className="flex items-center bg-gray-100 text-gray-800 px-4 py-1 rounded">
                                    {keyword}
                                    <IoIosClose className="ml-2 cursor-pointer" onClick={() => removeKeyword(index)} />
                                </span>
                            ))}
                        </div>
                        {errors.searchTags && <p className="text-red-700 text-sm">{errors.searchTags.message}</p>}

                        {keywordError && <p className="text-red-600 text-sm">{keywordError}</p>}
                    </div>

                    <div className="flex justify-between mt-4">
                        <Button variant="outline" onClick={onPrev}>
                            Back
                        </Button>
                        <Button className="bg-green-800 hover:bg-green-900" type="submit">
                            Save & continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});
