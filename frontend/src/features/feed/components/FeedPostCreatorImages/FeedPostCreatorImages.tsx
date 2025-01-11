import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateDisplayEditPostImage, updateDisplayTagPeople } from "../../../../redux/Slices/ModalSlice";

import { createImageContainer, displayTagPeople } from "../../utils/FeedUtils";

import { FeedPostCreatorImage } from "../FeedPostCreatorImage/FeedPostCreatorImage";

import './FeedPostCreatorImages.css';

import ListsSVG from "../../../../components/SVGs/ListsSVG";

export const FeedPostCreatorImages:React.FC = () => {
    
    const postState = useSelector((state:RootState) => state.post);

    const dispatch:AppDispatch = useDispatch();

    const imageContainer = useMemo(() => createImageContainer(postState.currentPostImages), [postState.currentPostImages]);

    const toggleTagPeopleModal = () => {
        dispatch(updateDisplayTagPeople());
    }

    const toggleEditImageModal = () => {
        dispatch(updateDisplayEditPostImage());
    }
    
    return (
        <div className="feed-post-creator-images">
            {postState.currentPost?.images.length === 0 ? imageContainer : 
                <div className="feed-post-creator-images-container container-odd">
                    <FeedPostCreatorImage image={postState.currentPost?.images[0].imageUrl || ''} name={postState.currentPost?.images[0].imageName || ''} type={'gif'} />
                </div>}
            <div className="feed-post-creator-images-options">
                {displayTagPeople(postState, toggleTagPeopleModal)}
                <p className="feed-post-creator-images-option" onClick={toggleEditImageModal}>
                    <ListsSVG width={16} height={16} color={"#536471"} />
                        Добавить описание
                </p>
            </div>
        </div>
    )
}