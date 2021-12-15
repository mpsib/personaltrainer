import React, {useState} from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format as dateFormat } from 'date-fns';

export default function Delete(props){
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    
    const handleClickOpen = () => {
        setOpen(true);
        if(props.params.data.firstname){
            setDialogContent("Customer: " + props.params.data.firstname + " " + props.params.data.lastname)
        } else if (props.params.data.activity){
            setDialogContent("Activity: " + props.params.data.activity + " - Date: " + dateFormat(new Date(props.params.data.date), "dd.MM.yyyy"))
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        handleClose();
        setDialogContent('');
        if(props.params.data.links){
            props.deleteItem(props.params.data.links[0].href);
        } else if(props.params.data.activity){
            props.deleteItem('https://customerrest.herokuapp.com/api/trainings/'+props.params.data.id);
        }
        
    }


    return (
        <div>
            <IconButton aria-label="delete" color="error"
                onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}