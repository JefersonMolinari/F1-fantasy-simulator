import React from 'react';
import TableHeader from './CostBenefitTableHeader';
import TableBody from './CostBenefitTableBody';

function CostbenefitTable(params) {
    const {dataList} = params;
    dataList.sort((a,b) => ((a.points/a.price) < (b.points/b.price)) ? 1 : (((b.points/b.price) < (a.points/a.price)) ? -1 : 0)); 

    //Add function to order by per Drive / Points / Price and Pt/$

    return <table className="box">
        <TableHeader />
        <TableBody driversList={dataList}/>
    </table>
}

export default CostbenefitTable;