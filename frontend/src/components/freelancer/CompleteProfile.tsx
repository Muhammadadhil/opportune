import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profilePicture from "@/assets/profilePicture.jpg";
import { IoIosClose } from "react-icons/io";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { completeProfle } from "@/api/userApi";

const CompleteProfile = () => {
    const [image, setImage] = useState<File | string>("");
    const [title, setTitle] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [accounts, setAccounts] = useState({
        linkedin: "",
        github: "",
        other: "",
    });
    const [newSkill, setNewSkill] = useState("");
    // const [showPortfolioInputs, setShowPortfolioInputs] = useState(false);

    const addSkill = () => {
        if (newSkill && skills.length < 10) {
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    const addLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccounts({
            ...accounts,
            [name]: value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // setImage(URL.createObjectURL(e.target.files[0])); //?URL is the global object provided by browser : part of webapi
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("skills", JSON.stringify(skills));
        formData.append("accounts", JSON.stringify(accounts));

        await completeProfle(formData);
    };


    // console.log("image file:", image);

    return (
        <div className=" md:max-w-[1100px] md:mx-auto p-6 rounded-lg ">
            <div className="flex justify-center py-2 rounded-t-lg">
                <h2 className="text-xl font-bold">Complete your profile</h2>
            </div>

            <div className="space-y-6  mt-4">
                <h2 className="font-bold text-slate-800 mb-2">Add Profile Image</h2>
                <div className="flex justify-center">
                    <div className="relative w-52">
                        <input type="file" id="imageInput" hidden accept="image/*" onChange={handleImageChange} />
                        <img src={profilePicture} alt="Profile" className="shadow-sm w-44 md:w-52 rounded-full mr-4 bg-gray-100 object-cover" />
                        <label
                            htmlFor="imageInput"
                            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 rounded-full transition-opacity"
                        >
                            Add image
                        </label>
                    </div>
                </div>
                <img src={image} alt="" />

                <div>
                    <h2 className="font-bold text-slate-800 mb-2">Title / Description</h2>
                    <Textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Describe your professional title and a brief description."
                        className=" md:w-[40rem]"
                        maxLength={50}
                    />
                    <p className="text-sm text-gray-500 mt-1">Maximum 50 words</p>
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
                    <Input type="text" name="linkedin" value={accounts.linkedin} onChange={addLinks} placeholder="LinkedIn profile URL" className=" md:w-[35rem] mb-2" />
                    <Input type="text" name="github" value={accounts.github} onChange={addLinks} placeholder="GitHub profile URL" className="md:w-[35rem] mb-2" />
                    <Input type="text" name="other" value={accounts.other} onChange={addLinks} placeholder="Other social media profile URL" className="md:w-[35rem]" />
                </div>
            </div>

            {/* Save Profile Button */}
            <div className="flex justify-center mt-11">
                <Button className="w-[500px] bg-green-900" onClick={handleSubmit}>
                    Save Profile
                </Button>
            </div>
        </div>
    );
};

export default CompleteProfile;
