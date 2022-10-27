import React from 'react';

const Table = ({ domains}) => {
  console.log('domains---', domains)
  // domains.forEach((employee, i) => {
  //   employee.id = i + 1;
  // });

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: null,
  // });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Domain Name</th>
            <th>Min Price</th>
            <th>Monthly rent</th>
            <th>Listing Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {domains && domains.length > 0 ? (
            domains.map((domain, i) => (
              <tr key={domain.id}>
                <td>{i + 1}</td>
                <td>{domain.domainname}</td>
                <td>{domain.minprice}</td>
                <td>{domain.monthlyrental}</td>
                <td>{domain.listingdate}</td>
                <td className="text-right">
                  <button
                    onClick={() => {}}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => {}}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
