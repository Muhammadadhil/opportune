import { Star, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IFreelancer, userInfo } from "@/types/IUserState";
import { useNavigate } from "react-router-dom";

interface FreelancerCardProps {
    userInfo: userInfo;
    freelancerInfo: IFreelancer;
}

export function FreelancerCard({ userInfo, freelancerInfo }: FreelancerCardProps) {

    const fullStars = Math.floor(userInfo?.averageRating || 0);
    const navigate = useNavigate();

    const handleRedirect = (userId: string) => {
        navigate('/freelancer/'+userId)
    }

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow max-w-[1100px] cursor-pointer" >
            <div className="flex flex-col sm:flex-row gap-4" onClick={() => {handleRedirect(freelancerInfo.userId)}}>
                {/* Profile Image and Basic Info */}
                <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/10">
                        <AvatarImage className="h-full" src={freelancerInfo.imageUrl || freelancerInfo.image} alt={`${userInfo?.firstname} ${userInfo?.lastname}`} />
                        <AvatarFallback>
                            {userInfo?.firstname[0]}
                            {userInfo?.lastname[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                                {userInfo?.firstname} {userInfo?.lastname}
                            </h3>
                            {/* <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" /> */}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{freelancerInfo.title}</p>

                        <p className="text-sm text-muted-foreground">{userInfo?.country}</p>
                    </div>
                </div>

                {/* Stats and Availability */}
                <div className="sm:ml-auto flex flex-col sm:items-end gap-2">
                    <div className="flex items-center gap-4">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <Star key={index} className={`w-4 h-4 ${index < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`} />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">({userInfo?.reviewCount})</span>
                        </div>

                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                            Available now
                        </Badge>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {freelancerInfo.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="rounded-full">
                                {skill}
                            </Badge>
                        ))}
                        {freelancerInfo.skills.length > 4 && (
                            <Badge variant="secondary" className="rounded-full">
                                +{freelancerInfo.skills.length - 4}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
