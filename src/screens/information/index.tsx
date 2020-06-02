import React from 'react';
import Box from '@material-ui/core/Box';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import {
    Animation,
} from '@devexpress/dx-react-chart';
import { Typography } from '@material-ui/core';

interface Props {

}

interface State {

}

const data = [
    { argument: 'Wastage', value: 120 },
    { argument: 'Collected', value: 80 },
    { argument: 'Distributed', value: 75 },
]

class InformationScreen extends React.Component<Props, State> {
    render() {
        return (
            <Box p={2}>
                <Typography variant="h5" style={{ marginBottom: 10 }}>
                    May 2020 (kg)
                </Typography>
                <Chart
                data={data}
                >  
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries valueField="value" argumentField="argument" color="#ff8855" />
                    <Animation />
                </Chart>
            </Box>
        );
    }
}

export default InformationScreen;