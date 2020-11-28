import React from 'react';

function TableHeader(params) {
    const { headers } = params
    return <thead>
            <tr>
                {headers.map((headItem, index) =>  (
                    <th key={index} onClick={headItem.onClick}>{headItem.title}</th>
                ))}
            </tr>
        </thead>
}

export default TableHeader;