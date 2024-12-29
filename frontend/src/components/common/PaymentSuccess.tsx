import SuccessPage from "./SuccessPage";

const PaymentSuccess = () => {
    
    return (
        <SuccessPage defaultMessage={`Payment Successful! Your payment will be saved Escrow Account`} defaultRedirectPath="/cl/manage-jobs"/>
    );
};

export default PaymentSuccess;
