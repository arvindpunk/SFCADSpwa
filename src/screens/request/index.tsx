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
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';

interface Props {

}

interface State {
    dialogOpen: boolean;
    date: Date | null;
}

class RequestScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dialogOpen: false,
            date: new Date()
        }; 
    }
    
    dummyData = [
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        }   
    ]

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
                onClick={() => {
                    this.setState({dialogOpen: false})
                    this.dummyData.push()
                }}
                color="primary" autoFocus>
                    Request
                </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <List disablePadding>
                    {this.dummyData.map(({ date, time }, index) => {
                        return React.cloneElement(
                            <ListItem divider button key={index}>
                                <ListItemText primary={time} secondary={date}/>
                            </ListItem>)
                    })}
                </List>
                {this.renderDialog()}
                <Zoom
                appear={true}
                in={true}
                exit={true}
                timeout={300}>
                    <Fab
                    onClick={() => this.setState({dialogOpen: true})}
                    color="primary"
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