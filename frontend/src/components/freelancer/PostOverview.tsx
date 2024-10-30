import React, { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosClose } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OverviewData } from "@/types/IProjectPost";
import { RootState } from "@/store/store";
import { updatePostFormData } from "@/store/slices/freelancerSlice";
import { useSelector, useDispatch } from "react-redux";

interface OverviewProps {
    onNext: () => void;
}

export const Overview: React.FC<OverviewProps> = React.memo(({ onNext }) => {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordError, setKeywordError] = useState("");

    const dispatch = useDispatch(); 
    const { formData } = useSelector((state: RootState) => state.freelancer);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<OverviewData>({
        defaultValues: formData,
    });

    const addKeyword = useCallback(() => {
        if (newKeyword && keywords.length < 10) {
            setKeywords((prev) => [...prev, newKeyword]);
            setNewKeyword("");
            setValue("keywords", [...keywords, newKeyword]);
        }
    }, [newKeyword, keywords, dispatch, formData]);

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("keywords", updatedKeywords);
    };

    useEffect(() => {
        setKeywords(formData.keywords || []);
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
                            {...register("workTitle", {
                                required: "Work title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" },
                            })}
                            placeholder="I will do something really good at..."
                        />
                        {errors.workTitle && <p className="text-red-700 text-sm text-sm">{errors.workTitle.message}</p>}
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
                            {errors.subCategory && <p className="text-red-700 text-sm">{errors.subCategory.message}</p>}
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
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        e.preventDefault();
                                        addKeyword();
                                    }
                                }}
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
                                    <IoIosClose className="ml-2 cursor-pointer" onClick={() => removeKeyword(index)} />
                                </span>
                            ))}
                        </div>
                        {errors.keywords && <p className="text-red-700 text-sm">{errors.keywords.message}</p>}

                        {keywordError && <p className="text-red-600 text-sm">{keywordError}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button className="" type="submit">
                            Save & Continue
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});

// import React, { useCallback, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { IoIosClose } from "react-icons/io";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { updatePostFormData } from "@/store/slices/freelancerSlice";
// import { RootState } from "@/store/store";

// interface OverviewProps {
//     onNext: () => void;
// }

// export const Overview: React.FC<OverviewProps> = ({ onNext }) => {
//     const [workTitle, setWorkTitle] = useState("");
//     const [category, setCategory] = useState("");
//     const [subCategory, setSubCategory] = useState("");
//     const [newKeyword, setNewKeyword] = useState("");
//     const [keywords, setKeywords] = useState<string[]>([]);
//     const [keywordError, setKeywordError] = useState("");
//     const [errors, setErrors] = useState<{ workTitle?: string; category?: string; subCategory?: string }>({});

//     const dispatch = useDispatch();
//     const { formData } = useSelector((state) => state.freelancer);

//     useEffect(() => {
//         console.log("useEffect in Overview component");
//         console.log("formData from Redux:", formData);

//         setWorkTitle(formData.workTitle || "");
//         setCategory(formData.category || "");
//         setSubCategory(formData.subCategory || "");
//         setKeywords(formData.keywords || []);

//         console.log("State after update:", { workTitle, category, subCategory, keywords });
//     }, []);

//     const addKeyword = useCallback(() => {
//         if (newKeyword && keywords.length < 10) {
//             setKeywords((prev) => [...prev, newKeyword]);
//             setNewKeyword("");
//         }
//     }, [newKeyword, keywords]);

//     const handleKeywordRemove = (index: number) => {
//         setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
//     };

//     const handleValidation = () => {
//         const newErrors: { workTitle?: string; category?: string; subCategory?: string } = {};

//         if (!workTitle) newErrors.workTitle = "Work title is required";
//         else if (workTitle.length < 5) newErrors.workTitle = "Title must be at least 5 characters";

//         if (!category) newErrors.category = "Category is required";
//         if (!subCategory) newErrors.subCategory = "Sub Category is required";
//         if (keywords.length === 0) setKeywordError("Please add at least one keyword.");

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0 && keywords.length > 0;
//     };

