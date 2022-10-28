import React,{useEffect, useState} from "react"
import { Routes , Route, BrowserRouter as Router} from "react-router-dom"
import MainPage from "./MainPage_Elements/MainPage"
import ArbitrageDetails from "./DetailsPage/ArbitrageDetails"
import Top10 from "./Top10_Elements/Top10"
import fetchData from "./FetchingData"

function App() {

  const [arbitrageData, setArbitrageData] = useState([])
  const [top10, setTop10] = useState([])

  useEffect(() => {
    fetchData(setArbitrageData, setTop10)
    const timerID = setInterval(() => fetchData(setArbitrageData, setTop10), 30000)
    return function cleanup() {
      clearInterval(timerID)
    }
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route 
            exact path="/" 
            element={<MainPage data={arbitrageData}/>}
          />
          <Route 
            exact path="/Details/:tokenID" 
            element={<ArbitrageDetails data={arbitrageData}/>} 
          />
          <Route 
            exact path="/Top10" 
            element={<Top10 top10Data={top10}/>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
