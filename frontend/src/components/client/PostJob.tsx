import { useState } from "react";
import { PostStep1 } from "./PostStep1";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { saveJobPost } from "@/api/jobsApi";
import Loading from "@/components/loading/Loading";
import { setIsLoading } from "@/store/slices/appSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearJobData } from "@/store/slices/postSlice";
import { PostStep2 } from "./PostStep2";

const steps = ["Job Title & Category", "Budget & Description"];

export default function PostJob() {
    const [step, setStep] = useState(0);
    const { jobData } = useSelector((state: RootState) => state.post);
    const { userInfo } = useSelector((state: RootState) => state.user);
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
            const data = { ...jobData, clientId: userInfo?._id };
            console.log("data jobPost:", data);
            setLoading(true);
            const response = await saveJobPost(data);
            console.log("gig Response:", response);
            dispatch(clearJobData());
            navigate("/cl/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error whille updating job post");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <PostStep1 onNext={nextStep} />;
            case 1:
                return <PostStep2 handleSubmitForm={handleSubmit} onPrev={prevStep} />;
            default:
                return null;
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex w-full h-screen items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <div className="max-w-[70rem] mx-auto mt-12 flex flex-col items-center">
                    <div className="flex justify-evenly w-full mb-8 ">
                        {steps.map((stepName, index) => (
                            <div key={stepName} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 cursor-pointer
                                ${index === step ? "bg-green-800 text-white" : "bg-gray-200 text-gray-600"}`}
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
