import React, {useState, useEffect} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function Customers(){
    const [customers, setCustomers] = useState([]);

    useEffect( ()=>{
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch( 'https://customerrest.herokuapp.com/api/customers' )
            .then( response => response.json() )
            .then( data => setCustomers( data.content ) )
            .catch( err => console.error(err) );
    }

    const deleteCustomer = (url) => {

    }

    const addCustomer = (customer) => {

    }

    const updateCustomer = (customer, url) => {

    }

    const gridColumns = [
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
                <IconButton aria-label="Edit" color="info" 
                    onClick={() => console.log(params.value)}>
                    <EditIcon />
                </IconButton>
        },
        { 
            headerName: "", 
            field: "links.0.href", 
            width: 60,
            cellRendererFramework: params => 
                <IconButton aria-label="delete" color="error"
                    onClick={() => console.log(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
    ]

    return (
        <React.Fragment>
            <h2>Customers</h2>
            <Button variant="outlined">Add new customer</Button>

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
        </React.Fragment>
    );
}