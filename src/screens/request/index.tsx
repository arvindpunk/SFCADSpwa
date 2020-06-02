import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from'@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Fade from '@material-ui/core/Fade';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import * as firebase from 'firebase';
import 'firebase/firestore';

interface Props {

}

interface State {
    dialogOpen: boolean;
    date: Date | null;
    items: Array<Date>;
}

class RequestScreen extends React.Component<Props, State> {
    db: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogOpen: false,
            date: new Date(),
            items: new Array<Date>(),
        };
        this.db = firebase.firestore();
    }

    componentDidMount = () => {
        const uid = firebase.auth().currentUser?.uid;
        const items = new Array<Date>();
        if (uid) {
            firebase.firestore().collection('requests').where("requestedBy", "==", uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data()?.timestamp.toDate());
                    });
                    this.setState({ items: items}); 
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                })
        }
    }

    handleSetDate = () => {
        this.setState({dialogOpen: false});
        firebase.firestore().collection('requests').doc().set({
            requestedBy: firebase.auth().currentUser?.uid,
            acceptedBy: '',
            timestamp: this.state.date
        })
        if (this.state.date) {
            this.state.items.push(this.state.date);
        }
    }

    renderDialog = () => {
        return (
            <Dialog
                open={this.state.dialogOpen}
                onClose={() => this.setState({dialogOpen: false})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Request bot at?
                </DialogTitle>
                <DialogContent>
                    <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Pick Time"
                    value={this.state.date}
                    onChange={(date) => this.setState({date: date})}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </DialogContent>
                <DialogActions>
                <Button
                onClick={() => this.handleSetDate()}
                color="primary" autoFocus>
                    Request
                </Button>
                </DialogActions>
            </Dialog>
        );
    }

    getTimeStringFromDate = (date: Date) => {
        const timeString: String = (date.getHours()%13 + (date.getHours()>12?1:0)).toString().padStart(2, "0")
            + ':' + date.getMinutes().toString().padStart(2, "0")
            + ' ' + ((date.getHours()<12)?'AM':'PM');
        return timeString;
    }

    getDateStringFromDate = (date: Date) => {
        const dateString: String = date.toDateString();
        return dateString;
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <List disablePadding>
                    {this.state.items.map((date, index) => {
                        return React.cloneElement(
                            <Fade in={true} >
                                <ListItem divider button key={index} >
                                    <ListItemText
                                    primary={this.getTimeStringFromDate(date)}
                                    secondary={this.getDateStringFromDate(date)} />
                                </ListItem>
                            </Fade>)
                    })}
                </List>
                {this.renderDialog()}
                <Zoom
                appear={true}
                in={true}
                exit={true}
                timeout={300}>
                    <Fab
                    onClick={() => this.setState({dialogOpen: true, date: new Date()})}
                    color="secondary"
                    aria-label="add"
                    style={{ 
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                    }}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </MuiPickersUtilsProvider>
        );
    }
}

export default RequestScreen;