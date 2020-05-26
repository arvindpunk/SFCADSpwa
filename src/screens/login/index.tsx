import React from 'react';
import {
    Grid,
} from '@material-ui/core'
import LoginPanel from '../../components/login';

class LoginScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={4}>
                        <LoginPanel />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginScreen;
