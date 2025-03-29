import { Link } from "react-router"


const Nav = ({ amount }) => {
    return (
        <nav>
            <Link to={'/shop'}> SHOP </Link>
            <br />
            <Link to={'/cart'}> 🛒 : {amount}</Link>
            <br />
            <Link to={'/item'}> item </Link>
        </nav>
    )
}

const Header = ({ amount }) => {

    return (
        <header>
            <h3> 👹 PokeShop 👹 </h3>
            <Nav amount={amount}/>
        </header>
    )
}


export { Header }