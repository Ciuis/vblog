import React from "react";

import { Module } from "../../../../components/Module/Module";
import { FeedPostCreatorEditImageModalTop } from "../FeedPostCreatorEditImageModalTop/FeedPostCreatorEditImageModalTop";

export const FeedPostCreatorEditImageModal:React.FC = () => {
    return (
        <Module
            topContent={<FeedPostCreatorEditImageModalTop/>}
            content={<>Content</>}
            bottomContent={<>Bottom</>}
        />
    )
}