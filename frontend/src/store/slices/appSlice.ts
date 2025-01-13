import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    theme: "light",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { setIsLoading, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
