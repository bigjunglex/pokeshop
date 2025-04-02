import { NavLink } from "react-router"


const Nav = ({ amount }) => {
    return (
        <nav>
            <NavLink to={'/'}> <div>Home</div> </NavLink>
            <br />
            <NavLink to={'/shop'}> <div>Shop</div> </NavLink>
            <br />
            <NavLink to={'/cart'}> <div>🛒 : {amount}</div></NavLink>
        </nav>
    )
}

const Header = ({ amount }) => {

    return (
        <header>
            <h3 data-testid="logo"> 👹 FakeShop 👹 </h3>
            <Nav amount={amount}/>
        </header>
    )
}


export { Header }