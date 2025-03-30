const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const out = await res.json()
    
    return out
}

const retry = async (fn, tries = 5) => {
    try {
        const res = await fn()
        return res
    }catch (error) {
        if(tries > 1) {
            await retry(fn, tries - 1)
        }else{
            throw error
        }
    }
}

const trunkItems = (items) => {
    return items.reduce((acc, el) => {
        let copy = acc.find(i => i.id === el.id)
        if(copy) {
            copy = {...copy, count: copy.count++}
        } else {
            const curr = {...el, count : 1}
            acc.push(curr)
        }
        return acc
    }, [])
}

export { getData, retry, trunkItems }