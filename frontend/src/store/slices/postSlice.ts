// slice used when posting gigs and jobs

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/types/IProjectPost";

const initialState: RootState = {
    portfolioData: {
        title: "",
        description: "",
        skills: [],
        images: [],
    },
    jobData: {
        jobTitle: "",
        category: "",
        subCategory: "",
        skillsRequired: [],
        description: "",
        budget: "",
        searchTags: [],
    },
};

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        updatePostFormData: (state, action) => {
            console.log("action.payload:", action.payload);
            state.portfolioData = action.payload;
        },
        clearPostFormData: (state) => {
            state.portfolioData = {
                title: "",
                description: "",
                skills: [],
                images: [],
            };
        },
        updateJobData: (state, action) => {
            state.jobData = action.payload;
        },
        clearJobData: (state) => {
            state.jobData = {
                jobTitle: "",
                category: "",
                subCategory: "",
                skillsRequired: [],
                description: "",
                budget: "",
                searchTags: [],
            };
        },
    },
});

export const { updatePostFormData, clearPostFormData, updateJobData, clearJobData } = postSlice.actions;

export default postSlice.reducer;
