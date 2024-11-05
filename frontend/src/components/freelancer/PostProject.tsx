import { useState } from "react";
import { PostTitle } from "./PostTitle";
import { PostDescription } from "./PostDescription";
import Publish from "./PostPublish";
// import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { saveProjectPost } from "@/api/userApi";
import convertToFormData from "@/helpers/convertToFormData";
import LoadingBars from "@/components/loading/Loading";
import { setIsLoading } from "@/store/slices/appSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearPostFormData } from "@/store/slices/postSlice";

const steps = ["Title & Category", "Description & Pricing", "Overview"];

export default function PostProject() {
    const [step, setStep] = useState(0);
    const { formData } = useSelector((state: RootState) => state.post);
    const { freelancerData } = useSelector((state: RootState) => state.user);
    const { isLoading } = useSelector((state: RootState) => state.app);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setLoading = (state: boolean) => {
        dispatch(setIsLoading(state));
    };

    const nextStep = () => {
        setStep((prev) => Math.min(prev + 1, 2));
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        try {
            const data = { ...formData };
            console.log('data in post gig:',data);
            setLoading(true);
            const formData1 = await convertToFormData(data);
            formData1.append("freelancerId", freelancerData?.userId);
            const response = await saveProjectPost(formData1);
            console.log("gig Response:", response);
            dispatch(clearPostFormData());
            navigate("/fr/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error in saving project");
        } finally {
            setLoading(false);
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
        <>
            {isLoading ? (
                <div className="flex w-full h-screen items-center justify-center">
                    <LoadingBars />
                </div>
            ) : (
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
                </div>
            )}
        </>
    );
}
