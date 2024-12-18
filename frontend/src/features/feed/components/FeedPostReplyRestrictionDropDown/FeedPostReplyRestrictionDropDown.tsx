import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/Store";
import { updateCurrentPost } from "../../../../redux/Slices/PostSlice";

import { getReplyDropDownButton } from "../../utils/FeedUtils";

import './FeedPostReplyRestrictionDropDown.css';

import { Check } from "@mui/icons-material";

import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import PeopleYouFollowSVG from "../../../../components/SVGs/PeopleYouFollowSVG";
import MentionedSVG from "../../../../components/SVGs/MentionedSVG";

export const FeedPostReplyRestrictionDropDown:React.FC = () => {

    const state = useSelector((state:RootState) => state.post);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [selection, setSelection] = useState<string>("Everyone");

    const handleOpenModal = () => {
        setActive(!active);
    }

    const handleChangeSelection = (e:React.MouseEvent<HTMLDivElement>) => {
        setSelection(e.currentTarget.id);
        dispatch(updateCurrentPost({
            name: "replyRestriction",
            value: e.currentTarget.id.toUpperCase()
        }));
        setActive(false);
    }

    return (
        <div className="feed-post-reply-restriction-drop-down">
            {getReplyDropDownButton(state, handleOpenModal)}
            <div className="feed-post-reply-restriction-drop-down-modal"style={{display: active? "block" : "none"}}>
                <h2 className="feed-post-reply-restriction-drop-down-title">Кто может комментировать пост?</h2>
                <p className="feed-post-reply-restriction-drop-down-sub-title">Выберите кто может оставлять комментарии.</p>
                <p className="feed-post-reply-restriction-drop-down-sub-title">Люди, которых вы упомянули, всегда могут отвечать.</p>
                <div id="Everyone" className="feed-post-reply-restriction-drop-down-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-drop-down-choice-left">
                        <div className="feed-post-reply-restrinction-drop-down-choice-bg">
                            <GlobeSVG height={20} width={20} color={"#FFF"} />
                        </div>
                        <p className="feed-post-reply-restriction-drop-down-choice-text">Все</p>
                    </div>
                    {selection === "Everyone" ? <Check sx={{
                        color: "#1DA1F2",
                        fontSize: "18px"
                    }}/> : <></>}
                </div>
                <div id="Follow" className="feed-post-reply-restriction-drop-down-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-drop-down-choice-left">
                        <div className="feed-post-reply-restrinction-drop-down-choice-bg">
                            <PeopleYouFollowSVG height={20} width={20} color={"#FFF"} />
                        </div>
                        <p className="feed-post-reply-restriction-drop-down-choice-text">Люди, на которых вы подписаны</p>
                    </div>
                    {selection === "Follow" ? <Check sx={{
                        color: "#1DA1F2",
                        fontSize: "18px"
                    }}/> : <></>}
                </div>
                <div id="Mention" className="feed-post-reply-restriction-drop-down-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-drop-down-choice-left">
                        <div className="feed-post-reply-restrinction-drop-down-choice-bg">
                            <MentionedSVG height={20} width={20} color={"#FFF"} />
                        </div>
                        <p className="feed-post-reply-restriction-drop-down-choice-text">Люди, которых вы упомянули</p>
                    </div>
                    {selection === "Mention" ? <Check sx={{
                        color: "#1DA1F2",
                        fontSize: "18px"
                    }}/> : <></>}
                </div>
            </div>
        </div>
    )
}