import React, {useEffect, useRef, useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { fetchNextGifs } from "../../../../redux/Slices/GifSlice";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";
import { updateDisplayGif } from "../../../../redux/Slices/ModalSlice";

import { FeedPostCreatorFrozenGif } from "../FeedPostCreatorFrozenGif/FeedPostCreatorFrozenGif";
import { PostImage } from "../../../../utils/GlobalInterfaces";

import './FeedPostCreatorGifModalDisplay.css';


interface FeedPostCreatorGifModalDisplayProperties {
    gifs: string[];
}

export const FeedPostCreatorGifModalDisplay:React.FC<FeedPostCreatorGifModalDisplayProperties> = ({gifs}) => {

    const state = useSelector((state:RootState) => state.gif);
    const dispatch:AppDispatch = useDispatch();
    
    const [autoPlay, setAutoPlay] = useState<boolean>(true);

    const hiddenDiv = useRef<HTMLDivElement>(null);

    const loadNextGifs = (entries:any) => {
        entries.forEach((entry:any) => {
            if (entry.isIntersecting) {
                dispatch(fetchNextGifs({
                    term: state.searchTerm,
                    next: state.next
                }));
            }
        })
    }

    const toggleAutoPlay = () => {
        setAutoPlay(!autoPlay);
    }

    const attachGifToPost = (e:React.MouseEvent<HTMLImageElement>) => {
        let postImage:PostImage = {
            imageId: 0,
            imageName: `${state.searchTerm}-gif`,
            imageType: 'gif',
            imageUrl: e.currentTarget.id
        }

        let imgs = [postImage];
        dispatch(updateCurrentPost({
            name: 'images',
            value: imgs
        }));

        dispatch(updateDisplayGif());
    }

    useEffect(() => {
        if (hiddenDiv && hiddenDiv.current) {
            const observer = new IntersectionObserver(loadNextGifs, {
                root: null,
                threshold: 1
            });

            const target = hiddenDiv.current;
            observer.observe(target);
        }
    }, [])
    
    return (
        <div className="feed-post-creator-gif-modal-display">
            <div className="feed-post-creator-gif-modal-display-auto-selection">
                <p className="feed-post-creator-gif-modal-display-auto-text">Автоматически проигрывать GIF'ы</p>
                <label className="feed-post-creator-gif-modal-switch">
                    <input type="checkbox" onClick={toggleAutoPlay} checked={autoPlay} readOnly />
                    <span className="feed-post-creator-gif-modal-slider"></span>
                </label>
            </div>
            <div className="feed-post-creator-gif-modal-diplay-gif-container">
                {
                    autoPlay ? 
                        gifs.map((gif) => <img className="feed-post-creator-gif-modal-display-gif" key={gif} src={gif} id={gif} onClick={attachGifToPost} />)
                        :
                        gifs.map((gif) => <FeedPostCreatorFrozenGif image={gif} text={state.searchTerm} />)
                }
            </div>
            <div id="autoload" ref={hiddenDiv} hidden={state.gifs.length === 0}></div>
        </div>
    )
}