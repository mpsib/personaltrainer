import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) =>{
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        handleClose();
        props.addCustomer(customer);
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>Add new customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Give values to a new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        name='firstname'
                        value={customer.firstname}
                        onChange={inputChanged}
                        margin="dense"
                        label='First Name'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='lastname'
                        value={customer.lastname}
                        onChange={inputChanged}
                        margin="dense"
                        label='Last Name'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        margin="dense"
                        label='Street Address'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='postcode'
                        value={customer.postcode}
                        onChange={inputChanged}
                        margin="dense"
                        label='Postcode'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='city'
                        value={customer.city}
                        onChange={inputChanged}
                        margin="dense"
                        label='City'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='email'
                        value={customer.email}
                        onChange={inputChanged}
                        margin="dense"
                        label='Email'
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name='phone'
                        value={customer.phone}
                        onChange={inputChanged}
                        margin="dense"
                        label='Phone'
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}