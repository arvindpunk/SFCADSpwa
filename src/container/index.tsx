import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ScreenManager from '../screens';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { Typography, Divider } from '@material-ui/core';

interface Props {

}

interface State {
    loggedIn: boolean,
    open: boolean,
    screen: string,
    type: string,
    dialogOpen: boolean
}

class AppContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loggedIn: firebase.auth().currentUser != null,
            open: false,
            screen: 'Login',
            type: '',
            dialogOpen: false
        }
    }

    componentDidMount = () => {
        this.handleLogin();
    }

    setUserType = (type: string) => {
        const user = firebase.auth().currentUser;
        if (user) {
            const db = firebase.firestore();
            const userRef = db.collection('users').doc(user.uid);
            userRef.set({
                type: type
            }).then(() => {
                console.log("Document successfully written!");
                if (type === "ngo") {
                    this.setState({
                        screen: "Accept",
                        loggedIn: true
                    })
                } else if (type === "restaurant") {
                    this.setState({
                        screen: "Request",
                        loggedIn: true
                    })
                } else {
                    console.error("Invalid choice.");
                }
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        } else {
            console.log("Some error occured.");
        }
        this.setState({dialogOpen: false});
    }

    handleLogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const db = firebase.firestore();
                const userRef = db.collection('users').doc(user.uid);
                // this.getUserType(userRef);
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        if (doc.data()?.type === 'restaurant') {
                            this.setState({
                                screen: "Request",
                                loggedIn: true
                            })
                        } else if (doc.data()?.type === 'ngo') {
                            this.setState({
                                screen: "Accept",
                                loggedIn: true
                            })
                        } else {
                            console.log("Invalid data error.")
                        }
                    } else {
                        this.setState({dialogOpen: true})
                    }
                }).catch((error) => {   
                    console.log("Error fetching document: " + error);
                })
            } else {
                this.setState({
                    screen: "Login",
                    loggedIn: false
                })
            }
        })
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
                    open={this.state.open}
                    toggleDrawer={this.toggleDrawer}
                    setScreen={this.setScreen}
                    loggedIn={this.state.loggedIn} />
                <Container maxWidth='md' style={{ padding: 0}}>
                    <Box bgcolor="#ffffff" boxShadow={3}>
                        <ScreenManager
                        screen={this.state.screen}
                        />
                    </Box>
                </Container>
                <Dialog
                open={this.state.dialogOpen}
                onClose={() => this.setState({dialogOpen: false})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
                disableEscapeKeyDown
                >
                    <DialogTitle id="alert-dialog-title">
                        First time login detected!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Choose which type of account you want. (This cannot be changed at a later stage)
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button fullWidth
                        onClick={() => this.setUserType("ngo")}
                        color="secondary">
                            Ngo
                        </Button>
                        <Button fullWidth
                        onClick={() => this.setUserType("restaurant")}
                        color="primary">
                            Restaurant
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
}

export default AppContainer;