import { Link } from "react-router"

const Nav = () => {
    return (
        <nav>
            <Link to={'/shop'}> SHOP </Link>
            <br />
            <Link to={'/cart'}> cart </Link>
            <br />
            <Link to={'/item'}> item </Link>
        </nav>
    )
}

const Header = () => {
    return (
        <header>
            <h3> 👹 PokeShop 👹 </h3>
            <Nav />
        </header>
    )
}


export { Header }