import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BudgetRangeOptionProps {
    id: string;
    label: string;
    value: string;
    currentValue: string;
    onChange: (value:string) => void;
}

export function BudgetRangeOption({ id, label, value, currentValue, onChange }: BudgetRangeOptionProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                checked={currentValue === value}
                onCheckedChange={(checked) => {
                    onChange(checked ? value : "");
                }}
            />
            <Label htmlFor={id}>{label}</Label>
        </div>
    );
}
