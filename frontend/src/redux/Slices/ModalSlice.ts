import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
    displayEditPostImage: boolean;
    displayTagPeople: boolean;
}

const initialState:ModalSliceState = {
    displayEditPostImage: false,
    displayTagPeople: false
}

export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        updateDisplayEditPostImage(state) {
            state = {
                ...state,
                displayEditPostImage: !state.displayEditPostImage
            }

            return state;
        },

        updateDisplayTagPeople(state) {
            state = {
                ...state,
                displayTagPeople: !state.displayTagPeople
            }

            return state;
        }
    }
});

export const {updateDisplayEditPostImage, updateDisplayTagPeople} = ModalSlice.actions;

export default ModalSlice.reducer;