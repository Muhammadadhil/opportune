import { Card, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
// import MaxWidth from "@/layouts/MaxWidth";
import ClientJobs from "@/components/client/ClientJobs";

const ClientDashboard: React.FC = () => {
    return (
        // <MaxWidth>
        <div className="min-h-screen">
            <div className="container mx-auto flex flex-row mt-16 ">
                <Link to="/cl/postjob">
                    <Card className="px-4 max-w-80 md:min-w-80 h-28 hover:shadow-lg hover:bg-gray-100 bg-gray-50 rounded-xl mr-9 shadow-md  border flex flex-col items-center justify-center overflow-hidden">
                        <CardTitle className="text-base md:text-lg font-bold text-center text-gray-700 static">Post a job</CardTitle>
                        <p className="text-xs md:text-sm mt-1 text-center ">Connect with talents and collaborate</p>
                    </Card>
                </Link>

                <Card className="px-4 max-w-80 h-28 md:min-w-80 hover:shadow-lg hover:bg-gray-100 bg-gray-50 rounded-xl mr-9 shadow-md border flex flex-col items-center justify-center ">
                    <CardTitle className="text-base md:text-lg font-bold text-center text-gray-700 sm:">Hire talents directly</CardTitle>
                    <p className="text-xs md:text-sm mt-1 text-center">Connect with talents and collaborate</p>
                </Card>
            </div>
            {/* <GigList /> */}

            <ClientJobs />
        </div>

        // </MaxWidth>
    );
};

export default ClientDashboard;
