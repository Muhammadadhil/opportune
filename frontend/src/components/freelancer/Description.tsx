import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { DescriptionData } from "@/types/IProjectPost";
import { updatePostFormData } from "@/store/slices/freelancerSlice";

export default function Component({ onNext, onPrev }) {
    const [images, setImages] = useState<File[]>([]);
    const [requirements, setRequirements] = useState([""]);

    const { formData } = useSelector((state: RootState) => state.freelancer);
    const dispatch = useDispatch();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
            setValue("images", images);
            
        }
    };

    const addRequirement = async () => {
        if (requirements.length < 3) {
            setRequirements([...requirements, ""]);
            setValue("requirements", requirements);
            await trigger("images");

        }
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        clearErrors,
        trigger,
        formState: { errors },
    } = useForm<DescriptionData>({
        defaultValues: formData,
    });

    const onSubmit = (data: DescriptionData) => {
        console.log("submitting");
        console.log("data:", data);
        dispatch(updatePostFormData(data));
        clearErrors('images');

    };

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
                                        <input
                                            {...register("images", { required: "Select Images" })}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, index)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
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
                                Requirements <span className="text-gray-400 flex justify-end">* optional</span>
                            </Label>
                            <div className="space-y-3">
                                {requirements.map((req, index) => (
                                    <Input
                                        key={index}
                                        placeholder={`Requirement ${index + 1}`}
                                        onChange={(e) => {
                                            const newReqs = [...requirements];
                                            newReqs[index] = e.target.value;
                                            setRequirements(newReqs);
                                        }}
                                    />
                                ))}
                                {requirements.length < 3 && (
                                    <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                                        Add Requirement
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                id="description"
                                placeholder="Write about your work experience"
                                className="min-h-[150px]"
                            />
                            {errors.description && <p className="text-red-700 text-sm">{errors.description.message}</p>}
                        </div>

                        <div className="mb-8">
                            <Label htmlFor="price">Price of your project</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    {...register("price", {
                                        required: "Price is required",
                                    })}
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="pl-8"
                                    placeholder="0.00"
                                />
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
}
