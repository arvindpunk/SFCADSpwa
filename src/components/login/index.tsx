import React from 'react';
import {
    Paper,
    TextField,
    IconButton,
    Typography,
    Button,
    Box,
} from '@material-ui/core';


interface Props {
    setLoggedIn: Function,
    setScreen: Function
}

interface State {
    email: string,
    pass: string
}

class LoginPanel extends React.Component<Props, State> {
    handleLogin = () => {
        if (this.state?.email === 'admin@gmail.com' && this.state?.pass === 'password') {
            this.props.setLoggedIn(true);
            this.props.setScreen("Request");
        }
    }

    render() {
        return (
            <Box p={2} minHeight="100vh" alignContent="center">
                <TextField fullWidth id="email" label="E-mail" margin="normal" onChange={(e) => this.setState({email: e.target.value})} />
                <TextField fullWidth id="pass" type="password" label="Password" margin="normal" onChange={(e) => this.setState({pass: e.target.value})} />
                <Box display="flex" justifyContent="flex-end">
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleLogin()}>
                        Login
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default LoginPanel;