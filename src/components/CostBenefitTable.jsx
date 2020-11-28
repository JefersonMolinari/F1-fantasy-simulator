import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './CostBenefitTableBody';

function CostBenefitTable(params) {
    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 

    const [dataList, setDataList] = useState([...params.dataList]);

    function pointsPerMi() {
        setDataList((prevList) => {
            const newList = prevList.sort((a, b) => ((a.points/a.price) > (b.points/b.price)) ? -1 : (((b.points/b.price) > (a.points/a.price)) ? 1 : 0));
            return [...newList];
        });
    }
    
    function price() {
        setDataList((prevList) => {
            const newList = prevList.sort((a, b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0));
            return [...newList];
        });
    }
    
    function points() {
        setDataList((prevList) => {
            const newList = prevList.sort((a, b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0));
            return [...newList];
        });
    }
    
    function name() {
        setDataList((prevList) => {
            const newList = prevList.sort((a, b) => (a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0));
            return [...newList];
        });
    }

    const tableHeader = [
        { title: "POS"},
        { title: "Name", onClick: name },
        { title: "Points", onClick: points },
        { title: "Price", onClick: price },
        { title: "Points/$mi", onClick: pointsPerMi }
    ]

    return <table className="box">
        <TableHeader
            headers={tableHeader}
        />
        <TableBody 
            dataList={dataList}
        />
    </table>
}

export default CostBenefitTable;