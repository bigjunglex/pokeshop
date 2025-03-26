const getData = async () => {
    const res = await fetch('https://fakestoreapi.com/products/')
    const toJson = await res.json()
    return toJson
}



export { getData }