import styled from "styled-components";

import { StyledInputProperties } from "../../utils/GlobalInterfaces";
import { determineStyledInputBorder, determineLabelColor } from "../../utils/DetermineStylesUtil";

export const StyledInputBox = styled.div<StyledInputProperties>`
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 56px;
    border: ${(props) => determineStyledInputBorder(props)};
`;

export const StyledInputLabel = styled.span<StyledInputProperties>`
    position: absolute;
    left: 10px;
    font-weight: 400;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: ${(props) => (props.active ? '13px' : '18px')};
    top: ${(props) => (props.active ? '5px' : '16px')};
    color: ${(props) => determineLabelColor(props)};
`;