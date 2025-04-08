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

const getStatEmoji = (stat) => {
    let out;
    switch (stat) {
        case 'hp':
            out = String.fromCodePoint('0x2764')
            break;
        case 'attack':
            out = String.fromCodePoint('0x2694')
            break;
        case 'defense':
            out = String.fromCodePoint('0x1F6E1')
            break;
        case 'special-attack':
            out = String.fromCodePoint('0x1F5FB')
            break;
        case 'special-defense':
            out = String.fromCodePoint('0x1F3EF')
            break;
        case 'speed':
            out = String.fromCodePoint('0x1F697')
            break;
    }

    return out
}

//  expects arrays of relate stats(item.stats | pokemon.stats)
const formatDesc = (desc) => {
    let out = '';
    for (let i = 0; i < desc.length; i++) {
        const emoj = getStatEmoji(desc[i].stat.name)
        out = out + `\n ${emoj} ${desc[i].stat.name} : ${desc[i]['base_stat']}` 
    }


    return out
}



export { getData, trunkItems, formatDesc }