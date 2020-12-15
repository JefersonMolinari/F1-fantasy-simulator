import React from 'react';

function TableBody(params) {
  const { dataList } = params
  return (
    <tbody>
      {/* TODO: Optimize to not have Index in the First Column */}
      {dataList.map((row, index) =>  (
        <tr key={index}>
          <td>{index+1}</td>
            {Object.keys(row).map((item, i) => (
          <td key={i}>{row[item]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
export default TableBody;