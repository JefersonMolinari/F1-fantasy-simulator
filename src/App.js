import React from 'react';
import CostBenefitTable from './components/CostBenefitTable';
import {driversList, constructorsList} from './costBenefitArray';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <p>FANTASY SIMULATOR</p>
      <CostBenefitTable dataList={driversList}/>
      <CostBenefitTable dataList={constructorsList}/>
    </div>
  );
}

export default App;
