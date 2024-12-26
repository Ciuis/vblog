import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
    displayEditPostImage: boolean;
    displayTagPeople: boolean;
    displayGif: boolean;
}

const initialState:ModalSliceState = {
    displayEditPostImage: false,
    displayTagPeople: false,
    displayGif: false
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
        },

        updateDisplayGif(state) {
            state = {
                ...state,
                displayGif: !state.displayGif
            }

            return state;
        }
    }
});

export const {updateDisplayEditPostImage, updateDisplayTagPeople, updateDisplayGif} = ModalSlice.actions;

export default ModalSlice.reducer;