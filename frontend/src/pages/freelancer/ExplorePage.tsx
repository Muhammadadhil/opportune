import { SearchBar } from "@/components/common/Search-bar";
import { SortDropdown } from "@/components/common/Sort-dropdown";
import { Filters } from "@/components/freelancer/Filters";
import JobList from "@/components/freelancer/Joblist";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useScrollToTop } from "@/hooks/common/useScrollToTop";

export default function ExplorePage() {

    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory || "";
    const searchValue = location.state?.search || "";

    useScrollToTop();

    const [filterState, setFilterState] = useState({
        status: "",
        category: selectedCategory,
        applications: "",
        budgetRange: "",
        search: searchValue,
        sort: "newest",
    });

    console.log("filterState:", filterState);

    const updateFilterState = (key: string, value: string | number | null) => {
        setFilterState((prev) => ({ ...prev, [key]: value }));
    };
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex gap-8">
                <Filters onChange={updateFilterState} filterState={filterState}/>
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <SearchBar onSearch={(value) => updateFilterState("search", value)} />
                        <SortDropdown onSortChange={(value) => updateFilterState("sort", value)} />
                    </div>

                    <div className="grid gap-4">
                        <JobList filters={filterState} />
                    </div>
                </div>
            </div>
        </div>
    );
}
