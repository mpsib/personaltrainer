import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { IconButton } from '@mui/material';

export default function AddTraining(props){
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });

    const handleClickOpen = () => {
        console.log(props.params.data.links[0].href);
        setTraining({...training, customer: props.params.data.links[0].href});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) =>{
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const dateChanged = (newDate) =>{
        setTraining({...training, date: newDate});
    };

    const handleSave = () => {
        handleClose();
        setTraining({...training, date: new Date(training.date).toISOString});
        console.log(training);
        props.addTraining(training);
    }

    return (
        <div>
            
            <IconButton aria-label="Add Training" 
                onClick={handleClickOpen}>
                <AddTaskIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new training to {props.params.data.firstname} {props.params.data.lastname}</DialogTitle>
                <DialogContent>
                    
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            renderInput={(params) => <TextField {...params} 
                                margin="dense"
                                variant="standard"/>}
                            name='date'
                            label='Date'
                            value={training.date}
                            onChange={dateChanged}
                        />
                    </LocalizationProvider>
                    <br/>
                    <TextField
                        name='activity'
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label='Activity'
                        variant="standard"
                    />
                    <br/>
                    <TextField
                        name='duration'
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label='Duration'
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}