import React from 'react';


//TODO: Refactor to pass array with header values and make Header componenct a generic component for any table
function TableHeader(params) {
    return <thead>
            <tr>
                <th>POS</th>
                <th>Name</th>
                <th>Points</th>
                <th>Price</th>
                <th>Points/$m</th>
            </tr>
        </thead>
}

export default TableHeader;