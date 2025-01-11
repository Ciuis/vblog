import React, {useEffect, useRef, useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";

import { updateDisplayGif } from "../../../../redux/Slices/ModalSlice";
import { clearGifs, fetchGifsByTerm, updateSearchTerms } from "../../../../redux/Slices/GifSlice";

import { Close, Search } from "@mui/icons-material";
import './FeedPostCreatorGifModalTop.css';


export const FeedPostCreatorGifModalTop:React.FC = () => {

    const searchTerm = useSelector((state:RootState) => state.gif.searchTerm);

    const dispatch:AppDispatch = useDispatch();

    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        if (!inputFocused) setInputFocused(true);
    }

    const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        const relatedTarget:any = e.nativeEvent.relatedTarget;

        if (relatedTarget && relatedTarget.id === 'clear') {
            clearInput();
        } else {
            setInputFocused(false);
        }
    }

    const handleKeyUp = () => {
        if (timer) {
            clearTimeout(timer);
        }
        let t = setTimeout(searchForGifs, 1000);
        setTimer(t);
    }

    const searchForGifs = () => {
        if (inputRef && inputRef.current && inputRef.current.value !== '') {
            dispatch(fetchGifsByTerm(inputRef.current.value));
        }
    }

    const handleChangeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchTerms(e.target.value));
    }

    const handleCloseModal = () => {
        dispatch(updateDisplayGif());
    }

    const clearInput = () => {
        dispatch(updateSearchTerms(""));
        dispatch(clearGifs());
        setInputFocused(true);

        if (inputRef && inputRef.current) inputRef.current.focus();
    }

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return (
        <div className="feed-post-creator-gif-modal-top">
            <div className="feed-post-creator-gif-modal-top-close-bg" onClick={handleCloseModal}>
                <Close sx={{fontSize: '20px'}} />
            </div>
            <label htmlFor='gif-search' className={inputFocused ? "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-active" : "feed-post-creator-gif-modal-top-input-wrapper input-wrapper-inactive"}>
                <div className="feedf-post-creator-gif-modal-search">
                    <Search sx={{fontSize: '20px', color:'rgb(83, 100, 113'}} />
                    <input id='gif-search' style={!inputFocused && searchTerm.length > 0 ? {width: `${searchTerm.length + 1}ch`} : undefined} className="feed-post-creator-gif-modal-top-input" placeholder="Искать GIF" 
                        value={searchTerm} onChange={handleChangeValue} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} onKeyUp={handleKeyUp}/>
                    {searchTerm && inputFocused ? <div className="feed-post-creator-gif-modal-top-clear-border">
                        <button id="clear" className="feed-post-creator-gif-modal-top-clear-input">x</button>
                    </div> : <></>}
                </div>
            </label>
        </div>
    )
}