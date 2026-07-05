import classes from "../styles/ui-styles/CustomButton.module.css"

interface CustomButtonProps {
    text: string;
    width?: number;
}

const CustomButton = ({text, width = 360 }: CustomButtonProps) => {
    return (
        <button
            className={classes.btn}
            style={{'--btn-width': `${width}px`}}
        >
            { text }
        </button>
    );
};

export default CustomButton;