import { FolderSearch2 } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";



export default function NoItems() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 bg-muted/40 rounded-lg">
            <FolderSearch2 className="w-20 h-20 text-muted-foreground mb-4 text-gray-600" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-center mb-2">No jobs to list right now</h2>
            <p className="text-muted-foreground text-center max-w-sm mb-10">Check back later for new job listings or try adjusting your search criteria.</p>
            <Link to="/cl/postjob">
                <Button>{"Post new Job"}</Button>
            </Link>
        </div>
    );
}
