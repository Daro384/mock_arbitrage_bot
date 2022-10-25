let price1 = 1452.956
let price2 = 1468.777
let liquidity1 = 3717407
let liquidity2 = 2801522341

let cost = 0
let revenue = 0
let unitsBought = 0
while (price1 < price2) {
    cost += price1
    revenue += price2
    price1 = price1 * liquidity1/(liquidity1-price1)
    price2 = price2 * liquidity2/(liquidity2+price2)
    liquidity1 -= price1
    liquidity2 += price2
    unitsBought += 1
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

console.log(simulateArbitrage(price1, price2, liquidity1, liquidity2))