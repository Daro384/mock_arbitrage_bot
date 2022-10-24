import React,{useEffect} from "react"
import { Routes , Route, BrowserRouter as Router} from "react-router-dom"
import MainPage from "./MainPage"
import ArbitrageDetails from "./ArbitrageDetails"
import Top10 from "./Top10"
import fetchData from "./FetchingData"

function App() {

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route 
            exact path="/" 
            element={<MainPage/>}
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
