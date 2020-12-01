import React, { useState, useEffect } from 'react';
import CostBenefitTable from './components/CostBenefitTable';
import axios from 'axios';
import './App.css';

const ROOT_URL = "http://localhost:9000";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  
  function callAPI() {
    axios.get(ROOT_URL + "/testServer")
        .then(res => {
          setData(res.data);
          setIsLoading(false);
          console.log("Response from Server");
          console.log(res);
        })
        .catch(err => console.warn(`Error: ${err}`));
  }

  useEffect(() => {
    callAPI()
  }, []);

  return (
    <div className="App">
      <h1>FANTASY SIMULATOR</h1>
      {isLoading ? 
        <span>...Loading</span> : 
        <CostBenefitTable dataList={data.driversPoints}/>
       }
      {isLoading ? 
        <span>...Loading</span> : 
        <CostBenefitTable dataList={data.constructorsPoints}/>
      }
    </div>
  );
}

export default App;
