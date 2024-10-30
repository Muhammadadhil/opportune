import { useState, useEffect } from "react";
import { Overview } from "./PostOverview";
import Description from "./Description";
import Publish from "./Publish";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function PostProject() {
    const [step, setStep] = useState(0);
    const {formData} = useSelector((state: RootState) => state.freelancer);

    useEffect(() => {
        console.log("Current step:", step);
        console.log("formData in parent:", formData);
    }, [step, formData]);

    const nextStep = () => {
        console.log("Moving to next step");
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        console.log("Moving to previous step");
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = () => {
        try {
            const finalData = { ...formData };
            console.log("Submitting finalData:", finalData);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <Overview onNext={nextStep} />;
            case 1:
                return <Description onNext={nextStep} onPrev={prevStep} />;
            case 2:
                return <Publish />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-[70rem] mx-auto mt-12 flex flex-col items-center">
            {renderStep()}

            <div className="flex justify-between w-full mt-8">
                <Button onClick={prevStep} disabled={step === 0}>
                    Back
                </Button>
                {/* {step < 2 && <Button onClick={nextStep}>Next</Button>} */}
                {step === 2 && <Button onClick={handleSubmit}>Submit</Button>}
            </div>
        </div>
    );
}
