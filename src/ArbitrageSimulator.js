const simulateArbitrage = (dex1, dex2) => {
    const tradeFee = 1.002

    let buyDex
    let sellDex

    if (dex1.priceUSD > dex2.priceUSD) {
        sellDex = dex1
        buyDex = dex2
    } else {
        sellDex = dex2
        buyDex = dex1
    }

    let sellPrice = parseFloat(sellDex.priceUSD)
    let buyPrice = parseFloat(buyDex.priceUSD)
    let sellLiquidity = parseFloat(sellDex.liquidity)
    let buyLiquidity = parseFloat(buyDex.liquidity)

    let cost = 0
    let revenue = 0
    let unitsBought = 0

    if(sellPrice === 0 || buyPrice === 0 || sellLiquidity === 0 || buyLiquidity === 0) return {profit:0, cost:0, revenue:0, unitsBought:0}

    let allowGrowth = true
    let buyMultiple = 1
    while (buyPrice * tradeFee < sellPrice / tradeFee) {
        const newBuyPrice = buyPrice * buyLiquidity/(buyLiquidity-buyPrice * buyMultiple)
        const newSellPrice = sellPrice * sellLiquidity/(sellLiquidity+sellPrice * buyMultiple)

        if (newBuyPrice * tradeFee < newSellPrice / tradeFee) {
            cost += (buyPrice+newBuyPrice)/2 * tradeFee * buyMultiple
            revenue += (sellPrice+newSellPrice)/2 / tradeFee * buyMultiple

            buyLiquidity -= (buyPrice+newBuyPrice)/2 * buyMultiple
            sellLiquidity += sellPrice * buyMultiple
            unitsBought += buyMultiple
            buyPrice = newBuyPrice
            sellPrice = newSellPrice
        } else if (buyMultiple !== 1) {
            allowGrowth = false
            buyMultiple = Math.ceil(buyMultiple / 4)
            continue
        }
        else break
        if (allowGrowth) buyMultiple = Math.ceil(unitsBought/30)
    }
    return {
        profit:revenue-cost, 
        cost:cost, 
        revenue:revenue, 
        unitsBought:unitsBought, 
        buyDex:buyDex.DEX,
        sellDex:sellDex.DEX
    }
}

export default simulateArbitrage