import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from'@material-ui/core/ListItemText';

interface Props {

}

interface State {

}

class RequestScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }; 
    }
    
    dummyData = [
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
        },
        {
            date: "23 May",
            time: "10:05 AM"
        },
        {
            date: "25 May",
            time: "9:15 PM"
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

    render() {
        return (
            <React.Fragment>
                <List disablePadding>
                    {this.dummyData.map(({ date, time }, index) => {
                        return React.cloneElement(
                            <ListItem divider button key={index}>
                                <ListItemText primary={time} secondary={date}/>
                            </ListItem>)
                    })}
                </List>
                <Zoom
                appear={true}
                in={true}
                exit={true}
                timeout={300}>
                    <Fab
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
            </React.Fragment>
        );
    }
}

export default RequestScreen;