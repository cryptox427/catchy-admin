import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {getDomains} from "../../api";

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


const Dashboard = ({ setIsAuthenticated }) => {
  const [domains, setDomains] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData()
    // const data = JSON.parse(localStorage.getItem('employees_data'));
    // if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const fetchData = async () => {
    const data = await getDomains();
    if (data && data.length !== 0) setDomains(data);
  }

  const handleEdit = id => {
    const [employee] = domains.filter(employee => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [employee] = domains.filter(employee => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = domains.filter(employee => employee.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        setDomains(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            domains={domains}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={domains}
          setEmployees={setDomains}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          employees={domains}
          selectedEmployee={selectedEmployee}
          setEmployees={setDomains}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Dashboard;
