import React from "react";

import { FeedPostCreatorFrozenGif } from "../FeedPostCreatorFrozenGif/FeedPostCreatorFrozenGif";
import {TenorCategories} from '../../../../utils/GlobalInterfaces';

import './FeedPostCreatorGifModalPreview.css';

interface FeedPostCreatorGifModalPreviewProperties {
    categories: TenorCategories[];
}

export const FeedPostCreatorGifModalPreview:React.FC<FeedPostCreatorGifModalPreviewProperties> = ({categories}) => {
    return (
        <div className="feed-post-creator-gif-modal-preview">
            {categories.map((gif) => <FeedPostCreatorFrozenGif key={gif.searchterm} image={gif.image} text={gif.searchterm} />)}
        </div>
    )
}