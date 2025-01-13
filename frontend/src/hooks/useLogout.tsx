import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/userSlice";

export const useLogout = () => {
    const dispatch = useDispatch();

    const logoutTheUser = () => {
        dispatch(logoutUser());
    };

    return logoutTheUser;
};
