import React from 'react';
import {
    Paper,
    TextField,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class LoginPanel extends React.Component {
    render() {
        return (
            <Paper>
                <TextField fullWidth label="E-mail" margin="normal" />
                <TextField fullWidth label="Password" margin="normal" />
                <Button variant="contained" color="primary">LOGIN</Button>
            </Paper>
        );
    }
}

export default LoginPanel;