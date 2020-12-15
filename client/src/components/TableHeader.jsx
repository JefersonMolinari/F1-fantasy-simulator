import React from 'react';

function TableHeader(params) {
    const { headers, sortColumn } = params
    return <thead>
            <tr>
                {headers.map((headItem, index) =>  (
                    <th key={index} onClick={() => {sortColumn(headItem.id)}}>{headItem.title}</th>
                ))}
            </tr>
        </thead>
};

export default TableHeader;