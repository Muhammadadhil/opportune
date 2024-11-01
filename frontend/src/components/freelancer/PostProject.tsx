import { useState, useEffect } from "react";
import { PostTitle } from "./PostTitle";
import { PostDescription } from "./PostDescription";
import Publish from "./PostPublish";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const steps = ["Title & Category", "Description & Pricing", "Overview"];

export default function PostProject() {
    const [step, setStep] = useState(0);
    const { formData } = useSelector((state: RootState) => state.post);

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
                return <PostTitle onNext={nextStep} />;
            case 1:
                return <PostDescription onNext={nextStep} onPrev={prevStep} />;
            case 2:
                return <Publish onPrev={prevStep} handleSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-[70rem] mx-auto mt-12 flex flex-col items-center">
            <div className="flex justify-evenly w-full mb-8 ">
                {steps.map((stepName, index) => (
                    <div key={stepName} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 cursor-pointer
                            ${index === step ? "bg-green-700 text-white" : "bg-gray-200 text-gray-600"}`}
                        >
                            {index + 1}
                        </div>
                        <span className={`text-sm ${index === step ? "font-medium" : "text-gray-500"}`}>{stepName}</span>
                    </div>
                ))}
            </div>
            {renderStep()}

            <div className="flex justify-between w-full mt-8">
                {/* <Button onClick={prevStep} disabled={step === 0}>
                    Back
                </Button> */}
                {/* {step < 2 && <Button onClick={nextStep}>Next</Button>} */}
                {/* {step === 2 && <Button onClick={handleSubmit}>Submit</Button>} */}
            </div>
        </div>
    );
}
