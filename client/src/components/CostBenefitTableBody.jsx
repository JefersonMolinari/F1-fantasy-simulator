import React from 'react';


function TableBody(params) {
    const { dataList } = params
  return (
    <tbody>
    {/* TODO: Refactor to make TR a separate component and make table body a generic component for any table */}
      {dataList.map((row, index) =>  (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{row.name}</td>
            <td>{row.points}</td>
            <td>{row.price}</td>
            <td>{(row.points/row.price).toFixed(2)}</td>
          </tr>
        ))}
    </tbody>
  )
}

export default TableBody;