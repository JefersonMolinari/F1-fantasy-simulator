import React, { useState, useEffect } from 'react';
import CostBenefitTable from './components/CostBenefitTable';
import {driversList, constructorsList} from './costBenefitArray';
import './App.css';

function App() {
  const [serverResponse, setServerResponse] = useState("");

  function callAPI() {
    fetch("http://localhost:9000/testServer")
        .then(res => res.text())
        .then(res => setServerResponse(res))
        .catch(err => err);
  }

  useEffect(() => {
    callAPI()
  }, []);

  return (
    <div className="App">
      <p className="App-intro">{serverResponse}</p>
      <p>FANTASY SIMULATOR</p>
      <CostBenefitTable dataList={driversList}/>
      <CostBenefitTable dataList={constructorsList}/>
    </div>
  );
}

export default App;
