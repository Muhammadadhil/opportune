import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profilePicture from "@/assets/profilePicture.jpg";
import { IoIosClose } from "react-icons/io";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { completeProfle } from "@/api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoadingSpinner from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const completeProfileSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Maximum 50 characters allowed" }),
    skills: z.array(z.string()).min(1, { message: "At least one skill is required" }).max(10, { message: "No more than 10 skills" }),
    accounts: z.object({
        linkedin: z.string().url({ message: "Must be a valid URL" }).optional(),
        github: z.string().url({ message: "Must be a valid URL" }).optional(),
        other: z.string().url({ message: "Must be a valid URL" }).optional(),
    }),
    image: z
        .instanceof(File)
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), { message: "File must be a valid image (jpg or png)" })
        .optional(),
});


type CompleteProfileForm = z.infer<typeof completeProfileSchema>;

const CompleteProfile = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CompleteProfileForm>({ resolver: zodResolver(completeProfileSchema) });

    const [image, setImage] = useState<File | string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");
    const { userInfo } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    // const [showPortfolioInputs, setShowPortfolioInputs] = useState(false);

    const addSkill = () => {
        if (newSkill && skills.length < 10) {
            const updatedSkills = [...skills, newSkill];
            setSkills(updatedSkills);
            setNewSkill("");
            setValue("skills", updatedSkills);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // setImage(URL.createObjectURL(e.target.files[0])); //?URL is the global object provided by browser : part of webapi
            setImage(e.target.files[0]);
            setValue("image", e.target.files[0]);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("image", data.image);
            formData.append("title", data.title);
            formData.append("skills", JSON.stringify(data.skills));
            formData.append("accounts", JSON.stringify(data.accounts));
            formData.append("userId", JSON.stringify(userInfo?._id));

            setIsLoading(true);
            const response = await completeProfle(formData);
            console.log('response: complete profile:',response);

            setIsLoading(false);
            navigate(-1);
        } catch (error) {
            console.log("error in complete-profile:", error);
        }
    };

    return (
        <div className=" md:max-w-[1100px] md:mx-auto p-6 rounded-lg ">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className="flex justify-center py-2 rounded-t-lg">
                        <h2 className="text-xl font-bold">Complete your profile</h2>
                    </div>

                    <form className="space-y-6  mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="font-bold text-slate-800 mb-2">Add Profile Image</h2>
                        <div className="flex justify-center">
                            <div className="relative w-52">
                                <input type="file" id="imageInput" {...register("image")} hidden accept="image/*" onChange={handleImageChange} />
                                <img
                                    src={typeof image === "string" ? profilePicture : URL.createObjectURL(image)}
                                    alt="Profile"
                                    className="shadow-sm w-44 md:w-52 rounded-full mr-4 bg-gray-100 object-cover"
                                />
                                <label
                                    htmlFor="imageInput"
                                    className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 rounded-full transition-opacity"
                                >
                                    Add image
                                </label>
                            </div>
                        </div>
                        <div>{errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}</div>

                        <div>
                            <h2 className="font-bold text-slate-800 mb-2">Title / Description</h2>
                            <Textarea {...register("title")} placeholder="Describe your professional title and a brief description." className=" md:w-[40rem]" maxLength={50} />
                            <p className="text-sm text-gray-500 mt-1">Maximum 50 words</p>
                            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                        </div>

                        {/* Skills Section */}
                        <div>
                            <h2 className="font-bold text-slate-800 mb-2">Skills</h2>
                            <div className="flex space-x-2 mb-2">
                                <Input
                                    type="text"
                                    placeholder="Add a skill"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => (e.key == "Enter" ? addSkill() : "")}
                                    className="w-[30rem]"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="flex items-center  bg-gray-200 text-gray-800 px-4 py-1 rounded">
                                        {skill}
                                        {"  "}
                                        <span
                                            className="flex justify-end text-2xl"
                                            onClick={() => {
                                                setSkills(skills.filter((item) => item != skill));
                                            }}
                                        >
                                            <IoIosClose />
                                        </span>
                                    </span>
                                ))}
                                <p className="text-sm text-gray-500 mt-1 justify-end">{10 - skills.length}/10 left</p>
                            </div>
                            {errors.skills && <p className="text-red-500 text-xs">{errors.skills.message}</p>}
                        </div>

                        {/* Portfolio Section */}
                        {/* <div>
                        <h2 className="font-bold text-slate-800 mb-2">Portfolio</h2>
                        <Button onClick={() => setShowPortfolioInputs(!showPortfolioInputs)}>{showPortfolioInputs ? "Hide Portfolio Inputs" : "Add Portfolio Item"}</Button>
                        {showPortfolioInputs && (
                            <div className="mt-4 space-y-4">
                                <Input type="text" placeholder="Project Title" className="w-full" />
                                <Textarea placeholder="Project Description" className="w-full" />
                                <Input type="text" placeholder="Skills Used " className="w-full" />
                                <Input type="file" className="w-full" />
                            </div>
                        )}
                        </div> */}

                        {/* Linked Accounts Section */}
                        <div className="">
                            <h2 className="font-bold text-slate-800 mb-2">Linked Accounts</h2>
                            <Input type="text" {...register("accounts.linkedin")} placeholder="LinkedIn profile URL" className=" md:w-[35rem] mb-2" />
                            {errors.accounts?.linkedin && <p className="text-red-500 text-xs">{errors.accounts.linkedin.message}</p>}
                            <Input type="text" {...register("accounts.github")} placeholder="GitHub profile URL" className="md:w-[35rem] mb-2" />
                            {errors.accounts?.github && <p className="text-red-500 text-xs">{errors.accounts.github.message}</p>}
                            <Input type="text" {...register("accounts.other")} placeholder="Other social media profile URL" className="md:w-[35rem]" />
                        </div>

                        {/* Save Profile Button */}
                        <div className="flex justify-center mt-11">
                            <Button className="w-[500px] bg-green-900" type="submit">
                                Save Profile
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CompleteProfile;
