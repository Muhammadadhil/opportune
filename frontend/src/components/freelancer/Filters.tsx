import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCategories } from '@/hooks/useCategories'
import { ICategory } from "@/types/ICategory";
import {BudgetRangeOption}  from "./Budget-Range";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface FiltersProps {
    onChange: (key: string, value: string | number | null) => void;
    filterState:any
}

export const Filters:React.FC<FiltersProps> = ({onChange,filterState}) => {
    const { isAdminAuthenticated } = useSelector((state: RootState) => state.user);

    const {data: categories} = useCategories();

    const isAdmin =  isAdminAuthenticated;


    return (
        <div className="w-64 space-y-6 mt-16">
            <Accordion type="single" collapsible className="w-full" defaultValue="category">
                {isAdmin && (
                    <AccordionItem value="budget">
                        <AccordionTrigger>Job Status</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2 gap-3">
                                <Checkbox
                                    id="1313"
                                    onCheckedChange={(checked) => {
                                        onChange("status", checked ? "closed" : "");
                                    }}
                                />
                                <Label className="px-2">deactivated by admin</Label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )}

                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 ">
                            {categories?.data?.map((category: ICategory) => (
                                <div key={category._id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category._id}
                                        onCheckedChange={(checked) => {
                                            onChange("category", checked ? category?.name : "");
                                        }}
                                        checked={filterState.category === category?.name}
                                        // onClick={(e) => {
                                        //     console.log("checkbox clicked", e.target);
                                        //     onChange("category", category.name);
                                        // }}
                                    />
                                    <Label htmlFor={category._id}>{category?.name}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="proposals">
                    <AccordionTrigger>Number of Applicants</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 px-2">
                            <Slider defaultValue={[0, 50]} max={50} step={5} className="w-full" onValueChange={(value) => onChange("applications", value[1])} />
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
                            <BudgetRangeOption id="range-1" label="Less than $100" value={"0-100"} currentValue={filterState.budgetRange} onChange={(value) => onChange("budgetRange", value)} />
                            <BudgetRangeOption id="range-2" label="$100 - $500" value="100-500" currentValue={filterState.budgetRange} onChange={(value) => onChange("budgetRange", value)} />
                            <BudgetRangeOption id="range-3" label="$500 - $1k" value="500-1000" currentValue={filterState.budgetRange} onChange={(value) => onChange("budgetRange", value)} />
                            <BudgetRangeOption id="range-4" label="$1k - $5k" value="1000-5000" currentValue={filterState.budgetRange} onChange={(value) => onChange("budgetRange", value)} />
                            <BudgetRangeOption id="range-5" label="$5k+" value="5000-100000000" currentValue={filterState.budgetRange} onChange={(value) => onChange("budgetRange", value)} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
