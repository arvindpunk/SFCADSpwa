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
import AddIcon from '@material-ui/icons/Add';
import TimelineIcon from '@material-ui/icons/Timeline';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import InfoIcon from '@material-ui/icons/Info';

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
            icon: <AddIcon />,
        },
        {
            screen: "Status",
            icon: <TimelineIcon />,
        },
        {
            screen: "Add Location",
            icon: <AddLocationIcon />,
        },
        {
            screen: "Information",
            icon: <InfoIcon />,
        },
    ]
    renderDrawerContents = () => {
        return (
            <React.Fragment>
                <Box style={{
                    width: 240,
                    backgroundColor: 'primary'
                }}>
                    <Typography variant="h5" style={{padding: 16}}>
                        SF-CADS
                    </Typography>
                </Box>
                <Divider />
                <List>
                    {this.drawerListItems.map(({ screen, icon }, index) => {
                        return React.cloneElement(
                            <ListItem button key={index}
                            onClick={() => {
                                this.props.setScreen(screen);
                                this.props.toggleDrawer(false);
                            }}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {screen}
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                    <Divider />
                    {this.props.loggedIn &&
                        <ListItem divider button key="Logout">
                            <ListItemText>
                                Logout
                            </ListItemText>
                        </ListItem>
                    }
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