import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../../types/IUserState";

const initialState: userState = {
    userInfo: null,
    freelancerData: {
        userId: "",
        title: "",
        skills: [],
        accounts: {},
        image: "",
        imageUrl: "",
        preferredJobs: [],
    },
    clientData: {
        userId: "",
        companyName: "",
        companyDescription: "",
        projectNeeds: [],
        website: "",
    },
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
            console.log('updating client state in reduxxxxxxxx:  ',action.payload);
            state.clientData = action.payload;
        },
        logoutUser: (state) => {
            state.userInfo = null;
            state.freelancerData = {
                userId:"",
                title:"",
                accounts:"",
                image:"",
                skills:[],
                preferredJobs:[]
            };
            state.clientData = {
                userId: "",
                companyName: "",
                companyDescription: "",
                projectNeeds: [],
                website: "",
            };
            localStorage.removeItem("token");
        },
        setAdminAuthStatus: (state) => {
            state.isAdminAuthenticated = !state.isAdminAuthenticated;
        },
    },
});

export const { setCredentials, logoutUser, setFreelancerData, setClientData, setAdminAuthStatus } = userSlice.actions;

export default userSlice.reducer;
