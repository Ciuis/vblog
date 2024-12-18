import React from "react";

import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../../redux/Store";
import { updateDisplayEditPostImage } from "../../../../redux/Slices/ModalSlice";

import './FeedPostCreatorEditImageModalTop.css';

import { ArrowBack } from "@mui/icons-material";



export const FeedPostCreatorEditImageModalTop:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(updateDisplayEditPostImage());
    }

    return (
        <div className="feed-post-creator-edit-image-modal-top">
            <div className="feed-post-creator-edit-image-modal-top-left">
                <div className="feed-post-creator-edit-image-modal-top-back" onClick={closeModal}>
                    <ArrowBack sx={{fontSize: "18px"}} />
                </div>
                <p className="feed-post-creator-edit-image-modal-top-text">Обрезать изображение</p>
            </div>
            <button className="feed-post-creator-edit-image-modal-save" onClick={closeModal}>Сохранить</button>
        </div>
    )
}