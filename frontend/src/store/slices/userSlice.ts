import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../interfaces/user";

const initialState: userState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
    freelancerData: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        setFreelancerData: (state, action) => {
            state.freelancerData = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            state.freelancerData = {};
            localStorage.removeItem("userInfo");
        },
    },
});

export const { setCredentials, logout, setFreelancerData } = userSlice.actions;

export default userSlice.reducer;
