import SuccessPage from "./SuccessPage";

const PaymentSuccess = () => {
    
    return (
        <SuccessPage defaultMessage={`Payment Successful!`} defaultRedirectPath="/cl/manage-jobs"/>
    );
};

export default PaymentSuccess;
