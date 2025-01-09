import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosClose } from "react-icons/io";
import { portfolioData } from "@/types/IProjectPost";
import KeywordInput from "../common/KeywordInput";
import { motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { savePortfolio } from "@/api/gigs";
import { getUploadSignedUrl } from "@/api/user";
import axios from "axios";

export const PostPortFolio: React.FC = React.memo(() => {
    const [newKeyword, setNewKeyword] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordError, setKeywordError] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<portfolioData>();


    console.log('error hook form:',errors);

    const removeKeyword = (index: number) => {
        const updatedKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(updatedKeywords);
        setValue("skills", updatedKeywords);
    };

    const onSubmit = async (data: portfolioData) => {

        console.log('data for upload :',data)

        if (keywords.length === 0) {
            setKeywordError("Add atleast one skill ");
            return;
        }

        const files = data.images;

        const uploadPromises = files.map( async (file)=> {
            const presignedData = await getUploadSignedUrl(file.name, file.type);
            console.log('presignedData:',presignedData);

            await axios.put(presignedData.url, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });

            return presignedData.fileKey
        })

        console.log("uploadPromises:", uploadPromises);

        const imageFileKeys = await Promise.all(uploadPromises);

        // const finalData = {...data,images:}

        try {
            const response = await savePortfolio(data);
            console.log("portfolio Response:", response);
            navigate("/fr/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error in saving project");
        }

        // use the data for submit
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            // const base64: string = (await fileToBase64(file)) as string;
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
            setValue("images", newImages);
        }
    };

    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="container mx-auto px-4 py-8 md:py-12">
            <div className="bg-gray-50 p-4 md:p-8 rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">Portfolio Project</h1>
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                    {/* Images */}
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 mb-4">Showcase Your Services in a Work Gallery</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className="h-52 border-2 border-dashed rounded-lg flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition-colors group">
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                    {images[index] ? (
                                        <div className="relative w-full h-full">
                                            <img src={URL.createObjectURL(images[index])} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg z-10">
                                                <span className="text-white font-medium">Change image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <ImagePlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                            <span className="text-sm text-gray-500">Upload Image</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.images && <p className="text-red-700 text-sm mt-2">{errors.images.message}</p>}
                    </div>

                    {/* Project Title */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-zinc-700">Project Title</h2>
                        <Input
                            id="workTitle"
                            {...register("title", {
                                required: "Work title is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters" },
                            })}
                            placeholder="A brief about this project"
                            className="w-full md:w-[40rem]"
                        />
                        {errors.title && <p className="text-red-800 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Project Description */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-zinc-700">Project Description</h2>
                        <Textarea
                            id="workDescription"
                            {...register("description", {
                                required: "Description is required",
                                minLength: { value: 15, message: "Description must be at least 15 characters" },
                            })}
                            placeholder="Briefly describe the project's goals, your solution and impact you made"
                            className="min-h-[100px]"
                        />
                        {errors.description && <p className="text-red-800 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Skills & Deliverables */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-zinc-700">Skills & Deliverables</h2>
                        <div className="max-w-full md:max-w-[40rem]">
                            <KeywordInput
                                placeholder="Add skills relevant to this project"
                                formFieldName="skills"
                                keywords={keywords}
                                setKeywords={setKeywords}
                                newKeyword={newKeyword}
                                setNewKeyword={setNewKeyword}
                                setValue={setValue}
                            />
                            <p className="text-sm text-gray-500 mt-1 text-end mr-5">{10 - keywords.length}/10 left</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {keywords.map((keyword, index) => (
                                <span key={index} className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                                    {keyword}
                                    <IoIosClose className="ml-1 cursor-pointer" onClick={() => removeKeyword(index)} />
                                </span>
                            ))}
                        </div>
                        {keywordError && <p className="text-red-800 text-sm mt-1">{keywordError}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button className="bg-green-800 hover:bg-green-900" type="submit">
                            Save & Continue
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
});
