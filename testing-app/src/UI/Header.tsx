import classes from "../styles/ui-styles/Header.module.css"
import classnames from "classnames"
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                <NavLink className={classnames(classes.logo, classes.links)} to="/">
                    <img src="/favicon.svg" alt="logo"/>
                    <span>Testorio</span>
                </NavLink>

                <nav className="header__nav">
                    <ul className={classes.header__nav__list}>
                        <li className={classes.header__nav__item}>
                            <NavLink className={classes.links} to="/variants">Варианты</NavLink>
                        </li>

                        <li className={classes.header__nav__item}>
                            <NavLink className={classes.links} to="/contacts">Контакты</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;