import { useOutletContext } from "react-router"
import { Error } from "../misc/Error.jsx"
import { Loader } from "../misc/Loader.jsx"


const Card = ({ item }) => {
    return (
        <div className="item_card">
            <h4>{item.title}</h4>
            <h5>{item.price}</h5>
            <details>
                <summary><span>{item.description.substring(0,15) + '...'}</span></summary>
                {item.description}
            </details>
        </div>
    )
}

const Shop = () => {
    const items = useOutletContext().shop.items
    const isLoading = useOutletContext().shop.isLoading
    if (isLoading) return <Loader />
    
    
    
    return (
        <div>

        </div>
    )

}


export { Shop }