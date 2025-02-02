// slice used when posting gigs and jobs

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/types/IProjectPost";

const initialState: RootState = {
    portfolioData: {
        title: "",
        description: "",
        skills: [],
        images: [],
        link:"",
    },
    jobData: {
        jobTitle: "",
        category: "",
        subCategory: "",
        skillsRequired: [],
        description: "",
        budget: 0,
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
                link:"",
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
                budget: 0,
                searchTags: [],
            };
        },
    },
});

export const { updatePostFormData, clearPostFormData, updateJobData, clearJobData } = postSlice.actions;

export default postSlice.reducer;
