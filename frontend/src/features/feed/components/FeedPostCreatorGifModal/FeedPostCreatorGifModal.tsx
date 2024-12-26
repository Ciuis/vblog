import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";
import { fetchGifCategories, updatePreview, updateSearchTerms } from "../../../../redux/Slices/GifSlice";

import { BottomlessModal } from "../../../../components/BottomlessModal/BottomlessModal";
import { FeedPostCreatorGifModalTop } from "../FeedPostCreatorGifModalTop/FeedPostCreatorGifModalTop";
import { FeedPostCreatorGifModalPreview } from "../FeedPostCreatorGifModalPreview/FeedPostCreatorGifModalPreview";
import { FeedPostCreatorGifModalDisplay } from "../FeedPostCreatorGifModalDisplay/FeedPostCreatorGifModalDisplay";

export const FeedPostCreatorGifModal:React.FC = () => {

    const state = useSelector((state:RootState) => state.gif);
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        return(() => {
            dispatch(updateSearchTerms(""));
        })
    }, []);

    useEffect(() => {

        if (state.gifCategories.length < 1) {
            dispatch(fetchGifCategories());
        }

        if (state.searchTerm) {
            dispatch(updatePreview(false));
        } else {
            dispatch(updatePreview(true));
        }
    }, [state.searchTerm]);

    return (
        <BottomlessModal
            topBar={<FeedPostCreatorGifModalTop/>}
            content={
                state.preview || state.gifs.length === 0 ?
                    <FeedPostCreatorGifModalPreview categories={state.gifCategories} /> :
                    <FeedPostCreatorGifModalDisplay gifs={state.gifs} />
            }
        />
    )
}