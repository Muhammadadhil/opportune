import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
    onSearch: (value: string) => void;
}
export const SearchBar:React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." className="pl-12 pr-60" onChange={(e) => onSearch(e.target.value)} />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-7 w-7 px-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
            </Button>
        </div>
    );
};
