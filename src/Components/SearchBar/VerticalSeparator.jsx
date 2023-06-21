import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
        borderLeft: `${theme.spacing(0.7)} solid ${theme.palette.text.secondary}`,
        marginLeft: theme.spacing(3)
    }
});

const VerticalSeparator = ({ classes }) => {
    return <span className={classes.root} />;
};

export default withStyles(styles)(VerticalSeparator);
