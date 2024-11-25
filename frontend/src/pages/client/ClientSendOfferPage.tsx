// import SendOffer from "@/components/client/SendOffer";
// import MaxWidth from "@/layouts/MaxWidth";

// const SendOfferPage = () => {
//     return (
//         <MaxWidth>
//             <div className="flex max-w-[60rem]">
//                 <SendOffer />
//             </div>
//         </MaxWidth>
//     );
// };

// export default SendOfferPage;


import SendOffer from "@/components/client/SendOffer";
import { FreelancerDetails } from "@/components/common/FreelancerDetailsCard";
import MaxWidth from "@/layouts/MaxWidth";

const SendOfferPage = () => {

    return (
        <MaxWidth>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full md:w-2/3">
                    <SendOffer />
                </div>
                <div className="w-full md:w-1/3 md:mt-20 mb-20">
                    <FreelancerDetails name="John Doe" imageUrl="/path-to-image.jpg" description="Experienced web developer specializing in React and Node.js with 5 years of industry experience." />
                </div>
            </div>
        </MaxWidth>
    );
};

export default SendOfferPage;

