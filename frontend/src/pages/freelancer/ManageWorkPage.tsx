import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobApplications } from "@/components/common/JobApplications";
import { Contracts } from "@/components/common/Contracts";
import { OffersList } from "@/components/common/OfferList";
import { useRoleUser } from "@/hooks/user/useRoleUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ManageWorkPage = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    const { data: user } = useRoleUser(userInfo._id, "freelancer");
    

    return (
        <div className="mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-7xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Manage your work and gigs</h2>
                    <div className="text-right bg-gray-100 w-[140px] px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 font-bold">Your Earnings</p>
                        <h1 className="text-2xl font-bold text-green-600">${user?.data.walletAmount || 0}</h1>
                    </div>
                </div>
                <Tabs defaultValue="applications" className="w-max-[800px] mt-8 min-h-[690px]">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto pt-2 bg-transparent">
                        <TabsTrigger value="applications">Your Applications</TabsTrigger>
                        <TabsTrigger value="offers">Offers</TabsTrigger>
                        <TabsTrigger value="contracts">Contracts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="applications">
                        <JobApplications userType="freelancer" />
                    </TabsContent>
                    <TabsContent value="offers">
                        <OffersList userType="freelancer" />
                    </TabsContent>
                    <TabsContent value="contracts">
                        <Contracts userType="freelancer" />
                    </TabsContent>
                </Tabs>
                <ul className="space-y-4"></ul>
            </div>
        </div>
    );
};

export default ManageWorkPage;
