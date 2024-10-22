import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../types/user";

const initialState: userState = {
    userInfo: null,
    freelancerData: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            // localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        setFreelancerData: (state, action) => {
            state.freelancerData = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            state.freelancerData = {};
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout, setFreelancerData } = userSlice.actions;

export default userSlice.reducer;
