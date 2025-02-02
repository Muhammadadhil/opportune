// import { memo, useCallback, useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "@/api/contracts";

// const YourPaymentComponent = memo(() => {
//     const stripe = useStripe();
//     const elements = useElements();

//     console.log('stripe',stripe);
//     console.log('elements',elements);

//     const [isLoading, setIsLoading] = useState(false);

//     const handlePayment = useCallback(async () => {
//         // Prevent multiple simultaneous payment attempts
//         if (isLoading || !stripe || !elements) return;

//         try {
//             setIsLoading(true);
//             console.log("Processing payment...");

//             const { data } = await createPaymentIntent(100);

//             const cardElement = elements.getElement(CardElement);

//             if (!cardElement) {
//                 console.error("Card element not found");
//                 setIsLoading(false);
//                 return;
//             }

//             const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                     billing_details: {
//                         name: "bahir abdullah",
//                     },
//                 },
//             });

//             if (paymentResult.error) {
//                 console.error("Payment failed:", paymentResult.error);
//             } else {
//                 console.log("Payment succeeded:", paymentResult.paymentIntent);
//             }
//         } catch (err) {
//             console.error("Payment error:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [stripe, elements, isLoading]);

//     return (
//         <div>
//             <CardElement />
//             <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handlePayment} disabled={!stripe || !elements || isLoading}>
//                 {isLoading ? "Processing..." : "Pay 1000000"}
//             </button>
//         </div>
//     );
// });

// export default YourPaymentComponent;
