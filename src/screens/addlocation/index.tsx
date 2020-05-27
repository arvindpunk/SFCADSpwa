import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Divider } from '@material-ui/core';
interface Props {

}

interface State {

}

class AddLocationScreen extends React.Component<Props, State> {
    render() {
        return (
            <Box padding={2} >
                <Typography variant="h5">
                    We are expanding!
                </Typography>
                <Typography color="textSecondary">
                Enter below the location and name of shopping centre. We'll expand next to the most requested location!
                </Typography>
                <form noValidate>
                    <Box>
                        <TextField 
                        id="city" label="City"
                        placeholder="Eg. Ghaziabad"
                        margin="normal"
                        fullWidth />
                    </Box>
                    <Box>
                        <TextField
                        id="mall" label="Shopping Mall"
                        placeholder="Eg. Shipra Mall"
                        margin="normal"
                        fullWidth />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" p={2}>
                        <Button variant="contained" color="primary">Submit</Button>    
                    </Box>
                </form>
            </Box>
        );
    }
}

export default AddLocationScreen;