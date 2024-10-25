import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../types/user";

const initialState: userState = {
    userInfo: null,
    freelancerData: {},
    clientData: {},
    isAdminAuthenticated: false,
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
        setClientData: (state, action) => {
            state.clientData = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            state.freelancerData = {};
            localStorage.removeItem("token");
        },
        setAdminAuthStatus: (state) => {
            state.isAdminAuthenticated = true;
        },
    },
});

export const { setCredentials, logout, setFreelancerData, setClientData, setAdminAuthStatus } = userSlice.actions;

export default userSlice.reducer;
