import { SVGProperties } from "../../utils/GlobalInterfaces";

export default function PeopleYouFollowSVG(props:SVGProperties) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" width={props.width} height={props.height}>
            <g>
                <path fill={props.color ? props.color : "#000"} d="M14 6c0 2.21-1.791 4-4 4S6 8.21 6 6s1.791-4 4-4 4 1.79 4 4zm-4 5c-2.352 0-4.373.85-5.863 2.44-1.477 1.58-2.366 3.8-2.632 6.46l-.11 1.1h17.21l-.11-1.1c-.266-2.66-1.155-4.88-2.632-6.46C14.373 11.85 12.352 11 10 11zm12.223-5.89l-2.969 4.46L17.3 8.1l-1.2 1.6 3.646 2.73 4.141-6.21-1.664-1.11z"></path>
            </g>
        </svg>
    );
}