import { useState } from "react";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profilePicture from "@/assets/profilePicture.jpg";
import { IoIosClose } from "react-icons/io";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { completeProfle } from "@/api/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LoadingSpinner from "../loading/Loading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileSchema } from "@/schemas/completeProfileSchema";
import { CompleteProfileForm } from "@/schemas/completeProfileSchema";
import { toast } from "react-hot-toast";

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
            console.log("response: complete profile:", response);

            navigate(-1);
        } catch (error) {
            const axiosError = error as AxiosError; 
            console.log("error in complete-profile:", axiosError);

            if (axiosError.response) {
                if (axiosError.response.status === 504) {
                    toast.error("Internal Server Error. Please try again later.");
                } else if (axiosError.response.status === 500) {
                    toast.error("Detail already exists.");
                } else if (axiosError.response.status === 409) {
                    toast.error("Request timed out. Please check your network and try again.");
                } else {
                    toast.error(`Error: ${axiosError.response.statusText}`);
                }
            }
        } finally {
            setIsLoading(false);
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
                            <div className="relative w-52 h-52">
                                {" "}
                                <input type="file" id="imageInput" {...register("image")} hidden accept="image/*" onChange={handleImageChange} />
                                <img
                                    src={typeof image === "string" ? profilePicture : URL.createObjectURL(image)}
                                    alt="Profile"
                                    className="shadow-sm w-full h-full rounded-full bg-gray-100 object-cover" 
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
                            <Textarea {...register("title")} placeholder="Describe your professional title and a brief description." className=" md:w-[40rem]" maxLength={100} />
                            <p className="text-sm text-gray-500 mt-1">Maximum 100 characters</p>
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
                                    onKeyDown={(e) => {
                                        if(e.key == "Enter" ){
                                            e.preventDefault();
                                            addSkill()
                                        }
                                    }}
                                    className="w-[30rem]"
                                />
                                <Button variant='outline' onClick={addSkill}>add</Button>
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
