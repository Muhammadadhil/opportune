import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Lightbulb, MapPin, Mail, Briefcase, Globe, Building2, Edit, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EditProfileDialog } from "./EditProfile";
import JobCard from "../client/JobCard";
import NoItems from "../ui/NoJob";
import { getClientProfileData } from "@/api/user";
import { getJobs } from "@/api/job";
import { setClientData } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { IJob } from "@/types/IJob";
import { useGigs } from "@/hooks/gigs/useGigs";
import { useFreelancerProfile } from "@/hooks/user/useFreelancerProfile";
import profileimg from "@/assets/profilePicture.jpg";

export default function Profile() {
    const { userInfo, clientData } = useSelector((state: RootState) => state.user);
    // const { theme } = useSelector((state: RootState) => state.app);
    const [jobs, setJobs] = useState<IJob[]>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: gigs } = useGigs(userInfo?._id);

    const { data: freelancer, refetch } = useFreelancerProfile(userInfo?.role, userInfo?._id);
    const visibleJobs = jobs?.slice(0, 3);

    const getClientData = async () => {
        try {
            const response = await getClientProfileData(userInfo?._id);
            dispatch(setClientData(response.data));
        } catch (error) {
            console.log("error fetching profile data:", error);
        }
    };

    const fetchJobs = async () => {
        const response = await getJobs(userInfo?._id as string);
        setJobs(response.data);
    };

    useEffect(() => {
        if (userInfo?.role === "client") {
            getClientData();
            fetchJobs();
        }
    }, [userInfo]);

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-44 py-8">
            <div className="min-h-screen max-w-[1300px]">
                {/* Header Section with Gradient Background */}
                <div className="relative bg-gradient-to-r from-gray-800 via-gray-500 to-gray-300 h-48 sm:h-56 md:h-64 rounded-xl">
                    <div className="container mx-auto px-4 h-full">
                        <div className="absolute -bottom-20 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-8">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src={freelancer?.imageUrl || profileimg}
                                    alt="profile image"
                                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="mb-9 text-center sm:text-left">
                                <h1 className="text-3xl font-bold text-white">
                                    {userInfo?.firstname} {userInfo?.lastname}
                                </h1>
                                <p className="text-white/90 mt-1">
                                    {userInfo?.role}
                                    {userInfo?.country && (
                                        <span className="ml-2 text-white/80">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            {userInfo.country}
                                        </span>
                                    )}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-4">
                                    {userInfo?.role === "freelancer" && !freelancer ? (
                                        <Button className="bg-green-600 text-white hover:bg-green-500 " onClick={() => navigate("/fr/complete-profile")} variant="secondary">
                                            Complete your profile
                                        </Button>
                                    ) : (
                                        <>
                                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="secondary">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit profile
                                                    </Button>
                                                </DialogTrigger>
                                                <EditProfileDialog user={userInfo} onClose={() => setIsEditDialogOpen(false)} onUpdate={refetch} />
                                            </Dialog>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 mt-24 sm:mt-28 ">
                    <div className="flex justify-between">
                        <div className="max-w-2xl space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                    <span>{userInfo?.email}</span>
                                </div>
                                {userInfo?.role === "freelancer" && <p className="">{freelancer?.title}</p>}

                                {userInfo?.role === "freelancer" && freelancer?.skills && (
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="w-5 h-5 text-muted-foreground mt-1" />
                                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                            {freelancer?.skills.map((skill: string, index: number) => (
                                                <Badge key={index} variant="secondary">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {userInfo?.role === "client" && (
                                    <>
                                        {clientData?.companyName && (
                                            <div className="flex items-start gap-2">
                                                <Building2 className="w-5 h-5 text-muted-foreground mt-1" />
                                                <div>
                                                    <h3 className="font-medium">{clientData.companyName}</h3>
                                                    <p className="text-muted-foreground">{clientData.companyDescription}</p>
                                                </div>
                                            </div>
                                        )}

                                        {clientData?.website && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-5 h-5 text-muted-foreground" />
                                                <a
                                                    href={clientData.website.startsWith("http") ? clientData.website : `https://${clientData.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {clientData.website}
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-2">
                                            <Briefcase className="w-5 h-5 text-muted-foreground mt-1" />
                                            <div>
                                                <h3 className="font-medium">Project Needs</h3>
                                                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                                                    {clientData?.projectNeeds?.map((need: string, index: number) => (
                                                        <Badge key={index} variant="secondary">
                                                            {need}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={index < Math.floor(userInfo?.averageRating ?? 0) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className={`w-6 h-6 ${index < Math.floor(userInfo?.averageRating ?? 0) ? "text-yellow-500" : "text-gray-400"}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22l1.18-7.86-5-4.87 6.91-1L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{userInfo?.averageRating?.toFixed(1) || "0.0"} / 5.0</span>
                                <span className="text-sm text-gray-500">({userInfo?.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="portfolio" className="w-full mt-5">
                        <TabsList className="border-b w-full justify-start rounded-none h-12 bg-transparent">
                            {userInfo?.role === "freelancer" && <TabsTrigger value="portfolio">porfolio</TabsTrigger>}
                            {userInfo?.role === "client" && <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>}
                        </TabsList>

                        <TabsContent value="portfolio" className="mt-6">
                            {userInfo?.role === "freelancer" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {gigs?.data?.length ? (
                                        gigs.data.map((gig: any, index: number) => (
                                            <div key={index} className="rounded-lg overflow-hidden">
                                                <img src={gig.imageUrl || "/placeholder.svg?height=200&width=300"} alt={gig.title} className="w-full h-48 object-cover" />
                                                <div className="p-4 bg-white dark:bg-gray-800">
                                                    <h3 className="font-semibold">{gig.title}</h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="flex items-center">
                                                            <Heart className="w-4 h-4 mr-1" /> {gig.likes || 0}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Users className="w-4 h-4 mr-1" /> {gig.views || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">No portfolio items yet.</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Work showcase is only available for freelancers.</p>
                            )}
                        </TabsContent>

                        {userInfo?.role === "client" && (
                            <TabsContent value="jobs" className="mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {visibleJobs?.map((job, index) => (
                                        <JobCard key={index} job={job} />
                                    ))}
                                    {jobs?.length === 0 && <NoItems />}
                                    {jobs?.length && jobs?.length > 3 && (
                                        <Link to="/cl/manage-jobs" className="text-blue-600 hover:text-blue-500">
                                            See all jobs
                                        </Link>
                                    )}
                                </div>
                            </TabsContent>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}









// const { userInfo, clientData } = useSelector((state: RootState) => state.user);
// // const { theme } = useSelector((state: RootState) => state.app);
// const [jobs, setJobs] = useState<IJob[]>();
// const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

// const dispatch = useDispatch();
// const navigate = useNavigate();
// const { data: gigs } = useGigs(userInfo?._id);

// const { data: freelancer, refetch } = useFreelancerProfile(userInfo?.role, userInfo?._id);
// const visibleJobs = jobs?.slice(0, 3);

// const getClientData = async () => {
//     try {
//         const response = await getClientProfileData(userInfo?._id);
//         dispatch(setClientData(response.data));
//     } catch (error) {
//         console.log("error fetching profile data:", error);
//     }
// };

// const fetchJobs = async () => {
//     const response = await getJobs(userInfo?._id as string);
//     setJobs(response.data);
// };

// useEffect(() => {
//     if (userInfo?.role === "client") {
//         getClientData();
//         fetchJobs();
//     }
// }, [userInfo]);


// export default function Profile() {

//     const { userInfo, clientData } = useSelector((state: RootState) => state.user);
//     const { theme } = useSelector((state: RootState) => state.app);

//     // const [profileImage, setProfileImage] = useState("");
//     // const [gigs, setGigs] = useState<IGig[]>([]);
//     const [jobs, setJobs] = useState<IJob[]>();
//     const [isEdited, setIsEdited] = useState(false);
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Add this state

//     const visibleJobs = jobs?.slice(0, 3);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { data: gigs } = useGigs(userInfo?._id);
//     const { data: freelancer } = useFreelancerProfile(userInfo?._id);

//     console.log("freelancer details :", freelancer);

//     // const { data: client } = useClientProfile(userInfo._id);

//     // async function getData() {
//     //     try {
//     //         const response = await getProfileData(userInfo._id);
//     //         const imgUrl = response.data.imageUrl;
//     //         setProfileImage(imgUrl);
//     //     } catch (error) {
//     //         console.log("error fetching profile data:", error);
//     //     }
//     // }

//     const getClientData = async () => {
//         try {
//             const response = await getClientProfileData(userInfo._id);
//             dispatch(setClientData(response.data));
//         } catch (error) {
//             console.log("error fetching profile data:", error);
//         }
//     };

//     useEffect(() => {
//         if (userInfo.role == "client") {
//             getClientData();
//         }
//     }, []);

//     // const fetchProjects = async () => {
//     //     const response = await fetchGigs(userInfo._id);
//     //     console.log("gigs response:", response.data);
//     //     setGigs(response.data);
//     // };

//     const fetchJobs = async () => {
//         console.log("fetching jobs !!!");

//         const response = await getJobs(userInfo?._id as string);
//         console.log("jobs response:", response.data);
//         setJobs(response.data);
//     };

//     useEffect(() => {
//         console.log("calling to  gigs | jobs !");
//         if (userInfo?.role == "freelancer") {
//             // fetchProjects();
//         } else if (userInfo?.role == "client") {
//             fetchJobs();
//         }
//     }, [isEdited]);

//     // const updateGig = (updatedGig: IGig) => {
//     //     // setGigs((prevGigs) => prevGigs?.map((gig) => (gig._id === updatedGig._id ? updatedGig : gig)) ?? []);
//     //     setIsEdited((prev) => !prev);
//     // };

//     return (
//         <div className={`container mx-auto px-4 py-8 ${theme === "dark" ? " text-white" : " text-gray-900"}`}>
//             <div className="flex flex-col lg:flex-row gap-8">
//                 <Card className={`lg:w-1/3 ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
//                     <CardContent className="p-6">
//                         <div className="flex flex-col items-center">
//                             <div className="relative mb-4">
//                                 <img
//                                     src={freelancer?.data?.imageUrl ? freelancer?.data?.imageUrl : profilePicture}
//                                     alt="Profile"
//                                     className={`w-32 h-32 rounded-full object-cover border-4 ${theme === "dark" ? "border-gray-700" : "border-white"}`}
//                                 />
//                             </div>
//                             <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
//                                 {userInfo.firstname} {userInfo.lastname}
//                             </h2>
//                             <p className={`text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{userInfo.role}</p>
//                             <p className={`text-sm text-center ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>{freelancer?.data?.title}</p>
//                         </div>

//                         <div className="mt-6 flex justify-center">
//                             {userInfo.role == "freelancer" && !freelancer?.data ? (
//                                 <Button className="w-full" onClick={() => navigate("/fr/complete-profile")} variant="outline">
//                                     Complete your profile
//                                 </Button>
//                             ) : (
//                                 <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                                     <DialogTrigger asChild>
//                                         <Button className="w-44" variant={theme === "dark" ? "secondary" : "outline"}>
//                                             <Edit className="mr-2 h-4 w-4" /> Edit profile
//                                         </Button>
//                                     </DialogTrigger>
//                                     <EditProfileDialog user={userInfo} onClose={() => setIsEditDialogOpen(false)} />
//                                 </Dialog>
//                             )}
//                         </div>

//                         <div className="mt-6 space-y-3 text-sm">
//                             {userInfo.country && (
//                                 <div className="flex items-center">
//                                     <MapPin className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                     <span>{userInfo.country}</span>
//                                 </div>
//                             )}

//                             <div className="flex items-center">
//                                 <Mail className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                 <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{userInfo.email}</span>
//                             </div>

//                             {userInfo.role == "freelancer" && freelancer?.data.skills && (
//                                 <div className="flex items-start">
//                                     <Lightbulb className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                     <div className="flex flex-wrap">
//                                         {freelancer.data.skills.map((skill:string, index:number) => (
//                                             <span key={index} className={`rounded-full px-2 py-1 text-sm mr-2 mb-2 ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
//                                                 {skill}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {userInfo.role == "client" && (
//                                 <>
//                                     {clientData.companyName && (
//                                         <div className="flex items-start">
//                                             <Building2 className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                             <div>
//                                                 <h3 className="font-medium">{clientData.companyName}</h3>
//                                                 <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{clientData.companyDescription} company desripttion !!!</p>
//                                             </div>
//                                         </div>
//                                     )}

//                                     <div className="flex items-start">
//                                         <Briefcase className={`w-4 h-4 mr-2 mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                         <div>
//                                             <h3 className="font-medium">Project Needs</h3>
//                                             <div className="flex flex-wrap mt-1">
//                                                 {clientData?.projectNeeds?.map((need: string, index: number) => (
//                                                     <span
//                                                         key={index}
//                                                         className={`rounded-full px-2 py-1 text-xs mr-2 mb-2 ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
//                                                     >
//                                                         {need}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {clientData.website && (
//                                         <div className="flex items-center">
//                                             <Globe className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
//                                             <a
//                                                 href={clientData.website}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className={`hover:underline ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
//                                             >
//                                                 {clientData.website}
//                                             </a>
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card className={`lg:w-2/3 ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
//                     <CardHeader>
//                         <CardTitle className={theme === "dark" ? "text-gray-200" : "text-gray-600"}>Your Posts</CardTitle>
//                     </CardHeader>
//                     {userInfo.role == "freelancer" ? (
//                         <CardContent className="grid grid-cols-12 justify-center ">
//                             {gigs?.data?.length < 1 && <p>No posts yet.</p>}
//                             {/*
//                             {gigs?.data?.map((gig) => {
//                                 return <GigCard key={gig._id} gig={gig} onUpdate={updateGig} />;
//                             })} */}
//                         </CardContent>
//                     ) : (
//                         <CardContent className="flex gap-2 flex-wrap ">
//                             {visibleJobs?.map((job, index) => {
//                                 return <JobCard job={job} key={index} />;
//                             })}
//                             {jobs?.length > 2 ? (
//                                 <Link to="/cl/manage-jobs">
//                                     <button className="text-blue-600 hover:text-blue-500 mt-2 ">See all jobs</button>
//                                 </Link>
//                             ) : (
//                                 ""
//                             )}
//                             <div className="mx-auto">{visibleJobs?.length == 0 ? <NoItems /> : ""}</div>
//                         </CardContent>
//                     )}
//                 </Card>
//             </div>
//         </div>
//     );
// }
