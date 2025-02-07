import { cn } from "@/lib/utils";
import { IMilestone } from "@/types/IMilestone";


interface MilestoneStepperProps {
    milestones: IMilestone[];
    className?: string;
}   
 
export default function MilestoneStepper({ milestones, className }: MilestoneStepperProps) {
    return (
        <div className={cn("w-full max-w-md px-4", className)}>
            <div className="relative">
                {milestones.map((milestone, index) => (
                    <div key={milestone._id} className="flex items-start mb-8 last:mb-0">
                        <div className="relative">
                            {/* Vertical line */}
                            {index !== milestones.length - 1 && (
                                <div className={cn("absolute top-[30px] left-[15px] w-[2px] h-[calc(100%+2px)]", milestone.status === "complete" ? "bg-green-600" : "bg-[#9BA5B4]")} />
                            )}

                            {/* Circle indicator */}
                            <div
                                className={cn(
                                    "relative z-10 flex items-center justify-center w-[20px] h-[20px] rounded-full border-2",
                                    milestone.status === "complete" ? "bg-green-600 border-green-600" : "bg-white border-[#9BA5B4]"
                                )}
                            >
                            </div>
                        </div>

                        {/* Step title */}
                        <div className="">
                            <span className="ml-4 text-base font-medium">{milestone.description}</span>
                            <span className="font-medium pl-24">${milestone.amount.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
