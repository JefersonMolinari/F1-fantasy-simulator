import React from 'react';

//TODO: Refactor to pass array with header values and make Header componenct a generic component for any table
function TableHeader(params) {

    return <thead>
            <tr>
                <th>POS</th>
                <th onClick={params.onName}>Name</th>
                <th onClick={params.onPoints}>Points</th>
                <th onClick={params.onPrice}>Price</th>
                <th onClick={params.onPointsPerMi}>Points/$m</th>
            </tr>
        </thead>
}

export default TableHeader;