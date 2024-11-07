import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/types/IProjectPost";

const initialState: RootState = {
    formData: {
        title: "",
        category: "",
        subCategory: "",
        searchTags: [],
        images: [],
        deliveryTime: "",
        description: "",
        price: "",
        requirements: [],
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
    name: "freelancer",
    initialState,
    reducers: {
        updatePostFormData: (state, action) => {
            console.log("action.payload:", action.payload);
            state.formData = action.payload;
        },
        clearPostFormData: (state) => {
            state.formData = {
                title: "",
                category: "",
                subCategory: "",
                searchTags: [],
                images: [],
                deliveryTime: "",
                description: "",
                price: "",
                requirements: [],
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
