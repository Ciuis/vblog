import React from "react";

import { Module } from "../../../../components/Module/Module";
import { FeedPostCreatorTagPeopleModalTop } from "../FeedPostCreatorTagPeopleModalTop/FeedPostCreatorTagPeopleModalTop";

export const FeedPostCreatorTagPeopleModal:React.FC = () => {
    return (
        <Module
            topContent={<FeedPostCreatorTagPeopleModalTop />}
            content={<>Content</>}
            bottomContent={<>Bottom content</>}
        />
    )
}