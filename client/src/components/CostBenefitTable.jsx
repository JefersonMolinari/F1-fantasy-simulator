import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function CostBenefitTable(params) {
    const [dataList, setDataList] = useState(params.dataList);
    const [currentColumn, setCurrentColumn] = useState("");

    function sortColumn(colName) {
        let sortedList = [];

        //if same column is clicked again, toogle sort order ASC/DESC
        if (currentColumn === colName) {
            sortedList = [...dataList].sort((a, b) => (a[colName] < b[colName]) ? -1 : ((b[colName] < a[colName]) ? 1 : 0));
            setCurrentColumn("");
        } else {
            sortedList = [...dataList].sort((a, b) => (a[colName] > b[colName]) ? -1 : ((b[colName] > a[colName]) ? 1 : 0));
            setCurrentColumn(colName);
        }

        setDataList(sortedList);
    };

    const tableHeader = [
        { id: "pos", title: "POS"},
        { id: "name", title: "Name"},
        { id: "points", title: "Points"},
        { id: "price", title: "Price"},
        { id: "pointsPerMi", title: "Points/$mi" }
    ];

    return <table className="box">
        <TableHeader
            headers={tableHeader}
            sortColumn={sortColumn}
        />
        <TableBody 
            dataList={dataList}
        />
    </table>
};

export default CostBenefitTable;