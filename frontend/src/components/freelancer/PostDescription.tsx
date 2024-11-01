import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { DescriptionData } from "@/types/IProjectPost";
import { updatePostFormData } from "@/store/slices/freelancerSlice";
import DescriptionDataSchema from "@/schemas/postDescriptoinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileToBase64 } from "@/helpers/Base64";
import { IoIosClose } from "react-icons/io";
import { RootState } from "@/store/store";

interface IDescriptionProps {
    onPrev: () => void;
    onNext: () => void;
}

export const PostDescription: React.FC<IDescriptionProps> = React.memo(({ onNext, onPrev }) => {
    const [images, setImages] = useState<string[]>([]);
    const [requirements, setRequirements] = useState([""]);

    const { formData } = useSelector((state: RootState) => state.post);

    const dispatch = useDispatch();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        // console.log("Image index:", index);
        if (file) {
            const base64: string = (await fileToBase64(file)) as string;
            const newImages = [...images];
            newImages[index] = base64;
            setImages(newImages);
            // console.log("New: images array?:", newImages);
            setValue("images", newImages);
            dispatch(updatePostFormData({ ...formData, images: newImages }));
        }
    };

    useEffect(() => {
        setImages(formData?.images);
        setRequirements(formData?.requirements);
    }, []);

    const addRequirement = async () => {
        if (requirements.length < 3) {
            setRequirements([...requirements, ""]);
            setValue("requirements", requirements);
        }
    };
    const deleteRequirement = (index: number) => {
        const updatedReq = requirements.filter((_, i) => i !== index);
        setRequirements(updatedReq);
        setValue("requirements", updatedReq);
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<DescriptionData>({
        resolver: zodResolver(DescriptionDataSchema),
        defaultValues: formData,
    });

    console.log("Error from react-hook-form:", errors);

    const onSubmit = (data: DescriptionData) => {
        dispatch(updatePostFormData({ ...formData, images: data.images, deliveryTime: data.deliveryTime, description: data.description, price: data.price, requirements: requirements }));
        onNext();
    };

    console.log("formData.images?.[index]:", formData.images?.[0]);

    return (
        <div className="flex flex-col gap-8 bg-gray-50 p-12 rounded-md">
            <div className=" mx-auto md:w-[62rem] ">
                <h1 className="text-2xl font-semibold mb-6">Description and pricing</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 ">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 mb-4">Showcase Your Services in a Work Gallery</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[0, 1, 2].map((index) => (
                                    <div key={index} className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center relative bg-gray-50 hover:bg-gray-100 transition-colors group">
                                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                        {images[index] || formData.images?.[index] ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={formData.images?.[index] ? formData.images?.[index] : images[index]}
                                                    alt={`Upload ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
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
                                {errors.images && <p className="text-red-700 text-sm">{errors.images.message}</p>}
                            </div>
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="delivery">Work Delivery time period (Day)</Label>

                            <Controller
                                name="deliveryTime"
                                control={control}
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
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.deliveryTime && <p className="text-red-700 text-sm">{errors.deliveryTime.message}</p>}
                        </div>

                        <div className="mb-8">
                            <Label className="">
                                Requirements <span className="text-gray-400 m-5"> * optional</span>
                            </Label>
                            <div className="space-y-3">
                                {requirements.map((req, index) => (
                                    <div key={index} className="flex items-center">
                                        <Input
                                            className="flex-1" // Allow input to take available space
                                            placeholder={`Requirement ${index + 1}`}
                                            value={req}
                                            onChange={(e) => {
                                                const newReqs = [...requirements];
                                                newReqs[index] = e.target.value;
                                                setRequirements(newReqs);
                                            }}
                                        />
                                        <IoIosClose
                                            className="ml-2 cursor-pointer text-gray-500 text-2xl hover:text-gray-800"
                                            onClick={() => deleteRequirement(index)} // Fix to delete the specific index
                                        />
                                    </div>
                                ))}

                                {requirements.length < 3 && (
                                    <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                                        Add New Requirement
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="description">Description</Label>
                            <Textarea {...register("description")} id="description" placeholder="Write about your work experience" className="min-h-[150px]" />
                            {errors.description && <p className="text-red-700 text-sm">{errors.description.message}</p>}
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="price">Price of your project</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input {...register("price")} id="price" type="number" min="0" step="0.01" className="pl-8" placeholder="0.00" />
                            </div>
                            {errors.price && <p className="text-red-700 text-sm">{errors.price.message}</p>}
                            <p className="text-sm text-gray-500 mt-1">Specify the price you'll charge for the work</p>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={onPrev}>
                                Back
                            </Button>
                            <Button className="bg-green-800 hover:bg-green-900" type="submit">
                                Save & continue
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});
