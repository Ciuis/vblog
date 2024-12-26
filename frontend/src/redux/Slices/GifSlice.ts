import { PayloadAction, createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

import { TENOR_KEY } from "../../config";
import { TenorCategories } from "../../utils/GlobalInterfaces";

interface GifSliceState {
    searchTerm: string;
    preview: boolean;
    next: string;
    gifs: string[];
    gifCategories: TenorCategories[];
    loading: boolean;
    error: boolean;
}

const initialState:GifSliceState = {
    searchTerm: "",
    preview: true,
    next: "",
    gifs: [],
    gifCategories: [],
    loading: false,
    error: false
}

export const fetchGifCategories = createAsyncThunk(
    'gif/category',
    async (payload, thunkAPI) => {
        try {
            let clientKey = 'vblog';
            let url = `https://tenor.googleapis.com/v2/categories?key=${TENOR_KEY}&client_key=${clientKey}`;

            let result = await axios.get(url);

            let data = [];

            for (let i = 0; i < 8; i++) {
                data.push(result.data.tags[i]);
            }

            console.log(data);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const fetchGifsByTerm = createAsyncThunk(
    'gif/term',
    async(payload:string, thunkAPI) => {
        try {
            let clientKey = 'vblog';
            let searchUrl = `https://tenor.googleapis.com/v2/search?q=${payload}&key=${TENOR_KEY}&client_key=${clientKey}&limit=32`;

            let result = await axios.get(searchUrl);

            return {
                data: result.data,
                term: payload
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const GifSlice = createSlice({
    name: "gif",
    initialState,
    reducers: {
        updateSearchTerms(state, action:PayloadAction<string>) {
            state.searchTerm = action.payload;
        },

        updatePreview(state, action:PayloadAction<boolean>) {
            state.preview = action.payload;
        },

        clearGifs(state) {
            state.gifs = [];
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchGifCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.gifCategories = action.payload;
        });

        builder.addCase(fetchGifsByTerm.fulfilled, (state, action) => {
            let results = action.payload.data.results;

            let gifUrls:string[] = [];

            results.forEach((item:any) => {
                gifUrls.push(item.media_formats.gif.url);
            });

            state = {
                ...state,
                searchTerm: action.payload.term,
                gifs: gifUrls,
                next: action.payload.data.next,
                loading: false
            }

            return state;
        });
        
        builder.addMatcher(isPending, (state, action) => {
            state.loading = true;
            state.error = false;
        });
        
        builder.addMatcher(isRejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    }
});

export const {updateSearchTerms, updatePreview, clearGifs} = GifSlice.actions;

export default GifSlice.reducer;