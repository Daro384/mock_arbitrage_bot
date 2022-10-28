import simulateArbitrage from "./ArbitrageSimulator"
const BancorTokens = "https://api-v3.bancor.network/tokens"
const BancorPools = "https://api-v3.bancor.network/pools"
const DEXGURU_KEY = (process.env.REACT_APP_DEXGURU_KEY)

let top10BestArbitrage 

fetch("http://localhost:3004/top10")
.then(res => res.json())
.then(top10 => {
    top10BestArbitrage = top10
})

function toDateTime(secs) {
    var t = new Date(1970, 0, 1) // Epoch
    t.setSeconds(secs-(3600 * 5))
    return t.toString().split(" ").slice(1,5).join(" ")
}

const updateTop10 = (currentTop10, setTop10) => {
    let newTop10 = [
        ...top10BestArbitrage, 
        ...currentTop10.map(element => {
            return {
                name:element.name,
                profit:element.profit,
                dateTime:toDateTime(Date.now()/1000),
                guruPrice:element.bancorData.priceUSD,
                bancorPrice:element.guruData.priceUSD
            }
        })
    ]
    //sort by profit
    newTop10 = newTop10.sort((a,b) => { //sorting by profit (highest profit first)
        return (b.profit - a.profit)
    })
    //remove duplicates
    newTop10 = newTop10.reduce((newArray, currentElement) => {
        if (newArray.find(element => element.name === currentElement.name)) return [...newArray]
        else return [...newArray, currentElement]
    }, [])
    
    for (let i = 0; i < 10; i++) { //Only send a patch request if the item is different
        if (newTop10[i].name !== top10BestArbitrage[i].name
            ||
            newTop10[i].profit !== top10BestArbitrage[i].profit
        ) {
            fetch(`http://localhost:3004/top10/${i+1}`, {
            method:"PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name:newTop10[i].name,
                profit:newTop10[i].profit,
                dateTime:newTop10[i].dateTime,
                guruPrice:newTop10[i].bancorPrice,
                bancorPrice:newTop10[i].guruPrice
            })
        })
        }
    }

    //adding id
    let i = 0
    newTop10 = newTop10.slice(0,10).map(element => {
        i++
        return {...element, id:i}
    })
    top10BestArbitrage = [...newTop10]
    setTop10(top10BestArbitrage)

}

const handleBancorData = (pools, tokens) => {

    const tokenData = []
    
    for (let i = 0; i < pools.data.length; i++){
      tokenData.push({
        name:pools.data[i].name,
        priceUSD:tokens.data[i+1].rate.usd,
        liquidity:pools.data[i].liquidity.usd,
        tokenAddress:pools.data[i].poolDltId,
        allData:{...pools.data[i], ...tokens.data[i+1]}
      })
    }

    return tokenData
}
  
const fetchingGuru = (bancorData, setArbitrageData, setTop10) => {
    let fetchAPI = "https://api.dev.dex.guru/v1/chain/1/tokens/market?limit=100&token_addresses="

    const addressObjectToName = {}
    bancorData.forEach(token => {
        fetchAPI += token.tokenAddress + ","
        addressObjectToName[token.tokenAddress.toLowerCase()] = token.name
    })
    addressObjectToName["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"] = "ETH"

    const compare = (guruObject, bancorArray) => {
        
        const difference = bancorArray.map(tokenData => {
            tokenData["DEX"] = "Bancor"
            guruObject[tokenData.name]["DEX"] = "DexGuru"
            return {
                name:tokenData.name,
                ...simulateArbitrage(tokenData, guruObject[tokenData.name]),
                difference:Math.abs(tokenData.priceUSD - guruObject[tokenData.name].priceUSD),
                bancorData:{...tokenData},
                guruData:{...guruObject[tokenData.name]}
                
            }
        })

        const sortedData = difference.sort((a,b) => { //sorting by profit (highest profit first)
            return (b.profit - a.profit)
        })
        updateTop10(sortedData.slice(0,10), setTop10)
        setArbitrageData(sortedData)
        console.log("finished Fetching")
    }

    const handleGURUData = data => {
        const newDataObject = {}
        data.data.forEach(token => {
            const name = addressObjectToName[token.address]
            newDataObject[name] = {name:name, priceUSD:token.price_usd, liquidity:token.liquidity_usd, allData:token}
        })
        compare(newDataObject, bancorData)
    }
    
    fetch(fetchAPI.slice(0,-1), {
    headers:{"api-key":DEXGURU_KEY}
    })
    .then(res => res.json())
    .then(data => {
        handleGURUData(data)}
    )
}
  
const fetchData = (setArbitrageData, setTop10) => {
    console.log("fetching...")
    const promiseArray = []

    promiseArray.push(
        fetch(BancorPools)
        .then(res => res.json())
    )

    promiseArray.push(
        fetch(BancorTokens)
        .then(res => res.json())
    )

    Promise.all(promiseArray)
    .then(poolData => {
        const bancorData = (handleBancorData(...poolData.slice(0,2)))
        fetchingGuru(bancorData.filter(token => token.liquidity[0] !== "0"), setArbitrageData, setTop10)
    })
}

export default fetchData