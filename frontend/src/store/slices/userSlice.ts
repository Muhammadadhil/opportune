import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../types/Iuser";

const initialState: userState = {
    userInfo: null,
    freelancerData: {
        userId: "",
        title: "",
        skills: [],
        accounts: {},
        image: "",
        imageUrl:""
    },
    clientData: {},
    isAdminAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
        },
        setFreelancerData: (state, action) => {
            state.freelancerData = action.payload;
        },
        setClientData: (state, action) => {
            state.clientData = action.payload;
        },
        logoutUser: (state) => {
            state.userInfo = null;
            state.freelancerData = {
                userId:"",
                title:"",
                accounts:"",
                image:"",
                skills:[]
            };
            state.clientData = {};
            localStorage.removeItem("token");
        },
        setAdminAuthStatus: (state) => {
            state.isAdminAuthenticated = !state.isAdminAuthenticated;
        },
    },
});

export const { setCredentials, logoutUser, setFreelancerData, setClientData, setAdminAuthStatus } = userSlice.actions;

export default userSlice.reducer;
