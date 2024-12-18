import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { setToken, getUserByToken } from "../redux/Slices/UserSlice";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";
import { FeedPostCreatorEditImageModal } from "../features/feed/components/FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal";
import { FeedPostCreatorTagPeopleModal } from "../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal";

import './Home.css';


export const Home:React.FC = () => {

    const state = useSelector((state:RootState) => state.user);
    const displayEditImageModal = useSelector((state:RootState) => state.modal.displayEditPostImage);
    const displayTagPeopleModal = useSelector((state:RootState) => state.modal.displayTagPeople);
    const dispatch:AppDispatch = useDispatch();

    const navigate = useNavigate();

    const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

    useEffect(() => {
        if (jwt !== '' && state.token !== '') {
            dispatch(
                getUserByToken(state.token)
            );
        } else if (jwt === '' && state.token !== '') {
            setJwt(state.token);
        } else if (jwt !== '' && state.token === '') {
            dispatch(
                setToken(jwt)
            );
        } else {
            navigate("/");
        }
    }, [state.token]);

    return (
        <div className="home">
            {displayEditImageModal && <FeedPostCreatorEditImageModal />}
            {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
            <div className="home-layout">
                <div className="home-navigation-section">
                    <Navigation/>
                </div>
                <div className="home-content-section">
                    <Feed />
                </div>
                <div className="home-info-section">

                </div>
            </div>
        </div>
    )
};