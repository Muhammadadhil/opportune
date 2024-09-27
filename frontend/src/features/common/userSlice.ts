import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    userType: string | null;
    userInfo:userInfo | null;
}

export interface userInfo {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    country:string;
}

const initialState: userState = {
    userType: null,
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null,
};

export const userTypeSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
    },
});

export const { setUserType,setCredentials,logout } = userTypeSlice.actions;

export default userTypeSlice.reducer;
