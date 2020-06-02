import React from 'react';
import {
    SwipeableDrawer, Box, Typography, Hidden
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as firebase from 'firebase';
import 'firebase/auth';
import logo from '../../logo.png';

interface Props {
    open: boolean,
    loggedIn: boolean,
    toggleDrawer: Function,
    setScreen: Function,
    userType: string,
    screen: string,
}

interface State {

}

class Sidebar extends React.Component<Props, State> {
    handleLogout = () => {
        firebase.auth().signOut().catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
        this.props.setScreen("Login");
        this.props.toggleDrawer(false);
    }

    renderDrawerContents = () => {
        return (
            <React.Fragment>
                <Box style={{
                    width: 240,
                }}
                // color="#ffffff" 
                padding={2}
                display="flex"
                alignItems="center">
                    <Avatar src={logo} />
                    <Typography variant="h5" style={{ paddingLeft: 16}}>
                        SF-CADS
                    </Typography>
                </Box>
                <Divider />
                <List>
                    {this.props.userType == "restaurant"?(
                        <ListItem button key={1}
                        disabled={!this.props.loggedIn}
                        onClick={() => {
                            this.props.setScreen("Request");
                            this.props.toggleDrawer(false);
                        }}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Request
                            </ListItemText>
                        </ListItem>
                    ):null}
                    {this.props.userType == "ngo"?(
                        <ListItem button key={2}
                        disabled={!this.props.loggedIn}
                        onClick={() => {
                            this.props.setScreen("Accept");
                            this.props.toggleDrawer(false);
                        }}>
                            <ListItemIcon>
                            {/* TODO: CHANGE ICON HERE */}
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Accept
                            </ListItemText>
                        </ListItem>
                    ):null}
                    {this.props.loggedIn?(
                        <ListItem button key={3}
                        onClick={() => {
                            this.props.setScreen("Status");
                            this.props.toggleDrawer(false);
                        }}>
                            <ListItemIcon>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Status
                            </ListItemText>
                        </ListItem>
                    ):null}
                    <ListItem button key={4}
                    onClick={() => {
                        this.props.setScreen("Add Location");
                        this.props.toggleDrawer(false);
                    }}>
                        <ListItemIcon>
                        <AddLocationIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Add Location
                        </ListItemText>
                    </ListItem>
                    <ListItem button key={5}
                    onClick={() => {
                        this.props.setScreen("Information");
                        this.props.toggleDrawer(false);
                    }}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Information
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    {this.props.loggedIn?(
                        <ListItem divider button key="6"
                        onClick={() => this.handleLogout()}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Logout
                            </ListItemText>
                        </ListItem>
                    ):(
                        <ListItem divider button key="7"
                        disabled={this.props.screen == "Login"}
                        onClick={() => {
                            this.props.setScreen("Login");
                            this.props.toggleDrawer(false);
                        }}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Login
                            </ListItemText>
                        </ListItem>
                    )}
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