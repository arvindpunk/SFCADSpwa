import React from 'react';
import {
    Grid,
} from '@material-ui/core'
import LoginPanel from '../../components/login';

interface Props {
    setScreen: Function,
    setLoggedIn: Function
}

interface State {

}

class LoginScreen extends React.Component<Props, State> {


    render() {
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={4}>
                        <LoginPanel setLoggedIn={this.props.setLoggedIn} setScreen={this.props.setScreen}/>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginScreen;
