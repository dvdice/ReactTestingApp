import styles from "../styles/ui-styles/Button.module.css"

interface ButtonProps {
    text: string;
    width?: number;
}

const Button = ({text, width = 360 }: ButtonProps) => {
    return (
        <button
            className={styles.btn}
            style={{'--btn-width': `${width}px`}}
        >
            { text }
        </button>
    );
};

export default Button;