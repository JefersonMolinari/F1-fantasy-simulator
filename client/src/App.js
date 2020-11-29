import React, { useState, useEffect } from 'react';
import CostBenefitTable from './components/CostBenefitTable';
import axios from 'axios';
import './App.css';

const ROOT_URL = "http://localhost:9000/testServer";

function App() {
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(true);
  const [isLoadingConstructors, setIsLoadingConstructors] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  
  function callAPI() {
    axios.get(ROOT_URL + "/drivers")
        .then(res => {
          setDrivers(res.data);
          setIsLoadingDrivers(false);
          console.log("Response from Server");
          console.log(res);
        })
        .catch(err => console.warn(`Error: ${err}`));

    axios.get(ROOT_URL + "/constructors")
        .then(res => {
          setConstructors(res.data);
          setIsLoadingConstructors(false);
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
      {isLoadingDrivers ? 
        <span>...Loading</span> : 
        <CostBenefitTable dataList={drivers}/>
       }
      {isLoadingConstructors ? 
        <span>...Loading</span> : 
        <CostBenefitTable dataList={constructors}/>
      }
    </div>
  );
}

export default App;
