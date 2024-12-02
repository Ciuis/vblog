import styled from "styled-components";
import { ModuleButtonProperties } from "../../utils/GlobalInterfaces";

export const ModuleButton = styled.button<ModuleButtonProperties>`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.height / 2}px`};
  color: ${(props) => props.fontColor};
  border: ${(props) => props.borderColor ? `solid 1px ${props.borderColor}` : `none`};
  background-color: ${(props) => props.backgroundColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => `${props.fontSize}px`};

  &:hover {
    cursor: ${(props) => props.active ? 'pointer' : 'auto'};
    background-color: ${(props) =>
      props.active
        ? `rgba(${props.hoverBackground.r}, ${props.hoverBackground.g}, ${props.hoverBackground.b}, ${props.hoverBackground.a})`
        : props.backgroundColor};
    border: ${(props) =>
      props.hoverBorder && props.active
        ? `solid 1px rgba(${props.hoverBorder.r}, ${props.hoverBorder.g}, ${props.hoverBorder.b}, ${props.hoverBorder.a})`
        : 'none'};
  }
`;