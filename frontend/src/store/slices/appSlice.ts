import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    theme: localStorage.getItem("theme") || "light",
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
            localStorage.setItem("theme", state.theme);
        },
    },
});

export const { setIsLoading, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
