import React from 'react';


function TableBody(params) {
    const { driversList } = params
  return (
    <tbody>
    {/* TODO: Refactor to make TR a separate component and make table body a generic component for any table */}
      {driversList.map((row, index) =>  (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{row.driver}</td>
            <td>{row.points}</td>
            <td>{row.price}</td>
            <td>{(row.points/row.price).toFixed(2)}</td>
          </tr>
        ))}
    </tbody>
  )
}

export default TableBody;