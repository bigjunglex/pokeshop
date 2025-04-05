const getRandomIds = (amount) => {
    const out = new Set();
    for (let i = 0; i < amount; i++){
        const curr = Math.floor(Math.random() * 100)
        if (out.has(curr) || curr === 0){
            i--
            continue
        } else {
            out.add(curr)
        }
    }
    return Array.from(out)
}

const getData = async (amount = 20) => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
    const ids = getRandomIds(amount)
    try {
        const out = await Promise.all(ids.map(async (id) => {         
            const url = baseUrl + id
            const res = await fetch(url, {mode: "cors"})
            if (!res.ok){
                throw new Error(`failed to fetch pokemon id: ${id}:${res.statusText}`)
            }

            return res.json()
        }))

        return out
    } catch (error) {
        console.log('Error on getData fetch', error)
        throw error
    }
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