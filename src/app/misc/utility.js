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


export { getData, retry }