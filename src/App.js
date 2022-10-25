import React,{useEffect, useState} from "react"
import { Routes , Route, BrowserRouter as Router} from "react-router-dom"
import MainPage from "./MainPage_Elements/MainPage"
import ArbitrageDetails from "./DetailsPage/ArbitrageDetails"
import Top10 from "./Top10_Elements/Top10"
import fetchData from "./FetchingData"

function App() {

  const [arbitrageData, setArbitrageData] = useState([])

  useEffect(() => {
    fetchData(setArbitrageData)
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
            element={<ArbitrageDetails/>} 
          />
          <Route 
            exact path="/Top10" 
            element={<Top10/>}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
