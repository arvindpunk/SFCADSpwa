import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from'@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import Fade from '@material-ui/core/Fade';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import * as firebase from 'firebase';
import 'firebase/firestore';

interface ItemProps {
    id: string,
    date: Date,
    requestedBy: string,
    acceptedBy: string,
}

interface Props {

}

interface State {
    dialogOpen: boolean;
    date: Date | null;
    items: Array<ItemProps>;
}

class AcceptScreen extends React.Component<Props, State> {
    db: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogOpen: false,
            date: new Date(),
            items: new Array<ItemProps>(),
        };
        this.db = firebase.firestore();
    }

    componentDidMount = () => {
        const uid = firebase.auth().currentUser?.uid;
        if (uid) {
            const items = new Array<ItemProps>();
            firebase.firestore().collection('requests')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        items.push({
                            id: doc.id,
                            date: doc.data()?.timestamp.toDate(),
                            requestedBy: doc.data()?.requestedBy,
                            acceptedBy: doc.data()?.acceptedBy,
                        });
                    });
                    this.setState({ items: items}); 
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                })
        }
    }

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(event.target.checked);
        const uid = firebase.auth().currentUser?.uid;
        if (uid) {
            firebase.firestore().collection('requests').doc(this.state.items[index]?.id).update({
                acceptedBy: event.target.checked?uid:''
            });
            this.state.items[index].acceptedBy = event.target.checked?uid:'';
            this.forceUpdate();
        }
    }
    // handleSetDate = () => {
    //     this.setState({dialogOpen: false});
    //     firebase.firestore().collection('requests').doc().set({
    //         requestedBy: firebase.auth().currentUser?.uid,
    //         acceptedBy: '',
    //         timestamp: this.state.date
    //     })
    //     if (this.state.date) {
    //         this.state.items.push(this.state.date);
    //     }
    // }

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
                    {this.state.items.map(({ date, acceptedBy }, index) => {
                        return React.cloneElement(
                            <Fade in={true} >
                                <ListItem divider button key={index}>
                                    <ListItemText
                                    primary={this.getTimeStringFromDate(date)}
                                    secondary={this.getDateStringFromDate(date)} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                        checked={acceptedBy == firebase.auth().currentUser?.uid}
                                        disabled={acceptedBy != '' && acceptedBy != firebase.auth().currentUser?.uid}
                                        onChange={(event) => this.handleCheckboxChange(event, index)}/>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Fade>)
                    })}
                </List>
            </MuiPickersUtilsProvider>
        );
    }
}

export default AcceptScreen;