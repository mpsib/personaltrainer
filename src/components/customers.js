import React, {useState, useEffect} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Snackbar from '@mui/material/Snackbar';

import AddCustomer from './addCustomer';
import Delete from './delete';
import AddTraining from './addTraining';
import EditCustomer from './editCustomer';
import CsvExport from './csvExport';



export default function Customers(){
    const [customers, setCustomers] = useState([]);
    const [snackNotificationOpen, setSnackNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect( ()=>{
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then( response => response.json() )
            .then( data => setCustomers( data.content ) )
            .catch( err => console.error(err) );
    }

    const deleteCustomer = (url) => {
        fetch(url, { method:'DELETE' })
        .then( response => {
            if(response.ok){
                fetchCustomers();
                setNotificationMessage("Customer deleted successfully.");
                setSnackNotificationOpen(true);
            } else {
                alert('Error while deleting customer');
            }
        } )
        .catch( err => console.error(err) );
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
            .then( response => {
                if(response.ok){
                    fetchCustomers();
                    setNotificationMessage("New Customer added successfully.");
                    setSnackNotificationOpen(true);
                } else {
                    alert('Error while adding customer')
                }
            })
            .catch( err => console.error(err) );

    }

    const updateCustomer = (customer, url) => {
        fetch(url,{
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
            .then( response => {
                if(response.ok){
                    fetchCustomers();
                    setNotificationMessage("Customer updated successfully.");
                    setSnackNotificationOpen(true);
                } else {
                    alert('Error while editing customer')
                }
            })
            .catch( err => console.error(err) );

    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
            .then( response => {
                if(response.ok){
                    setNotificationMessage("New Training added successfully.");
                    setSnackNotificationOpen(true);
                } else {
                    alert('Error while adding training')
                }
            })
            .catch( err => console.error(err) );

    }

    const gridColumns = [
        /*{ headerName: "", 
            field: "links.0.href",
            width: 60,
            cellRendererFramework: params => 
            <CustomerProfile params={params} />
        },*/
        { headerName: "", 
            field: "links.0.href",
            width: 60,
            cellRendererFramework: params => 
            <AddTraining params={params} addTraining={addTraining} />
        },
        { headerName: "First Name", field: "firstname", sortable:true, filter:true, width:130, resizable:true},
        { headerName: "Last Name", field: "lastname", sortable:true, filter:true, width:130, resizable:true},
        { headerName: "Street Address", field: "streetaddress", sortable:true, filter:true, width:200, resizable:true},
        { headerName: "Postcode", field: "postcode", sortable:true, filter:true, width:120, resizable:true},
        { headerName: "City", field: "city", sortable:true, filter:true, width:150, resizable:true},
        { headerName: "Email", field: "email", sortable:true, filter:true, width:200, resizable:true, flex:1},
        { headerName: "Phone", field: "phone", sortable:true, filter:true, width:150, resizable:true},
        { 
            headerName: "", 
            field: "links.0.href",
            width: 60,
            cellRendererFramework: params => 
                <EditCustomer params={params} updateCustomer={updateCustomer} />
        },
        { 
            headerName: "", 
            field: "links.0.href", 
            width: 60,
            cellRendererFramework: params => 
                <Delete params={params} deleteItem={deleteCustomer} />
        },
    ];

    

    return (
        <React.Fragment>
            <h2>Customers</h2>
            <table style={{margin:'auto'}}>
                <tr>
                    <td><AddCustomer addCustomer={addCustomer}/></td>
                    <td><CsvExport customers={customers}/></td>
                </tr>
            </table>
            
            
            <div className='ag-theme-material' style={{height: 600, width: 1250, margin:'auto'}}>
                <AgGridReact
                    columnDefs={gridColumns}
                    rowData={customers}
                    pagination={true}
                    paginationAutoPageSize={true}
                    rowSelection='single'
                    animateRows={true}
                    suppressMovableColumns={true}
                />
            </div>
            <Snackbar
                open={snackNotificationOpen}
                autoHideDuration={3000}
                onClose={() => setSnackNotificationOpen(false)}
                message={notificationMessage}
            />
        </React.Fragment>
    );
}