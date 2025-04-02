import { useOutletContext, Link } from "react-router"
import { useState } from "react"
import { Loader } from "../misc/Loader.jsx"


const Card = ({ item, toCart }) => {
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState(1)
    const btnStatus = input <= 10

    const handleChange = (e) => setInput(e.target.value)
    const handleToCart = (item, amount) => {
        const newItems = []
        for (let i = 0; i < amount; i++){
            newItems.push(item)
        }
        toCart(p => [...p, ...newItems])
    }

    return (
        <div className="item_card">
            <h4>{item.title}</h4>
            
            {loading && <Loader />}
            <img 
                src={item.image} 
                onLoad={() => {setLoading(false), console.log(`${item.id} loaded`)}} 
                style={{ display: loading ? 'none' : 'block' }}
                onError={() => setLoading(false)}
                alt="👕"
                loading="lazy"
            />
            
            <h5>{item.price}</h5>
            <div className="card_inputs">
                <input type="number" id={item.id}
                onChange={e => handleChange(e)} value={input}
                min={1} max={10} />
                <button onClick={() => handleToCart(item, input)}
                disabled={!btnStatus}
                >Add to cart</button>
            </div>
            <details>
                <summary><span>{item.description.substring(0,40) + '...'}</span></summary>
                {item.description}
            </details>
        </div>
    )
}

const Shop = () => {
    const items = useOutletContext().shop.items
    const isLoading = useOutletContext().shop.isLoading
    const [cart, setCart] = useOutletContext().cart
    if (isLoading) return <Loader />
    
    return (
        <main>
            <div data-testid='shop' className="shop_wrapper">
                {items.map(item => <Card key={item.id} item={item} toCart={setCart}/> )}
            </div>
        </main>
    )

}


export { Shop }