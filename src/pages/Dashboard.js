import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {getDomains, deleteDomain} from "../api";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";



const Dashboard = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        fetchData()
        // const data = JSON.parse(localStorage.getItem('employees_data'));
        // if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
    }, []);

    const fetchData = async () => {
        const data = await getDomains();
        if (data && data.length !== 0) setDomains(data);
    }

    const handleDelete = id => {
        Swal.fire({
            icon: 'warning',
            title: `Are you sure to delete ${domains[id].domainname}?`,
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async result => {
            if (result.value) {
                const deleteres = await deleteDomain(id);
                if (deleteres.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${domains[id].domainname}'s data has been deleted.`,
                        showConfirmButton: false,
                        timer: 1500,
                        willClose(popup) {
                            window.location.reload(false)
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Got Error While Deleting',
                        text: `${domains[id].domainname}'s data has not been deleted.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });
    };

    return (
        <div className="container">
                <>
                    <header>
                        <h1>Catchy Domains Management</h1>
                        <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                            <button onClick={() => navigate('add', {replace: true})}>Add Domain</button>
                            <Logout/>
                        </div>
                    </header>
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
                                                onClick={() => navigate(`edit/${i + 1}`, { replace: true })}
                                                className="button muted-button"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="text-left">
                                            <button
                                                onClick={() => handleDelete(domain.id)}
                                                className="button muted-button"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>No Domains</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </>
        </div>
    );
}

export default Dashboard;
