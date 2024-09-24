import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    userType: string | null;
}

const initialState: userState = {
    userType: null,
};

export const userTypeSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
    },
});

export const { setUserType } = userTypeSlice.actions;

export default userTypeSlice.reducer;
