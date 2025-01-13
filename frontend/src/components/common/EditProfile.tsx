import { useEffect, useState } from "react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/api/user";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setClientData } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useFreelancerProfile } from "@/hooks/user/useFreelancerProfile";
import { IoIosClose } from "react-icons/io";


interface EditProfileDialogProps {
    user: any;
    onClose: () => void;
    onUpdate : () => void;
}

export function EditProfileDialog({ user, onClose,onUpdate }: EditProfileDialogProps) {
    const dispatch = useDispatch();
    const { userInfo, clientData } = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(false);

    // Basic user data state
    const [userData, setUserData] = useState({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        country: user?.country || "",
    });

    const { data: freelancerData } = useFreelancerProfile(userInfo?.role, userInfo?._id);
    

    // Freelancer-specific state
    const [freelancerFormData, setFreelancerFormData] = useState({
        title: freelancerData?.title || "",
        skills: freelancerData?.skills || [],
        newSkill: "",
        preferredJobs: freelancerData?.preferredJobs || [],
        newPreferredJob: "",
        accounts: freelancerData?.accounts || {
            linkedin: "",
            github: "",
            other: "",
        },
    });

    // Client-specific state
    const [clientFormData, setClientFormData] = useState({
        companyName: clientData?.companyName || "",
        companyDescription: clientData?.companyDescription || "",
        website: clientData?.website || "",
        projectNeeds: clientData?.projectNeeds || [],
        newProjectNeed: "",
    });

    useEffect(() => {
        if (clientData) {
            setClientFormData({
                companyName: clientData.companyName || "",
                companyDescription: clientData.companyDescription || "",
                website: clientData.website || "",
                projectNeeds: clientData.projectNeeds || [],
                newProjectNeed: "",
            });
        }
    }, [clientData]);

    console.log("freelancerFormData:", freelancerFormData);
    console.log("clientFormData:", clientFormData);

    const handleBasicInfoChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleFreelancerChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("accounts.")) {
            const accountField = name.split(".")[1];
            setFreelancerFormData((prev) => ({
                ...prev,
                accounts: { ...prev.accounts, [accountField]: value },
            }));
        } else {
            setFreelancerFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    

    const handleClientChange = (e) => {
        setClientFormData({ ...clientFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        try {
            const roleSpecificData =
                user.role === "freelancer"
                    ? {
                          title: freelancerFormData.title,
                          skills: freelancerFormData.skills,
                          preferredJobs: freelancerFormData.preferredJobs,
                          accounts: freelancerFormData.accounts,
                      }
                    : {
                          companyName: clientFormData.companyName,
                          companyDescription: clientFormData.companyDescription,
                          website: clientFormData.website,
                          projectNeeds: clientFormData.projectNeeds,
                      };

            console.log("roleSpecificData when update:", roleSpecificData);

            const response = await updateProfile(user._id, {
                userData,
                roleSpecificData,
            });

            // Update Redux store
            dispatch(
                setCredentials({
                    ...userInfo,
                    ...userData,
                })
            );

            if (user.role === "client") {
                dispatch(setClientData(response.roleSpecificData));
            }

            if( user.role === "freelancer"){
                onUpdate();
            }

            // You might want to add similar dispatch for freelancer data

            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input id="firstname" name="firstname" value={userData.firstname} onChange={handleBasicInfoChange} />
                        </div>
                        <div>
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" name="lastname" value={userData.lastname} onChange={handleBasicInfoChange} />
                        </div>
                    </div>
                </div>

                {/* Freelancer-specific fields */}
                {user.role === "freelancer" && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Professional Details</h3>
                        <div>
                            <Label htmlFor="title">Professional Title</Label>
                            <Textarea id="title" name="title" value={freelancerFormData.title} onChange={handleFreelancerChange} />
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-800 mb-2">Skills</h2>
                            <div className="flex space-x-2 mb-2">
                                <Input
                                    type="text"
                                    placeholder="Add a skill"
                                    value={freelancerFormData.newSkill}
                                    onChange={(e) =>
                                        setFreelancerFormData((prev) => ({
                                            ...prev,
                                            newSkill: e.target.value,
                                        }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            if (freelancerFormData.newSkill && freelancerFormData.skills.length < 10) {
                                                setFreelancerFormData((prev) => ({
                                                    ...prev,
                                                    skills: [...prev.skills, prev.newSkill],
                                                    newSkill: "",
                                                }));
                                            }
                                        }
                                    }}
                                    className="w-[30rem]"
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (freelancerFormData.newSkill && freelancerFormData.skills.length < 10) {
                                            setFreelancerFormData((prev) => ({
                                                ...prev,
                                                skills: [...prev.skills, prev.newSkill],
                                                newSkill: "",
                                            }));
                                        }
                                    }}
                                >
                                    add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {freelancerFormData.skills.map((skill, index) => (
                                    <span key={index} className="flex items-center bg-gray-200 text-gray-800 px-4 py-1 rounded">
                                        {skill}
                                        <span
                                            className="flex justify-end text-2xl cursor-pointer ml-1"
                                            onClick={() => {
                                                setFreelancerFormData((prev) => ({
                                                    ...prev,
                                                    skills: prev.skills.filter((item) => item !== skill),
                                                }));
                                            }}
                                        >
                                            <IoIosClose />
                                        </span>
                                    </span>
                                ))}
                                <p className="text-sm text-gray-500 mt-1 justify-end">{10 - freelancerFormData.skills.length}/10 left</p>
                            </div>
                        </div>


                        {/* Social Links */}
                        <div className="space-y-2">
                            <Label>Social Links</Label>
                            <Input name="accounts.linkedin" placeholder="LinkedIn URL" value={freelancerFormData.accounts.linkedin} onChange={handleFreelancerChange} />
                            <Input name="accounts.github" placeholder="GitHub URL" value={freelancerFormData.accounts.github} onChange={handleFreelancerChange} />
                            <Input name="accounts.other" placeholder="Other URL" value={freelancerFormData.accounts.other} onChange={handleFreelancerChange} />
                        </div>
                    </div>
                )}

                {/* Client-specific fields */}
                {user.role === "client" && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Company Details</h3>
                        <div>
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" name="companyName" value={clientFormData.companyName} onChange={handleClientChange} />
                        </div>
                        <div>
                            <Label htmlFor="companyDescription">Company Description</Label>
                            <Textarea id="companyDescription" name="companyDescription" value={clientFormData.companyDescription} onChange={handleClientChange} />
                        </div>
                        <div>
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" name="website" value={clientFormData.website} onChange={handleClientChange} />
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}





// import { useState } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { updateProfile } from "@/api/user";
// import { userInfo } from "@/types/IUserState";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/store/slices/userSlice";
// import { useSelector } from 'react-redux';
// import { RootState } from "@/store/store";

// interface editProfileDialogProps {
//     user: userInfo;
//     onClose: () => void;
// }

// export function EditProfileDialog({ user, onClose }:editProfileDialogProps) {

//     const { userInfo } = useSelector((state: RootState) => state.user);

//     const [isLoading,setIsLoading]=useState(false);
//     const [formData, setFormData] = useState({
//         firstname: user?.firstname,
//         lastname: user?.lastname,
//         country: user?.country,
//     });

//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             setIsLoading(true);
//             await updateProfile(user?._id!,formData);
//             dispatch(setCredentials({ ...userInfo, firstname:formData.firstname, lastname:formData.lastname, country:formData.country }));
//             onClose();
//         }catch(error){
//             console.log(error);
//         } finally{
//             setIsLoading(false);
//         }

//     };

//     return (
//         <DialogContent>
//             <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>import { useState } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { updateProfile } from "@/api/user";
// import { userInfo } from "@/types/IUserState";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/store/slices/userSlice";
// import { useSelector } from 'react-redux';
// import { RootState } from "@/store/store";

// interface editProfileDialogProps {
//     user: userInfo;
//     onClose: () => void;
// }

// export function EditProfileDialog({ user, onClose }:editProfileDialogProps) {

//     const { userInfo } = useSelector((state: RootState) => state.user);

//     const [isLoading,setIsLoading]=useState(false);
//     const [formData, setFormData] = useState({
//         firstname: user?.firstname,
//         lastname: user?.lastname,
//         country: user?.country,
//     });

//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             setIsLoading(true);
//             await updateProfile(user?._id!,formData);
//             dispatch(setCredentials({ ...userInfo, firstname:formData.firstname, lastname:formData.lastname, country:formData.country }));
//             onClose();
//         }catch(error){
//             console.log(error);
//         } finally{
//             setIsLoading(false);
//         }

//     };

//     return (
//         <DialogContent>
//             <DialogHeader>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="firstname" className="text-right">
//                             First Name
//                         </Label>
//                         <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="lastname" className="text-right">
//                             Last Name
//                         </Label>
//                         <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="country" className="text-right">
//                             Country
//                         </Label>
//                         <Input id="country" name="country" value={formData.country} onChange={handleChange} className="col-span-3" />
//                     </div>
//                 </div>
//                 <DialogFooter>
//                     <Button type="submit" disabled={isLoading}>
//                         {isLoading ? "Saving..." : "Save changes"}
//                     </Button>
//                 </DialogFooter>
//             </form>
//         </DialogContent>
//     );
// }

//                 <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="firstname" className="text-right">
//                             First Name
//                         </Label>
//                         <Input id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="lastname" className="text-right">
//                             Last Name
//                         </Label>
//                         <Input id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="country" className="text-right">
//                             Country
//                         </Label>
//                         <Input id="country" name="country" value={formData.country} onChange={handleChange} className="col-span-3" />
//                     </div>
//                 </div>
//                 <DialogFooter>
//                     <Button type="submit" disabled={isLoading}>
//                         {isLoading ? "Saving..." : "Save changes"}
//                     </Button>
//                 </DialogFooter>
//             </form>
//         </DialogContent>
//     );
// }
