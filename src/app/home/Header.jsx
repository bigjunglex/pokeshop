import { Link } from "react-router"

const Nav = () => {
    const inCart = 0
    return (
        <nav>
            <Link to={'/shop'}> SHOP </Link>
            <br />
            <Link to={'/cart'}> 🛒 : {inCart} </Link>
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