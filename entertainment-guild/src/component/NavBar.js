import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Logo</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/books">Books</NavLink>
                </li>
                <li>
                    <NavLink to="/games">Games</NavLink>
                </li>
                <li>
                    <NavLink to="/movies">Movies</NavLink>
                </li>
                <li>
                    <NavLink to="/cart">Cart logo</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;