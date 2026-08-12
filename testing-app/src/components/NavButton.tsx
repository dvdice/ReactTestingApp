import {NavLink} from "react-router-dom";
import Button from "../UI/Button.tsx";

interface NavButtonProps {
    to: string;
    buttonText: string;
}

const NavButton = ({ to, buttonText } : NavButtonProps) => {
    return (
        <NavLink to={to}>
            <Button text={buttonText}/>
        </NavLink>
    );
};

export default NavButton;