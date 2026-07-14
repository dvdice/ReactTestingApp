import Header from "../UI/Header.tsx";
import styles from "../styles/page-styles/Home.module.css";
import NavButton from "../components/NavButton.tsx";

const NotFoundPage = () => {
    return (
        <>
            <Header/>
            <div className={styles.root}>
                <h1>Ошибочка, такой страницы не существует :(</h1>
                
                <NavButton to="/" buttonText="Вернуться на главную страницу"/>
            </div>
        </>
    );
};

export default NotFoundPage;