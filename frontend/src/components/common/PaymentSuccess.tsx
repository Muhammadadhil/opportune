import { useSearchParams } from "react-router-dom";
import SuccessPage from "./SuccessPage";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    return (
        <SuccessPage defaultMessage={`Payment Successful!  Session ID: ${sessionId}`} defaultRedirectPath="/cl/manage-jobs"/>
    );
};

export default PaymentSuccess;
