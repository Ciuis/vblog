import React from "react";

import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../../redux/Store";
import { updateDisplayTagPeople } from "../../../../redux/Slices/ModalSlice";

import './FeedPostCreatorTagPeopleModalTop.css';
import { Close } from "@mui/icons-material";

export const FeedPostCreatorTagPeopleModalTop:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(updateDisplayTagPeople());
    }

    return (
        <div className="feed-post-creator-tag-people-modal-top">
            <div className="feed-post-creator-tag-people-modal-top-left">
                <div className="feed-post-creator-tag-people-modal-top-close" onClick={closeModal}>
                    <Close sx={{
                        fontSize: "18px"
                    }} />
                </div>
                <p className="feed-post-creator-tag-people-modal-top-text">Отметить человека</p>
            </div>
            <button className="feed-post-creator-tag-people-modal-done" disabled>Готово</button>
        </div>
    )
}