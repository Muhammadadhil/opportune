
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortDropdownProps {
    onSortChange: (value: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange }) => {
    return (
        <Select defaultValue="newest" onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
            </SelectContent>
        </Select>
    );
};
