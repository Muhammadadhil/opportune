import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BudgetRangeOptionProps {
    id: string;
    label: string;
    onClick: () => void;
}

export function BudgetRangeOption({ id, label, onClick }: BudgetRangeOptionProps) {
    return (
        <div className="flex items-center space-x-2" onClick={onClick}>
            <Checkbox id={id} />
            <Label htmlFor={id}>{label}</Label>
        </div>
    );
}
