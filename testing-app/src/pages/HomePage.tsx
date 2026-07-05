import classes from "../styles/page-styles/Home.module.css"
import Header from "../UI/Header.tsx";
import CustomButton from "../UI/CustomButton.tsx";
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <Header/>
            <div className={classes.root}>
                <h1>Добро пожаловать на Testorio!</h1>

                <NavLink to="/quiz">
                    <CustomButton text="Начать тест!"/>
                </NavLink>
            </div>
        </>

    );
};

export default HomePage;