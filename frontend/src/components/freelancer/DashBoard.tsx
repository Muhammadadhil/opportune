
import Sidebar from "./Sidebar";
import JobList from './Joblist'
import { Input } from "@/components/ui/input";
// import ExploreLayout from "@/layouts/ExploreLayout"; // sidebar layout component

const Dashboard = () => {

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <Input id="search" type="text" placeholder="Search jobs" className="w-full max-w-2xl mx-auto placeholder:text-sm" />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4 order-2 lg:order-1">
                    <div className="flex-grow p-4 md:p-6">
                        <h2 className="text-xl font-semibold mb-4">Jobs you might like</h2>
                        <JobList />
                    </div>
                </div>
                <div className="w-full lg:w-1/4 order-1 lg:order-2">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;