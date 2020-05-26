import React from 'react';
import LoginScreen from './login'
import RequestScreen from './request';
import StatusScreen from './status';
import AddLocationScreen from './addlocation';
import InformationScreen from './information';

interface Props {
    screen: string;
}

interface State {

}

class ScreenManager extends React.Component<Props, State> {
    screenMap = new Map<string, any>();
    
    constructor(props: Props) {
        super(props);
        this.screenMap.set("Request", <RequestScreen />);
        this.screenMap.set("Status", <StatusScreen />);
        this.screenMap.set("Add Location", <AddLocationScreen />);
        this.screenMap.set("Information", <InformationScreen />);
        this.screenMap.set("Login", <LoginScreen />)
    }
    render() {
        return (
            <React.Fragment>
                {this.screenMap.get(this.props.screen)}
            </React.Fragment>
        );
    }
}

export default ScreenManager;
