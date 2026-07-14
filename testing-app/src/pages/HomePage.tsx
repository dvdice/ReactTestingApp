import classes from "../styles/page-styles/Home.module.css"
import Header from "../UI/Header.tsx";
import NavButton from "../components/NavButton.tsx";

const HomePage = () => {
    return (
        <>
            <Header/>
            <div className={classes.root}>
                <h1>Добро пожаловать на Testorio!</h1>

                <NavButton to="/quiz" buttonText="Начать тест!"/>
            </div>
        </>

    );
};

export default HomePage;