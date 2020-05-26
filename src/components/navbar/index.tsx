import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {
    title: string,
    toggleDrawer: Function
}

interface State {

}

class Navbar extends React.Component<Props, State> {

    render() {
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => this.props.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {this.props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;