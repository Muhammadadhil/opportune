import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Lightbulb, MapPin, Mail, Briefcase, Globe, Building2, Edit, Users, Heart, User } from "lucide-react";
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
import { usePortfolios } from "@/hooks/portfolio/usePortfolios";
import { useFreelancerProfile } from "@/hooks/user/useFreelancerProfile";
import profileimg from "@/assets/profilePicture.jpg";
import { getUserById } from "@/api/user";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import PortfolioCard from "../freelancer/PortfolioCard";

export default function Profile() {
    const { userInfo, clientData } = useSelector((state: RootState) => state.user);
    // const { theme } = useSelector((state: RootState) => state.app);
    const { userId } = useParams();
    console.log("userId:", userId);

    const [jobs, setJobs] = useState<IJob[]>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [profileUser, setProfileUser] = useState<any>(null);
    const [userSpecificDetails, setUserSpecificDetails] = useState<any>(null);

    console.log("isOwnProfile:", isOwnProfile);
    console.log("profileUser:", profileUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: portfolios } = usePortfolios(userInfo?._id!);

    console.log("portfolios:", portfolios);

    const { data: freelancer, refetch } = useFreelancerProfile(userInfo?.role, userInfo?._id);
    const visibleJobs = jobs?.slice(0, 3);

    // fetch other users profile
    const fetchUserProfile = async () => {
        console.log("fetching other  user profile !!!");
        console.log("userId:", userId);

        try {
            const response = await getUserById(userId);
            console.log("response.data:", response.data);
            setProfileUser(response.data);

            if (response.data?.role === "freelancer") {
                setUserSpecificDetails(response.data.freelancerDetails);
            } else if (response.data?.role === "client") {
                setUserSpecificDetails(response.data.clientDetails);
            }
        } catch (error) {
            console.log("Error fetching user profile:", error);
            navigate("/not-found"); // Redirect if user not found
        }
    };

    useEffect(() => {
        setIsOwnProfile(!userId || userId === userInfo?._id);
        if (userId && userId !== userInfo?._id) {
            // Fetch other user profile
            console.log("fetching other user profile !!!");
            fetchUserProfile();
        } else {
            console.log("setting the same profile user:", userInfo);
            // setProfileUser(userInfo);
        }
    }, [userId]);

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

    const displayUser = profileUser || userInfo;
    const displayFreelancer = userSpecificDetails || freelancer;
    const displayClient = userSpecificDetails || clientData;

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-44 py-8">
            <div className="min-h-screen max-w-[1300px]">
                {/* Header Section with Gradient Background */}
                <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 h-48 sm:h-56 md:h-64 rounded-xl">
                    <div className="container mx-auto px-4 h-full">
                        <div className="absolute top-32 flex  sm:flex-row sm:items-end gap-4 sm:gap-8">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src={displayFreelancer?.imageUrl || profileimg}
                                    alt="profile image"
                                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="mb-9  sm:text-left">
                                <h1 className="text-3xl font-bold text-white">
                                    {displayUser?.firstname} {displayUser?.lastname}
                                </h1>
                                <p className="text-white/90 mt-1">
                                    {displayUser?.role}
                                    {displayUser?.country && (
                                        <span className="ml-2 text-white/80">
                                            <MapPin className="inline w-4 h-4 mr-1" />
                                            {displayUser.country}
                                        </span>
                                    )}
                                </p>

                                {/* Action Buttons */}
                                {isOwnProfile && (
                                    <div className="flex gap-3 mt-4">
                                        {displayUser?.role === "freelancer" && !freelancer ? (
                                            <Button className="bg-green-600 text-white hover:bg-green-500" onClick={() => navigate("/fr/complete-profile")} variant="secondary">
                                                Complete your profile
                                            </Button>
                                        ) : (
                                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="secondary">
                                                        <Edit className="mr-2 h-4 w-4" /> Edit profile
                                                    </Button>
                                                </DialogTrigger>
                                                <EditProfileDialog user={displayUser} onClose={() => setIsEditDialogOpen(false)} onUpdate={refetch} />
                                            </Dialog>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 mt-20 flex flex-col md:flex-row justify-between pb-16 border-b-2 border-gray-100">
                    <div className="flex justify-between">
                        <div className="max-w-2xl space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-muted-foreground" />
                                    <span>{displayUser?.email}</span>
                                </div>
                                <div className="flex flex-wrap">
                                    <User className="w-5 h-5 text-muted-foreground mt-1" />

                                    {displayUser?.role === "freelancer" && <p className="">{displayFreelancer?.title}</p>}
                                </div>

                                {displayUser?.role === "freelancer" && displayFreelancer?.skills && (
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="w-5 h-5 text-muted-foreground mt-1" />
                                        <div className="flex flex-wrap gap-2 justify-start">
                                            {displayFreelancer?.skills.map((skill: string, index: number) => (
                                                <div key={index} className="px-3 py-1 text-sm bg-zinc-100 text-gray-800 rounded-full">
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {displayUser?.role === "client" && (
                                    <>
                                        {displayClient?.companyName && (
                                            <div className="flex items-start gap-2">
                                                <Building2 className="w-5 h-5 text-muted-foreground mt-1" />
                                                <div>
                                                    <h3 className="font-medium">{displayClient.companyName}</h3>
                                                    <p className="text-muted-foreground"> {displayClient.companyDescription}</p>
                                                </div>
                                            </div>
                                        )}

                                        {displayClient?.website && (
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-5 h-5 text-muted-foreground" />
                                                <a
                                                    href={displayClient.website.startsWith("http") ? displayClient.website : `https://${clientData.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {displayClient.website}
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-2">
                                            <Briefcase className="w-5 h-5 text-muted-foreground mt-1" />
                                            <div>
                                                <h3 className="font-medium">Preference</h3>
                                                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                                                    {displayClient?.projectNeeds?.map((need: string, index: number) => (
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
                    </div>

                    <div className="flex flex-col  space-y-2 mt-5">
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={index < Math.floor(displayUser?.averageRating ?? 0) ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={`w-6 h-6 ${index < Math.floor(displayUser?.averageRating ?? 0) ? "text-yellow-500" : "text-gray-400"}`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22l1.18-7.86-5-4.87 6.91-1L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{displayUser?.averageRating?.toFixed(1) || "0.0"} / 5.0</span>
                        <span className="text-sm text-gray-500">({displayUser?.reviewCount || 0} reviews)</span>
                    </div>

                    {displayUser?.role === "client" && (
                        <div className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
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
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    {displayUser?.role === "freelancer" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-zinc-600">Portfolio Projects</h2>
                            <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-4 sm:gap-6">
                                {portfolios?.map((item, index) => (
                                    <PortfolioCard key={index} imageUrl={item?.imageUrls?.[0] || "/placeholder.svg?height=200&width=300"} title={item.title} />
                                ))}
                            </div>
                            {(!portfolios || portfolios.length === 0) && <p className="text-muted-foreground">No portfolio projects yet.</p>}
                        </div>
                    )}
                </div>

                <div className="border shadow-sm p-4 md:p-6 rounded-md mb-4 md:mb-5 w-[22rem] mt-8">
                    <Button className="w-full text-white bg-green-700 hover:bg-green-600 transition-all duration-300 ease-in-out hover:translate-y-1" onClick={() => navigate("/fr/portfolio")}>
                        Add a portfolio project
                    </Button>
                    <p className="text-xs mt-3 ">post a your porfolio project and let client see your achievements.</p>
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
