import { Button } from '@mui/material';
import React, {useState} from 'react';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

// tällä saadaan csv ilman napeista tulevia linkkejä päätaulussa 
export default function CsvExport(props){
    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const exportCSV = () => {
        gridApi.exportDataAsCsv();
    };

    const gridColumns = [
        { headerName: "First Name", field: "firstname"},
        { headerName: "Last Name", field: "lastname"},
        { headerName: "Street Address", field: "streetaddress"},
        { headerName: "Postcode", field: "postcode"},
        { headerName: "City", field: "city"},
        { headerName: "Email", field: "email"},
        { headerName: "Phone", field: "phone"},
    ];

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={() => exportCSV()}>Export CSV</Button>
            <AgGridReact
                columnDefs={gridColumns}
                rowData={props.customers}
                onGridReady={onGridReady}
            />           
        </React.Fragment>
    );

}