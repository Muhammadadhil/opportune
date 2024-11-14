import GigList from "@/components/common/GigList";

const GigsPage = () => {
    return (
        <div className="container mx-auto py-8 max-w-7xl">
            <div className="p-4 md:p-6 max-w-5xl">
                <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
                <ul className="space-y-4">
                    <GigList />
                </ul>
            </div>
        </div>
    );
};

export default GigsPage;
