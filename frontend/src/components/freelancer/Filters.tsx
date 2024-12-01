import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCategories } from '@/hooks/useCategories'
import { ICategory } from "@/types/ICategory";
import {BudgetRangeOption}  from "./Budget-Range";

interface FiltersProps {
    onChange: (key: string, value: string | number | null) => void ;
}

export const Filters:React.FC<FiltersProps> = ({onChange}) => {

    const {data: categories} = useCategories();

    console.log("categories:", categories);

    return (
        <div className="w-64 space-y-6 mt-16">
            <Accordion type="single" collapsible className="w-full" defaultValue="category">
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {categories?.data?.map((category: ICategory) => (
                                <div key={category._id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category._id}
                                        onClick={(e) => {
                                            console.log("checkbox clicked", e.target);
                                            onChange("category", (e.target as HTMLInputElement).checked ? category.name : null);
                                        }}
                                    />
                                    <Label htmlFor={category._id}>{category.name}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="proposals">
                    <AccordionTrigger>Number of Proposals</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-2">
                            <Slider defaultValue={[0, 50]} max={50} step={5} className="w-full" onValueChange={(value) => onChange("proposals", value[1])} />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0</span>
                                <span>50+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="budget">
                    <AccordionTrigger>Budget Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <BudgetRangeOption id="range-1" label="Less than $100" onClick={() => onChange("budgetRange", "0-100")} />
                            <BudgetRangeOption id="range-2" label="$100 - $500" onClick={() => onChange("budgetRange", "100-500")} />
                            <BudgetRangeOption id="range-3" label="$500 - $1k" onClick={() => onChange("budgetRange", "500-1000")} />
                            <BudgetRangeOption id="range-4" label="$1k - $5k" onClick={() => onChange("budgetRange", "1000-5000")} />
                            <BudgetRangeOption id="range-5" label="$5k+" onClick={() => onChange("budgetRange", "5000-100000000")} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
