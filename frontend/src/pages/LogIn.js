// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';

export const LogIn = () => {
    return (
        <div className='form'>
            <Typography variant="h5">Log In</Typography>
            <form>
                <TextField
                    style={{ width: "80%", margin: "5px" }}
                    type="text"
                    label="setgoal"
                    variant="outlined"
                />
                <br />
                <TextField
                    style={{ width: "80%", margin: "5px" }}
                    type="text"
                    label="goal description"
                    variant="outlined"
                />
                <br />
                <Button variant="contained" color="primary">
                    Log In
                </Button>
            </form>
        </div>
    )
}

export default LogIn;