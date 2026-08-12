import styles from "../styles/ui-styles/Header.module.css"
import classnames from "classnames"
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <NavLink className={classnames(styles.logo, styles.links)} to="/">
                    <img src="/favicon.svg" alt="logo"/>
                    <span>Testorio</span>
                </NavLink>

                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <NavLink className={styles.links} to="/variants">Варианты</NavLink>
                        </li>

                        <li className={styles.navItem}>
                            <NavLink className={styles.links} to="/contacts">Контакты</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;