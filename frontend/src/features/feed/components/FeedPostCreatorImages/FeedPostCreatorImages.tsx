import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateDisplayEditPostImage, updateDisplayTagPeople } from "../../../../redux/Slices/ModalSlice";

import { createImageContainer } from "../../utils/FeedUtils";

import './FeedPostCreatorImages.css';

import TagPeopleSVG from "../../../../components/SVGs/TagPeopleSVG";
import ListsSVG from "../../../../components/SVGs/ListsSVG";

export const FeedPostCreatorImages:React.FC = () => {
    
    const postState = useSelector((state:RootState) => state.post);

    const dispatch:AppDispatch = useDispatch();

    const imageContainer = useMemo(() => createImageContainer(postState.currentPostImages), [postState.currentPostImages]);

    const toggleTagPeople = () => {
        dispatch(updateDisplayTagPeople());
    }

    const toggleEditImage = () => {
        dispatch(updateDisplayEditPostImage());
    }
    
    return (
        <div className="feed-post-creator-images">
            {imageContainer}
            <div className="feed-post-creator-images-options">
                <p className="feed-post-creator-images-option" onClick={toggleTagPeople}>
                    <TagPeopleSVG width={16} height={16} color={"#536471"} />
                        Отметить человека
                </p>
                <p className="feed-post-creator-images-option" onClick={toggleEditImage}>
                    <ListsSVG width={16} height={16} color={"#536471"} />
                        Добавить описание
                </p>
            </div>
        </div>
    )
}