import React, {useState, useEffect} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { Snackbar } from '@mui/material';

import { format as dateFormat } from 'date-fns';
import Delete from './delete';

export default function Trainings(){
    const [trainings, setTrainings] = useState([]);
    const [snackNotificationOpen, setSnackNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect( ()=>{
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch( 'https://customerrest.herokuapp.com/gettrainings' )
            .then( response => response.json() )
            .then( data => setTrainings( data ) )
            .catch( err => console.error(err) );
    }

    const deleteTraining = (url) => {
        fetch(url, { method:'DELETE' })
        .then( response => {
            if(response.ok){
                fetchTrainings();
                setNotificationMessage("Training deleted successfully.");
                setSnackNotificationOpen(true);
            } else {
                alert('Error while deleting training');
            }
        } )
        .catch( err => console.error(err) );
    }

    const gridColumns = [
        { 
            headerName: "Date", field: "date", 
            valueFormatter: params => dateFormat(new Date(params.data.date), "dd.MM.yyyy"),
            sortable:true, filter:true, width:300, resizable:true
        },
        { 
            headerName: "Duration", field: "duration", 
            valueFormatter: params => params.data.duration+" min",
            sortable:true, filter:true, width:130, resizable:true
        },
        { 
            headerName: "Activity", field: "activity", 
            sortable:true, filter:true, width:300, resizable:true, flex:1
        },
        { 
            headerName: "Customer", field: "customer.lastname",
            valueFormatter: params => {
                if(params.data.customer){
                    return params.data.customer.firstname + " " + params.data.customer.lastname;
                } else {
                    return "";
                }
            },
            sortable:true, filter:true, width:300, resizable:true, flex:1
        },
        
        { 
            headerName: "", 
            field: "links.0.href", 
            width: 60,
            cellRendererFramework: params => 
                <Delete params={params} deleteItem={deleteTraining} />
        },
    ]

    return (
        <React.Fragment>
            <h2>Trainings</h2>
            <div className='ag-theme-material' style={{height: 600, width: 1250, margin:'auto'}}>
                <AgGridReact
                    columnDefs={gridColumns}
                    rowData={trainings}
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