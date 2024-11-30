import ClientJobs from "@/components/client/ClientJobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaxWidth from "@/layouts/MaxWidth";
import { Contracts } from "@/components/common/Contracts";


const ClientJobsPage = () => {
    return (
        <MaxWidth>
            <div className="mx-auto py-8 max-w-7xl">
                <div className="p-4 md:p-6 max-w-5xl">
                    <Tabs defaultValue="all-jobs">
                        <TabsList>
                            <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
                            <TabsTrigger value="all-contracts">All Contracts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all-jobs">
                            <ClientJobs />
                        </TabsContent>
                        <TabsContent value="all-contracts">
                            <Contracts userType="client"/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </MaxWidth>
    );
};

export default ClientJobsPage;
