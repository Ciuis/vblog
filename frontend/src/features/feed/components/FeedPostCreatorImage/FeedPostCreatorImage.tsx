import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateCurrentPostImages } from "../../../../redux/Slices/PostSlice";
import { updateDisplayEditPostImage } from "../../../../redux/Slices/ModalSlice";

import './FeedPostCreatorImage.css';

import { Close } from "@mui/icons-material";

interface FeedPostCreatorImageProperties {
    image: string;
    name: string;
}

export const FeedPostCreatorImage:React.FC<FeedPostCreatorImageProperties> = ({image, name}) => {

    const state = useSelector((state:RootState) => state.post);
    const dispatch:AppDispatch = useDispatch();

    const removeImage = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        let imageArrayCopy:File[] = state.currentPostImages;

        imageArrayCopy = imageArrayCopy.filter((img) => img.name !== name);

        dispatch(updateCurrentPostImages(imageArrayCopy));
    }

    const editImage = () => {
        dispatch(updateDisplayEditPostImage());
    }

    return (
        <div className="feed-post-creator-image" style={{backgroundImage: `url(${image})`}} onClick={editImage}>
            <div className="feed-post-creator-image-clear" onClick={removeImage}>
                <Close sx={{
                    fontSize: "18px",
                    color: "white"
                }}/>
            </div>
            <div className="feed-post-creator-image-edit" onClick={editImage}>
                Редактировать
            </div>
        </div>
    )
}