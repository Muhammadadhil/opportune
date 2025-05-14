import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Lightbulb, MapPin, Mail, Briefcase, Globe, Building2, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button1";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import PortfolioCard from "../freelancer/PortfolioCard";
import { useReviews } from '@/hooks/reviews/useReviews'
import ReviewCard from "./ReviewCard";
import { useScrollToTop } from "@/hooks/common/useScrollToTop";
import Loading from "../loading/Loading";

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

    const { data: reviews } = useReviews(userInfo?._id ?? '');

    // console.log("reviews:", reviews);

    useScrollToTop();

    
    const { data: freelancer, refetch , isLoading } = useFreelancerProfile(userInfo?.role, userInfo?._id);
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

    const { data: portfolios } = usePortfolios(displayUser?._id ?? '');
    console.log("portfolios:", portfolios);

    if(isLoading){
        return <Loading/>
    }


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
                                        {displayUser?.role === "freelancer" && freelancer && Object.keys(freelancer).length < 1 ? (
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
                                    {displayUser?.role === "freelancer" && freelancer && Object.keys(freelancer).length > 1 && (
                                        <>
                                            <User className="w-5 h-5 text-muted-foreground mt-1" />
                                            <p className="">{displayFreelancer?.title}</p>
                                        </>
                                    )}
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
                                                <Building2 className="text-muted-foreground mt-1" />
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
                </div>

                <div className="mt-6">
                    {displayUser?.role === "freelancer" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-zinc-600">Portfolio Projects</h2>
                            {(!portfolios || portfolios.length === 0) && <p className="text-muted-foreground mb-7">No portfolio projects yet.</p>}

                            <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3  gap-4 sm:gap-6">
                                {portfolios?.map((portfolio, index) => (
                                    <PortfolioCard key={index} portfolio={portfolio} />
                                ))}
                                {userInfo?.role === "freelancer" && (
                                    <div
                                        className=" h-40 p-2 border border-slate-500 rounded-xl flex justify-center items-center cursor-pointer border-dashed group transition duration-300 ease-in-out hover:bg-zinc-100 "
                                        onClick={() => navigate("/fr/portfolio")}
                                    >
                                        <h2 className="group-hover:text-green-900 transition duration-300 ease-in-out text-green-600">Add a portfolio project</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    {displayUser?.role === "client" && (
                        <div className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
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
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-zinc-600"> Reviews</h2>
                        {(!reviews || reviews.length === 0) && <p className="text-muted-foreground mb-7">No Reviews to list.</p>}

                        {reviews?.map((review, index) => (
                            <div className="mb-3 w-[800px]">
                                <ReviewCard key={index} review={review} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
