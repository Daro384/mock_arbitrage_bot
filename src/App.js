import './App.css'
import React,{useEffect, useState} from "react"
import { forEachTransformDependencies } from 'mathjs'

const BancorTokens = "https://api-v3.bancor.network/tokens"
const BancorPools = "https://api-v3.bancor.network/pools"
const DYDXPools = "https://api.dydx.exchange/v3/markets"
const GURUAPI = "https://api.dev.dex.guru/v1/chain/1/tokens/market?sort_by=liquidity_usd&limit=100"

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



const fetchingGuru = bancorData => {
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
        difference:Math.abs(tokenData.priceUSD - guruObject[tokenData.name].priceUSD)
      }
    })
    console.log(difference)
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

const fetchData = async () => {
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
    console.log(bancorData.filter(token => token.liquidity[0] !== "0"))
    fetchingGuru(bancorData.filter(token => token.liquidity[0] !== "0"))
  })
}


function App() {

  useEffect(() => {
    fetchData()
  }, [])

  

  return (
    <div className="App">
    </div>
  );
}

export default App;
