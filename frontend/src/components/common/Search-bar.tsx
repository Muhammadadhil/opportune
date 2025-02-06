import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button1";
import { useCallback, useEffect, useState } from "react";

interface SearchBarProps {
    onSearch: (value: string) => void;
    debounceDelay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch,debounceDelay = 500 }) => {

    const [searchTerm,setSearchTerm] = useState('');
    const debouncedSearch = useCallback(
        (value: string) => {

            const handler = setTimeout(() => {
                onSearch(value);
            },debounceDelay);

            return () => {
                clearTimeout(handler);
            };

        },
        [onSearch,debounceDelay]
    );

    useEffect(() => {

        const cleanup = debouncedSearch(searchTerm);
        return cleanup;

    }, [searchTerm,debouncedSearch]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

     const handleClear = () => {
        setSearchTerm("");
        onSearch("");
     };

    

    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." className="pl-12 pr-60" onChange={handleChange} />
            
            <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-7 w-7 px-0" onClick={handleClear}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
            </Button>
        </div>
    );
};
