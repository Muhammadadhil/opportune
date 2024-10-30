import { createSlice } from "@reduxjs/toolkit";
import { OverviewData } from "@/types/IPostOverview";

interface RootState {
    formData: OverviewData;
}

const initialState: RootState = {
    formData: {
        workTitle: "",
        category: "",
        subCategory: "",
        searchTags: "",
        keywords: [],
    },
};


export const freelancerSlice = createSlice({
    name: "freelancer",
    initialState,
    reducers: {
        updatePostFormData:(state,action)=>{

            console.log('action.payload:',action.payload)

            state.formData=action.payload;
        }
    },
});

export const { updatePostFormData } = freelancerSlice.actions;

export default freelancerSlice.reducer;
