import styled from "styled-components";

interface FeedPostCreatorProgressProperties {
    percent: number;
}

export const FeedPostCreatorProgress = styled.div<FeedPostCreatorProgressProperties>`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: ${(props) => 
        `radial-gradient(closest-side, white 80%, transparent 80% 100%),
        conic-gradient(#1DA1F2 ${props.percent}%, #E1E8ED 0)`
    }
`