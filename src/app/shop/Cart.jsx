import { useOutletContext } from "react-router"

const ItemList = ({ items }) => {
    const trunkedItems = items.reduce((acc, el) => {
        let copy = acc.find(i => i.id === el.id)
        if(copy) {
            copy = {...copy, count: copy.count++}
        } else {
            const curr = {...el, count : 1}
            acc.push(curr)
        }
        return acc
    }, [])

    return (
        <ul className="item_list">
            {trunkedItems.map((el, i) => <li className="listing" key={el.id}> {el.title} <span>{el.count} {(el.price * el.count).toFixed(2)} 🔮</span> </li>)}
        </ul>
    )
}

const Cart = () => {
    const [items, setCart] = useOutletContext().cart
    const total = items.reduce((acc, i) => acc += i.price, 0).toFixed(2)

    return (
        <div className="cart_wrapper">
            <ItemList items={items}/>
            <div className="checkout_wrap">
                <h1>Total: {total} 🔮</h1>
                <button>Buy</button>
            </div>
        </div>
    )
}


export { Cart }