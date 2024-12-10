import { store } from "../store/store";
import { logoutUser } from "@/store/slices/userSlice";

export const logoutTheUser = () => {
    store.dispatch(logoutUser());
};