//     const handleSubmit = () => {
//         if (handleValidation()) {
//             const data = { workTitle, category, subCategory, keywords };
//             console.log("data:", data);
//             dispatch(updatePostFormData(data));
//             onNext();
//         }
//     };

//     return (
//         <div className="flex flex-col md:flex-row gap-8 bg-gray-50 p-12 rounded-md">
//             <div className="md:w-1/2">
//                 <h2 className="text-2xl font-bold mb-4">Work Title</h2>
//                 <p className="text-gray-600">As your Work storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
//                 <h2 className="text-2xl font-bold mb-4 mt-6">Category</h2>
//                 <p className="text-gray-600">Select a category that best describes your work.</p>
//                 <h2 className="text-2xl font-bold mb-4 mt-6">Search tags</h2>
//                 <p className="text-gray-600">Add keywords related to your work to improve discoverability.</p>
//             </div>

//             <div className="md:w-1/2">
//                 <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
//                     <div>
//                         <label htmlFor="workTitle" className="block text-sm font-medium text-gray-700">
//                             Work Title
//                         </label>
//                         <Input id="workTitle" value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} placeholder="I will do something really good at..." />
//                         {errors.workTitle && <p className="text-red-700 text-sm">{errors.workTitle}</p>}
//                     </div>

//                     <div className="flex space-x-4">
//                         <div className="md:w-1/2">
//                             <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                                 Category
//                             </label>
//                             <Select value={category} onValueChange={(value) => setCategory(value)}>
//                                 <SelectTrigger className="w-52">
//                                     <SelectValue placeholder="Select a Category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Categories</SelectLabel>
//                                         <SelectItem value="a">Apple</SelectItem>
//                                         <SelectItem value="banana">Banana</SelectItem>
//                                         <SelectItem value="blueberry">Blueberry</SelectItem>
//                                         <SelectItem value="grapes">Grapes</SelectItem>
//                                         <SelectItem value="pineapple">Pineapple</SelectItem>
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             {errors.category && <p className="text-red-700 text-sm">{errors.category}</p>}
//                         </div>

//                         <div className="md:w-1/2">
//                             <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
//                                 Sub Category
//                             </label>
//                             <Select value={subCategory} onValueChange={(value) => setSubCategory(value)}>
//                                 <SelectTrigger className="w-52">
//                                     <SelectValue placeholder="Select a Sub Category" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Categories</SelectLabel>
//                                         <SelectItem value="a">Apple</SelectItem>
//                                         <SelectItem value="banana">Banana</SelectItem>
//                                         <SelectItem value="blueberry">Blueberry</SelectItem>
//                                         <SelectItem value="grapes">Grapes</SelectItem>
//                                         <SelectItem value="pineapple">Pineapple</SelectItem>
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>
//                             {errors.subCategory && <p className="text-red-700 text-sm">{errors.subCategory}</p>}
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor="searchTags" className="block text-sm font-medium text-gray-700">
//                             Search Tags
//                         </label>
//                         <div className="flex space-x-2 mb-2">
//                             <Input
//                                 type="text"
//                                 placeholder="Add a keyword"
//                                 value={newKeyword}
//                                 onChange={(e) => setNewKeyword(e.target.value)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") {
//                                         e.preventDefault();
//                                         addKeyword();
//                                     }
//                                 }}
//                             />
//                             <Button type="button" onClick={addKeyword}>
//                                 Add
//                             </Button>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1 text-end mr-5">{10 - keywords.length}/10 left</p>
//                         <div className="flex flex-wrap gap-2">
//                             {keywords.map((keyword, index) => (
//                                 <span key={index} className="flex items-center bg-gray-100 text-gray-800 px-4 py-1 rounded">
//                                     {keyword}
//                                     <IoIosClose className="ml-2 cursor-pointer" onClick={() => handleKeywordRemove(index)} />
//                                 </span>
//                             ))}
//                         </div>
//                         {keywordError && <p className="text-red-600 text-sm">{keywordError}</p>}
//                     </div>

//                     <Button type="button" onClick={handleSubmit}>
//                         Save & Continue
//                     </Button>
//                 </form>
//             </div>
//         </div>
//     );
// };
