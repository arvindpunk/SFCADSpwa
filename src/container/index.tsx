import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ScreenManager from '../screens';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

interface Props {

}

interface State {
    loggedIn: boolean,
    open: boolean,
    screen: string
}

class AppContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loggedIn: false,
            open: false,
            screen: 'Login'
        }
    }

    toggleDrawer = (open: boolean) => {
        this.setState({open: open});
    }

    setScreen = (screen: string) => {
        this.setState({screen: screen});
    }

    setLoggedIn = (loggedIn: boolean) => {
        this.setState({loggedIn: loggedIn});
    }

    render() {
        return (
            <Box bgcolor="#dddddd" minHeight="100vh">
                <Navbar
                    title={this.state.screen}
                    toggleDrawer={this.toggleDrawer} />
                <Sidebar
                    loggedIn={this.state.loggedIn}
                    open={this.state.open}
                    toggleDrawer={this.toggleDrawer}
                    setScreen={this.setScreen}
                    setLoggedIn={this.setLoggedIn} />
                <Container maxWidth='md' style={{ padding: 0}}>
                    <Box bgcolor="#ffffff" boxShadow={3}>
                        <ScreenManager
                        screen={this.state.screen}
                        setScreen={this.setScreen}
                        setLoggedIn={this.setLoggedIn}
                        />
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default AppContainer;