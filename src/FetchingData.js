const BancorTokens = "https://api-v3.bancor.network/tokens"
const BancorPools = "https://api-v3.bancor.network/pools"
const DEXGURU_KEY = (process.env.REACT_APP_DEXGURU_KEY)


const handleBancorData = (pools, tokens) => {

    const tokenData = []
  
    for (let i = 0; i < pools.data.length; i++){
      tokenData.push({
        name:pools.data[i].name,
        priceUSD:tokens.data[i+1].rate.usd,
        liquidity:pools.data[i].liquidity.usd,
        tokenAddress:pools.data[i].poolDltId
      })
  
    }
    return tokenData
}

const simulateArbitrage = (price1, price2, liquidity1, liquidity2) => {

    let sellPrice
    let buyPrice
    let sellLiquidity
    let buyLiquidity

    if (price1>price2) {
        sellPrice = parseFloat(price1)
        sellLiquidity = parseFloat(liquidity1)
        buyPrice = parseFloat(price2)
        buyLiquidity = parseFloat(liquidity2)
    } else {
        sellPrice = parseFloat(price2)
        sellLiquidity = parseFloat(liquidity2)
        buyPrice = parseFloat(price1)
        buyLiquidity = parseFloat(liquidity1)
    }
    let cost = 0
    let revenue = 0
    let unitsBought = 0

    if(sellPrice == 0 || buyPrice == 0 || sellLiquidity == 0 || buyLiquidity == 0) return {profit:0, cost:0, revenue:0, unitsBought:0}

    while (buyPrice < sellPrice) {
        cost += buyPrice
        revenue += sellPrice
        buyPrice = buyPrice * buyLiquidity/(buyLiquidity-buyPrice)
        price2 = sellPrice * sellLiquidity/(sellLiquidity+sellPrice)
        buyLiquidity -= buyPrice
        sellLiquidity += sellPrice
        unitsBought += 1
    }
    return {profit:revenue-cost, cost:cost, revenue:revenue, unitsBought:unitsBought}
}
  
  
  
const fetchingGuru = (bancorData, setArbitrageData) => {
    let fetchAPI = "https://api.dev.dex.guru/v1/chain/1/tokens/market?limit=100&token_addresses="

    const addressObjectToName = {}
    bancorData.forEach(token => {
        fetchAPI += token.tokenAddress + ","
        addressObjectToName[token.tokenAddress.toLowerCase()] = token.name
    })
    addressObjectToName["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"] = "ETH"

    const compare = (guruObject, bancorArray) => {
        
        const difference = bancorArray.map(tokenData => {
            return {
                name:tokenData.name,
                ...simulateArbitrage(tokenData.priceUSD, guruObject[tokenData.name].priceUSD, tokenData.liquidity, guruObject[tokenData.name].liquidity),
                difference:Math.abs(tokenData.priceUSD - guruObject[tokenData.name].priceUSD)
            }
        })

        

        setArbitrageData(difference)
    }

    const handleGURUData = data => {
        const newDataObject = {}
        data.data.forEach(token => {
            const name = addressObjectToName[token.address]
            newDataObject[name] = {name:name, priceUSD:token.price_usd, liquidity:token.liquidity_usd}
        })
        compare(newDataObject, bancorData)
    }
    
    fetch(fetchAPI.slice(0,-1), {
    headers:{"api-key":DEXGURU_KEY}
    })
    .then(res => res.json())
    .then(handleGURUData)
}
  
const fetchData = async (setArbitrageData) => {
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
    fetchingGuru(bancorData.filter(token => token.liquidity[0] !== "0"), setArbitrageData)
})
}

export default fetchData