// import GigList from "@/components/common/GigList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {JobApplications} from "@/components/common/JobApplications";
import {Contracts} from "@/components/common/Contracts";
import {OffersList} from '@/components/common/OfferList';

const ManageWorkPage = () => {

    
    return (
        <div className="mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-7xl">
                <h2 className="text-xl font-semibold mb-4">Manage your work and gigs</h2>
                <Tabs defaultValue="applications" className="w-max-[800px] mt-8 min-h-[690px]">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto pt-2 bg-transparent">
                        {/* <TabsTrigger value="gigs">Your Gigs</TabsTrigger> */}
                        <TabsTrigger value="applications">Your Applications</TabsTrigger>
                        <TabsTrigger value="offers">Offers</TabsTrigger>
                        <TabsTrigger value="contracts">Contracts</TabsTrigger>
                    </TabsList>
                    {/* <TabsContent value="gigs">
                        <GigList />
                    </TabsContent> */}
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