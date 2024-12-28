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
import { useLocation } from "react-router-dom";

const SendOfferPage = () => {

    const location = useLocation();
    
    const { application } = location.state;
    const freelancer = application?.freelancerDetails;


    return (
        <MaxWidth>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full md:w-2/3">
                    <SendOffer />
                </div>
                <div className="w-full md:w-1/3 md:mt-20 mb-20">
                    <FreelancerDetails name={freelancer.firstname + " " + freelancer.lastname} imageUrl="" description={freelancer.email} />
                </div>
            </div>
        </MaxWidth>
    );
};

export default SendOfferPage;

