import React, {useState, useEffect} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { Button, Snackbar } from '@mui/material';

import { format as dateFormat } from 'date-fns';
import Delete from './delete';
import Calendar from './calendar';

export default function Trainings(){
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
    const [snackNotificationOpen, setSnackNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [calendarOpen, setCalendarOpen] = useState(false);

    useEffect( ()=>{
        fetchTrainings();
    }, []);

    var _ = require('lodash');

    const fetchTrainings = () => {
        fetch( 'https://customerrest.herokuapp.com/gettrainings' )
            .then( response => response.json() )
            .then( data => {
                setTrainings( data );
                setEvents(createEvents( data ));
            } )
            .catch( err => console.error(err) );
    }

    const createEvents = (data) => {
        let array = [];
        for (let i = 0; i < data.length; i++){
            let event = {
                title: data[i].activity,
                start: new Date(data[i].date),
                end: new Date(new Date(data[i].date).getTime() + data[i].duration*60000)
            };
            array = _.concat(array, event);
        }
        return array;
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
    ];

    const handleCalendarButton = () => {
        setCalendarOpen(!calendarOpen);
    }


    if(!calendarOpen){
        return (
            <React.Fragment>
                <h2>Trainings</h2>
                <Button onClick={handleCalendarButton}>Show Calendar</Button>
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
    } else {
        return (
            <div>
                <h2>Trainings</h2>
                <Button onClick={handleCalendarButton}>Show List</Button>
                <Calendar events={events}/>
            </div>
        );
    }
    
}