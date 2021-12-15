import React, {useState, useEffect} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import fiLocale from 'date-fns/locale/fi';
//import DateTimePicker from '@mui/lab/DateTimePicker'; //edit komponenttiin
import { format as dateFormat } from 'date-fns';

export default function Trainings(){
    const [trainings, setTrainings] = useState([]);

    useEffect( ()=>{
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch( 'https://customerrest.herokuapp.com/api/trainings' )
            .then( response => response.json() )
            .then( data => setTrainings( data.content ) )
            .catch( err => console.error(err) );
    }

    const deleteTraining = (url) => {

    }

    const addTraining = (training) => {

    }

    const updateTraining = (training, url) => {

    }

    const gridColumns = [
        { 
            headerName: "Date", field: "date", 
            valueFormatter: params => dateFormat(new Date(params.data.date), "dd.MM.yyyy '-' HH:mm"),
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
            <Button variant="outlined">Add new training</Button>

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
        </React.Fragment>
    );
}