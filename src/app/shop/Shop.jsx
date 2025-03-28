import { useOutletContext } from "react-router"
import { useState } from "react"
import { Error } from "../misc/Error.jsx"
import { Loader } from "../misc/Loader.jsx"


const Card = ({ item }) => {
    const [loading, setLoading] = useState(true)

    return (
        <div className="item_card">
            <h4>{item.title}</h4>
            
            {loading && <Loader />}
            <img 
                src={item.image} 
                onLoad={() => setLoading(false)} 
                style={{ display: loading ? 'none' : 'block' }}
                onError={() => setLoading(false)}
                alt="👕"
                loading="lazy"
            />
            
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
        <div className="shop_wrapper">
            {items.map(item => <Card key={item.id} item={item}/> )}
        </div>
    )

}


export { Shop }