import React from 'react';
import {
    SwipeableDrawer, Box, Typography, Hidden
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

interface Props {
    loggedIn: boolean,
    open: boolean,
    toggleDrawer: Function,
    setScreen: Function,
}

interface State {
    open: boolean;
}

class Sidebar extends React.Component<Props, State> {
    drawerListItems = [
        {
            screen: "Request",
        },
        {
            screen: "Status",
        },
        {
            screen: "Add Location",
        },
        {
            screen: "Information",
        },
    ]
    renderDrawerContents = () => {
        return (
            <React.Fragment>
                <Box style={{
                    width: 240,
                    backgroundColor: 'primary'
                }}>
                    <Typography variant="h4" style={{padding: 16}}>
                        SF-CADS
                    </Typography>
                </Box>
                <Divider />
                <List>
                    {this.drawerListItems.map(({ screen }, index) => {
                        return React.cloneElement(
                            <ListItem button key={index}
                            onClick={() => {
                                this.props.setScreen(screen);
                                this.props.toggleDrawer(false);
                            }}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {screen}
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                    <Divider />
                    <ListItem button key="Logout">
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </ListItem>
                </List>
            </React.Fragment>
        );
    }
    renderSwipeableDrawer = () => {
        return (
            <SwipeableDrawer
                open={this.props.open}
                onOpen={() => this.props.toggleDrawer(true)}
                onClose={() => this.props.toggleDrawer(false)}
            >   
                {this.renderDrawerContents()}
            </SwipeableDrawer>
        );
    };

    renderPermanentDrawer = () => {
        return (
            <Drawer
                variant="permanent"
            >   
                {this.renderDrawerContents()}
            </Drawer>
        );
    }

    render() {
        return (
            <React.Fragment>
                {/* <Hidden xsDown implementation="js">
                    {this.renderPermanentDrawer()}
                </Hidden>
                <Hidden smUp implementation="js">
                    {this.renderSwipeableDrawer()}
                </Hidden> */}
                {this.renderSwipeableDrawer()}
            </React.Fragment>
        );
    }
}

export default Sidebar;