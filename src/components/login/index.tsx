import React from 'react';
import {
    TextField,
    IconButton,
    Button,
    Box,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import * as firebase from 'firebase/app';
import 'firebase/auth';

interface Props {
}

interface State {
    email: string,
    pass: string,
    toastOpen: boolean,
    toastMessage: string,
}

class LoginPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            toastOpen: false,
            toastMessage: ''
        };
    }

    handleLogin = () => {
        if (this.state?.email && this.state?.pass) {
            firebase.auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.pass)
                    .catch((error) => {
                        this.setState({
                            toastOpen: true,
                            toastMessage: error.message
                        })
                    });
        }
    }

    render() {
        return (
            <Box p={2} minHeight="100vh" alignContent="center">
                <Collapse in={this.state.toastOpen}>
                    <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            this.setState({ toastOpen: false });
                        }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    {this.state.toastMessage}
                    </Alert>
                </Collapse>
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