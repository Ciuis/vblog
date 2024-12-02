import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { setToken } from "../redux/Slices/UserSlice";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { Navigation } from "../components/Navigation/Navigation";

import './Home.css';

export const Home:React.FC = () => {

    const state = useSelector((state:RootState) => state.user);
    const dispatch:AppDispatch = useDispatch();

    const navigate = useNavigate();

    const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

    useEffect(() => {
        if (jwt === '' && state.token !== '') {
            //console.log("There is no tokens in local storage but there is one in state");
            //console.log("that means the user just logged in, store token in local storeage");
            setJwt(state.token);
        } else if (jwt !== '' && state.token === '') {
            //console.log("User returned to website and logged in");
            //console.log("need to store the token in the userSlice");
            dispatch(
                setToken(jwt)
            );
        } else {
            //console.log("User is not logged in");
            //console.log("navigate to the login page");
            navigate("/");
        }
    }, []);

    return (
        <div className="home">
            <div className="home-layout">
                <div className="home-navigation-section">
                    <Navigation/>
                </div>
                <div className="home-content-section">

                </div>
                <div className="home-info-section">

                </div>
            </div>
        </div>
    )
};