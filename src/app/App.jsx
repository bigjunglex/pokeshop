import { Outlet } from "react-router"
import { Header } from "./home/Header.jsx"
import { Footer } from "./home/Footer.jsx"
import './app.css' 

const App = () => {
    return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
    )
}


export { App }