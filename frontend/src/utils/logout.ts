import { store } from "../store/store";
import { logoutUser } from "@/store/slices/userSlice";

export const logoutThUeser = () => {
    store.dispatch(logoutUser());
};
