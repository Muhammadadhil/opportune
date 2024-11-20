import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Maxwidth from '@/layouts/MaxWidth'
import {JobDetail} from '@/components/client/JobDetail';
import {JobApplications} from '@/components/client/JobApplications';



const JobDetailPage: React.FC = () => {

    return (
        <Maxwidth>
            <div className="container mx-auto py-8 max-w-7xl">
                <div className="p-4 md:p-6 max-w-5xl">
                    <h2 className="text-xl font-semibold mb-4">Your Job Details</h2>
                    <Tabs defaultValue="details" className="w-max-[800px] mt-8">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto pt-2 bg-transparent">
                            <TabsTrigger value="details">Job Details</TabsTrigger>
                            <TabsTrigger value="applications">applications</TabsTrigger>
                            <TabsTrigger value="hires">hires</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                            <JobDetail />
                        </TabsContent>
                        <TabsContent value="applications">
                            <JobApplications />
                        </TabsContent>
                        <TabsContent value="hires">{/* <GigList /> */}</TabsContent>
                    </Tabs>
                </div>
            </div>
        </Maxwidth>
    );
};

export default JobDetailPage;
