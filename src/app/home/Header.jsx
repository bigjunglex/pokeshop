import { NavLink } from "react-router"
import { useEffect, useState } from "react"

const Nav = ({ amount }) => {
    return (
        <nav>
            <NavLink to={'/'}> <div data-testid="home-link">Home</div> </NavLink>
            <br />
            <NavLink to={'/shop'}> <div data-testid="shop-link">Shop</div> </NavLink>
            <br />
            <NavLink to={'/cart'}> <div data-testid="cart-link">🛒 : {amount}</div></NavLink>
        </nav>
    )
}

const Header = ({ amount }) => {
    const [isScrolled, setIsScrolled] = useState(true)

    useEffect(() => {
        const target = document.querySelector('header')
        const watcher = document.getElementById('scroll_watcher')
        const observer = new IntersectionObserver(([entry]) => {
            target.classList.toggle('scrolled', !entry.isIntersecting)
            setIsScrolled(prev => !prev)
        });
       
        observer.observe(watcher)

        return () => {
            if (watcher) observer.disconnect()
        }

    },[])

    return (
    <>
        <div id="scroll_watcher"></div>
        <header>
            <h3 data-testid="logo" 
                style={{visibility: isScrolled ? 'hidden' : 'visible'}}> 👹 PokeShop 👹 </h3>
            <Nav amount={amount}/>
        </header>
    </>
    )
}


export { Header }