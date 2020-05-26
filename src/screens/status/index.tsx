import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

interface Props {

}

interface State {

}

class StatusScreen extends React.Component<Props, State> {
    dummyData = [
        {
            label: "Robot informed!",
            completed: true,
            active: false
        },
        {
            label: "Reaching restaurant.",
            completed: false,
            active: true
        },
        {
            label: "Waiting at drop-off point!",
            completed: false,
            active: false
        },
        {
            label: "NGO has arrived.",
            completed: false,
            active: false
        },
        {
            label: "Food picked up!",
            completed: false,
            active: false
        },
        
    ]

    constructor(props: Props) {
        super(props);
        this.state = {
          value: 0
        }; 
    }

    render() {
        return (
            <React.Fragment>
                <Stepper orientation="vertical">
                    {this.dummyData.map(({ label, completed, active }, index) => {
                        return React.cloneElement(
                            <Step completed={completed} active={active} key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>)
                    })}
                </Stepper>
            </React.Fragment>
        );
    }
}

export default StatusScreen;