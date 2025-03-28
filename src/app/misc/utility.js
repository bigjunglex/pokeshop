const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products/', {mode:'cors'})
    const toJson = await res.json()
    return toJson 
}

const retry = async (fn, tries = 5) => {
    try {
        console.log(`Try #${tries}`)
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