import { IReview } from "@/types/IReview";
import { formatDate } from "@/utils/dateFormatter";

interface ReviewCardProps {
    review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4">
            <div className="mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <p>{review.reviewerId.firstname} {review.reviewerId.lastname}</p>
                        <p className="text-sm text-gray-500"> ({review.reviewerId.role})</p>
                    </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                    <p>{review.reviewerId.country}</p>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, index) => (
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={index < review.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`w-4 h-4 ${index < review.rating ? "text-yellow-500" : "text-gray-400"}`}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22l1.18-7.86-5-4.87 6.91-1L12 2z" />
                        </svg>
                    ))}
                </div>
                <p>{review.comment}</p>
                <p className="text-xs text-gray-500 text-end">{formatDate(new Date(review.createdAt))}</p>
            </div>
        </div>
    )
}

export default ReviewCard;