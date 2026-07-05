import Header from "../UI/Header.tsx";
import classes from "../styles/page-styles/Home.module.css";
import CustomButton from "../UI/CustomButton.tsx";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <Header/>
            <div className={classes.root}>
                <h1>Ошибочка, такой страницы не существует :(</h1>

                <NavLink to="/">
                    <CustomButton text="Вернуться на главную страницу"/>
                </NavLink>
            </div>
        </>
    );
};

export default NotFoundPage;