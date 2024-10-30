import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/types/IProjectPost";

const initialState: RootState = {
    formData: {
        workTitle: "",
        category: "",
        subCategory: "",
        keywords: [],
        images: [],
        deliveryTime: "",
        description: "",
        price: "",
        requirements: [],
    },
};

export const freelancerSlice = createSlice({
    name: "freelancer",
    initialState,
    reducers: {
        updatePostFormData: (state, action) => {
            console.log("action.payload:", action.payload);
            state.formData = action.payload;
        },
    },
});

export const { updatePostFormData } = freelancerSlice.actions;

export default freelancerSlice.reducer;