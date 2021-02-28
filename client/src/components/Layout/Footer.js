import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        flexGrow: 1
    },
    footer: {
        background: '#525C65',
        alignItems: 'center'
    }
}

const Header = ({classes}) => {
    return(
        <div className={classes.root}>
            <AppBar position="static" className={classes.footer}>
                <Toolbar>
                    <Typography className={classes.typography}>
                        Copyright &copy; {new Date().getFullYear()} Chit-Chat
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles) (Header);