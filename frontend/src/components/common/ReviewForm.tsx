import { submitReview } from "@/api/contracts";
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface ReviewFormProps {
    contractId: string;
    onSubmit: () => void;
}

export const ReviewForm = ({ contractId, onSubmit }: ReviewFormProps) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

        const { userInfo } = useSelector((state: RootState) => state.user);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitReview(contractId, rating, comment, userInfo?._id ?? '');
            toast.success("Review submitted successfully");
            onSubmit();
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
                    >
                        <Star className="w-8 h-8" fill={star <= rating ? "currentColor" : "none"} />
                    </button>
                ))}
            </div>
            <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience working on this project..." className="min-h-[100px]" required />
            <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full bg-green-700 hover:bg-green-600">
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
};
