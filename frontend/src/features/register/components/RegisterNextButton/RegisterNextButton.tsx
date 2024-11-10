import styled from "styled-components";

import { StyledNextButtonProperties } from "../../../../utils/GlobalInterfaces";

export const StyledNextButton = styled.button<StyledNextButtonProperties>`
    width: 75%;
    height: 52px;
    font-size: 16px;
    color: white;
    background-color: ${(props) => props.color === 'blue' ? props.theme.colors.blue : props.theme.colors.black};
    opacity: ${(props) => props.active ? 1.0 : .5};
    border-radius: 50px;
    cursor: ${(props) => props.active ? "pointer" : "auto"};
    transition: background-color 0.3s, opacity 0.3s;
`;