import React from 'react';
import Box from '@material-ui/core/Box';
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
            screen: 'Request'
        }
    }

    toggleDrawer = (open: boolean) => {
        this.setState({open: open});
    }

    setScreen = (screen: string) => {
        this.setState({screen: screen});
    }

    render() {
        return (
            <React.Fragment>
                <Navbar
                    title={this.state.screen}
                    toggleDrawer={this.toggleDrawer} />
                <Sidebar
                    loggedIn={this.state.loggedIn}
                    open={this.state.open}
                    toggleDrawer={this.toggleDrawer}
                    setScreen={this.setScreen} />
                <ScreenManager screen={this.state.screen} />
            </React.Fragment>
        );
    }
}

export default AppContainer;