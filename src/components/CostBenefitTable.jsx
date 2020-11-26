import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './CostBenefitTableBody';

function CostBenefitTable(params) {
    const [dataList, setDataList] = useState([...params.dataList]);

    function pointsPerMi() {
        setDataList((prevList) => {
            const newList = prevList.sort(filterPointsPerMi);
            return [...newList];
        });
    }
    
    function price() {
        setDataList((prevList) => {
            const newList = prevList.sort(filterPrice);
            return [...newList];
        });
    }
    
    function points() {
        setDataList((prevList) => {
            const newList = prevList.sort(filterPoints);
            return [...newList];
        });
    }
    
    function name() {
        setDataList((prevList) => {
            const newList = prevList.sort(filterName);
            return [...newList];
        });
    }
    
    function filterPointsPerMi( a, b ) {
        if ((a.points/a.price) > (b.points/b.price)){
            return -1;
        }
        if ((b.points/b.price) > (a.points/a.price)){
            return 1 ;
        }
        return 0;
    }
    
    function filterPrice( a, b ) {
        if (a.price > b.price){
            return -1;
        }
        if (b.price > a.price){
            return 1 ;
        }
        return 0;
    }
    
    function filterPoints( a, b ) {
        if (a.points > b.points){
            return -1;
        }
        if (b.points > a.points){
            return 1 ;
        }
        return 0;
    }
    
    function filterName( a, b ) {
        if (a.name > b.name){
            return -1;
        }
        if (b.name > a.name){
            return 1 ;
        }
        return 0;
    }
    const tableHeader = [
        { title: "POS", onClick: null },
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